import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { storagePut } from "./storage";
import { createFile, listFilesByUser, getFileById, deleteFile } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    /** List all files for the authenticated user */
    list: protectedProcedure.query(async ({ ctx }) => {
      return listFilesByUser(ctx.user.id);
    }),

    /** Upload a file — accepts base64-encoded data from the client */
    upload: protectedProcedure
      .input(
        z.object({
          filename: z.string().min(1).max(512),
          mimeType: z.string().min(1).max(128),
          /** Base64-encoded file content */
          data: z.string(),
          size: z.number().int().positive(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Decode base64 to buffer
        const buffer = Buffer.from(input.data, "base64");

        // Build a non-enumerable S3 key with random suffix
        const suffix = nanoid(12);
        const sanitizedName = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileKey = `${ctx.user.id}-files/${sanitizedName}-${suffix}`;

        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Save metadata to database
        const record = await createFile({
          userId: ctx.user.id,
          filename: input.filename,
          fileKey,
          url,
          mimeType: input.mimeType,
          size: input.size,
        });

        return record;
      }),

    /** Get a single file by ID (must belong to the authenticated user) */
    get: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .query(async ({ ctx, input }) => {
        const file = await getFileById(input.id);
        if (!file || file.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND", message: "File not found" });
        }
        return file;
      }),

    /** Delete a file by ID (must belong to the authenticated user) */
    delete: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ ctx, input }) => {
        const file = await getFileById(input.id);
        if (!file || file.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND", message: "File not found" });
        }
        await deleteFile(input.id);
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
