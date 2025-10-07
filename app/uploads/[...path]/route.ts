import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Serve files saved under the project root `uploads/` directory
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: segments } = await params;

        if (!Array.isArray(segments) || segments.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const filePath = path.join(process.cwd(), "uploads", ...segments);

        // Security: prevent path traversal outside uploads
        const uploadsRoot = path.join(process.cwd(), "uploads");
        const normalized = path.normalize(filePath);
        if (!normalized.startsWith(uploadsRoot)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        try {
            const stat = await fs.stat(filePath);
            if (!stat.isFile()) {
                return NextResponse.json({ error: "Not found" }, { status: 404 });
            }
        } catch {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const data = await fs.readFile(filePath);

        // Infer a basic content type from extension
        const ext = path.extname(filePath).toLowerCase();
        let contentType = "application/octet-stream";
        if (ext === ".png") contentType = "image/png";
        else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
        else if (ext === ".webp") contentType = "image/webp";
        else if (ext === ".gif") contentType = "image/gif";

        return new NextResponse(new Uint8Array(data), {
            status: 200,
            headers: {
                "Content-Type": contentType,
                // Basic caching for static-like assets
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving upload:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


