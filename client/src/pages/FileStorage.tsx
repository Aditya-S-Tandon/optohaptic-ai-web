import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Upload,
  FileIcon,
  Trash2,
  Download,
  ArrowLeft,
  Loader2,
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  File,
} from "lucide-react";

/** Max file size: 10 MB */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return <FileImage className="w-5 h-5" />;
  if (mimeType.startsWith("video/")) return <FileVideo className="w-5 h-5" />;
  if (mimeType.startsWith("audio/")) return <FileAudio className="w-5 h-5" />;
  if (mimeType.startsWith("text/") || mimeType.includes("pdf") || mimeType.includes("document"))
    return <FileText className="w-5 h-5" />;
  return <File className="w-5 h-5" />;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FileStorage() {
  const { user, loading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const utils = trpc.useUtils();
  const filesQuery = trpc.files.list.useQuery(undefined, { enabled: !!user });
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("File uploaded successfully");
    },
    onError: (err) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });
  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      utils.files.list.invalidate();
      toast.success("File deleted");
    },
    onError: (err) => {
      toast.error(`Delete failed: ${err.message}`);
    },
  });

  const handleUpload = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      setUploading(true);
      try {
        for (const file of Array.from(fileList)) {
          if (file.size > MAX_FILE_SIZE) {
            toast.error(`${file.name} exceeds 10 MB limit`);
            continue;
          }

          // Read file as base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              // Strip the data:...;base64, prefix
              resolve(result.split(",")[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          await uploadMutation.mutateAsync({
            filename: file.name,
            mimeType: file.type || "application/octet-stream",
            data: base64,
            size: file.size,
          });
        }
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [uploadMutation]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload]
  );

  // Auth loading state
  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#03045E" }}
      >
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#00B4D8" }} />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ background: "#03045E" }}
      >
        <div className="text-center">
          <FileIcon className="w-16 h-16 mx-auto mb-4" style={{ color: "#00B4D8" }} />
          <h1
            className="font-display text-3xl font-bold mb-2"
            style={{ color: "#FFFFFF", fontFamily: "'Orbitron', sans-serif" }}
          >
            File Storage
          </h1>
          <p style={{ color: "#CAF0F8" }} className="mb-6">
            Sign in to upload and manage your files
          </p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="px-8 py-3 rounded-full font-semibold text-base"
            style={{
              background: "linear-gradient(135deg, #00B4D8, #0077B6)",
              color: "#FFFFFF",
              border: "none",
            }}
          >
            Sign In
          </Button>
        </div>
        <a
          href="/"
          className="flex items-center gap-2 text-sm hover:underline"
          style={{ color: "#90E0EF" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </a>
      </div>
    );
  }

  const files = filesQuery.data ?? [];

  return (
    <div className="min-h-screen" style={{ background: "#03045E" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: "rgba(3,4,94,0.85)",
          borderColor: "rgba(0,180,216,0.15)",
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-sm hover:underline"
              style={{ color: "#90E0EF" }}
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </a>
            <h1
              className="text-xl font-bold"
              style={{ color: "#FFFFFF", fontFamily: "'Orbitron', sans-serif" }}
            >
              File Storage
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "#CAF0F8" }}>
              {user.name || user.email || "User"}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Upload Area */}
        <Card
          className="mb-8 border-dashed border-2 transition-all duration-300 cursor-pointer"
          style={{
            background: dragOver ? "rgba(0,180,216,0.1)" : "rgba(0,180,216,0.04)",
            borderColor: dragOver ? "#00B4D8" : "rgba(0,180,216,0.2)",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            {uploading ? (
              <Loader2 className="w-10 h-10 animate-spin mb-3" style={{ color: "#00B4D8" }} />
            ) : (
              <Upload className="w-10 h-10 mb-3" style={{ color: "#00B4D8" }} />
            )}
            <p className="text-base font-medium mb-1" style={{ color: "#FFFFFF" }}>
              {uploading ? "Uploading..." : "Drop files here or click to upload"}
            </p>
            <p className="text-sm" style={{ color: "#90E0EF" }}>
              Max 10 MB per file
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
          </CardContent>
        </Card>

        {/* Files List */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
            Your Files
          </h2>
          <span className="text-sm" style={{ color: "#90E0EF" }}>
            {files.length} file{files.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filesQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#00B4D8" }} />
          </div>
        ) : files.length === 0 ? (
          <Card
            style={{
              background: "rgba(0,180,216,0.04)",
              borderColor: "rgba(0,180,216,0.1)",
            }}
          >
            <CardContent className="flex flex-col items-center py-16">
              <FileIcon className="w-12 h-12 mb-3" style={{ color: "rgba(0,180,216,0.3)" }} />
              <p style={{ color: "#90E0EF" }}>No files yet. Upload your first file above.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <Card
                key={file.id}
                className="transition-all duration-200 hover:border-opacity-50"
                style={{
                  background: "rgba(0,180,216,0.04)",
                  borderColor: "rgba(0,180,216,0.12)",
                }}
              >
                <CardContent className="flex items-center gap-4 py-4">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{ background: "rgba(0,180,216,0.1)", color: "#00B4D8" }}
                  >
                    {getFileIcon(file.mimeType)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "#FFFFFF" }}
                      title={file.filename}
                    >
                      {file.filename}
                    </p>
                    <p className="text-xs" style={{ color: "#90E0EF" }}>
                      {formatBytes(file.size)} &middot; {formatDate(file.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      title="Download"
                      onClick={() => window.open(file.url, "_blank")}
                      style={{ color: "#00B4D8" }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete "${file.filename}"?`)) {
                          deleteMutation.mutate({ id: file.id });
                        }
                      }}
                      style={{ color: "#ff6b6b" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
