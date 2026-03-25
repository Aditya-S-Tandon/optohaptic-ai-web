import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "1-files/test-file-abc123.png",
    url: "https://cdn.example.com/1-files/test-file-abc123.png",
  }),
}));

// Mock the db module
vi.mock("./db", () => ({
  createFile: vi.fn().mockImplementation(async (input) => ({
    id: 1,
    userId: input.userId,
    filename: input.filename,
    fileKey: input.fileKey,
    url: input.url,
    mimeType: input.mimeType,
    size: input.size,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  })),
  listFilesByUser: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      filename: "test.png",
      fileKey: "1-files/test-abc123.png",
      url: "https://cdn.example.com/1-files/test-abc123.png",
      mimeType: "image/png",
      size: 1024,
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    },
    {
      id: 2,
      userId: 1,
      filename: "doc.pdf",
      fileKey: "1-files/doc-def456.pdf",
      url: "https://cdn.example.com/1-files/doc-def456.pdf",
      mimeType: "application/pdf",
      size: 2048,
      createdAt: new Date("2026-01-02"),
      updatedAt: new Date("2026-01-02"),
    },
  ]),
  getFileById: vi.fn().mockImplementation(async (id: number) => {
    if (id === 1) {
      return {
        id: 1,
        userId: 1,
        filename: "test.png",
        fileKey: "1-files/test-abc123.png",
        url: "https://cdn.example.com/1-files/test-abc123.png",
        mimeType: "image/png",
        size: 1024,
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
      };
    }
    if (id === 99) {
      return {
        id: 99,
        userId: 999, // Different user
        filename: "other.png",
        fileKey: "999-files/other.png",
        url: "https://cdn.example.com/999-files/other.png",
        mimeType: "image/png",
        size: 512,
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
      };
    }
    return undefined;
  }),
  deleteFile: vi.fn().mockResolvedValue(undefined),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-open-id",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("files router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("files.list", () => {
    it("returns files for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.list();

      expect(result).toHaveLength(2);
      expect(result[0].filename).toBe("test.png");
      expect(result[1].filename).toBe("doc.pdf");
    });

    it("rejects unauthenticated requests", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.list()).rejects.toThrow();
    });
  });

  describe("files.upload", () => {
    it("uploads a file and returns the record", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Base64 of a tiny PNG-like payload
      const base64Data = Buffer.from("fake-png-data").toString("base64");

      const result = await caller.files.upload({
        filename: "test-file.png",
        mimeType: "image/png",
        data: base64Data,
        size: 13,
      });

      expect(result.id).toBe(1);
      expect(result.filename).toBe("test-file.png");
      expect(result.mimeType).toBe("image/png");
      expect(result.url).toContain("cdn.example.com");
    });

    it("rejects unauthenticated uploads", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "test.png",
          mimeType: "image/png",
          data: "dGVzdA==",
          size: 4,
        })
      ).rejects.toThrow();
    });
  });

  describe("files.get", () => {
    it("returns a file owned by the user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.get({ id: 1 });

      expect(result.id).toBe(1);
      expect(result.filename).toBe("test.png");
    });

    it("rejects access to another user's file", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.get({ id: 99 })).rejects.toThrow("File not found");
    });

    it("rejects access to non-existent file", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.get({ id: 9999 })).rejects.toThrow("File not found");
    });
  });

  describe("files.delete", () => {
    it("deletes a file owned by the user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.delete({ id: 1 });

      expect(result).toEqual({ success: true });
    });

    it("rejects deleting another user's file", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.delete({ id: 99 })).rejects.toThrow("File not found");
    });

    it("rejects deleting non-existent file", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.delete({ id: 9999 })).rejects.toThrow("File not found");
    });
  });
});
