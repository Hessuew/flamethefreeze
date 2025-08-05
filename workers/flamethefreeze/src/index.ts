import { Hono } from "hono";
import { cors } from "hono/cors";

interface Env {
  PUBLIC_BUCKET: R2Bucket;
}

const app = new Hono<{ Bindings: Env }>();

// CORS middleware for all routes
app.use(
  "/*",
  cors({
    origin: ["https://flamethefreeze.pages.dev", "https://flamethefreeze.com"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Range", "X-Requested-With"],
  })
);

// Public files endpoint - no CSRF protection needed for public assets
app.get("/files/:filename", async (c) => {
  const { filename } = c.req.param();

  // Basic filename validation to prevent path traversal
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return c.text("Invalid filename", 400);
  }

  // Validate file extension (allow only specific file types)
  const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".doc", ".docx", ".mp4"];
  const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf("."));

  if (!allowedExtensions.includes(fileExtension)) {
    return c.text("File type not allowed", 403);
  }
  console.log(filename);
  try {
    const object = await c.env.PUBLIC_BUCKET.get(filename);

    if (!object || !object.body) {
      return c.text("File not found", 404);
    }

    // Set appropriate MIME type based on file extension
    const mimeTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".mp4": "video/mp4",
    };

    const contentType = object.httpMetadata?.contentType || mimeTypes[fileExtension] || "application/octet-stream";

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
      // 'Content-Security-Policy': "default-src 'none'; object-src 'none'; frame-ancestors https://urfit-child.com;",
      "Accept-Ranges": "bytes",
    };

    if (object.size) {
      headers["Content-Length"] = object.size.toString();
    }

    return new Response(object.body, {
      headers,
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return c.text("Internal server error", 500);
  }
});

export default app;
