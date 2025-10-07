// Store picture in uploads folder
import path from "path";
import { promises as fs } from "fs";

// Get the uploads directory
const getUploadsDir = (subDir: string) => {
    const root = process.cwd();
    return path.join(root, "uploads", subDir);
}

// Determine the extension of the file
const determineExtension = (file: File) => {
    const originalName = file.name || "";
    const existingExt = path.extname(originalName);
    if (existingExt) return existingExt.toLowerCase();
    const type = (file as any).type as string | undefined;
    if (!type) return ".bin";
    if (type.includes("jpeg")) return ".jpg";
    if (type.includes("png")) return ".png";
    if (type.includes("webp")) return ".webp";
    if (type.includes("gif")) return ".gif";
    return ".bin";
}

// Store picture in uploads folder
export const storePicture = async (picture: File, subDir: string, name?: string) => {
    const dir = getUploadsDir(subDir);
    await fs.mkdir(dir, { recursive: true });

    const ext = determineExtension(picture);
    // If a name is provided, ensure we only use the base filename (avoid passing a public path)
    const baseName = name ? path.basename(name) : undefined;
    const uniqueName = baseName || `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const filePath = path.join(dir, uniqueName);

    const arrayBuffer = await picture.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const publicPath = `/uploads/${subDir}/${uniqueName}`;
    return publicPath;
}

// Read upload file
export const readUploadFile = async (subDir: string, fileName: string) => {
    const filePath = path.join(process.cwd(), "uploads", subDir, fileName);
    const file = await fs.readFile(filePath);
    return file;
}

// Delete upload file
export const deleteUploadFile = async (fileName: string) => {
    try {
        if (!fileName) return;
        // Normalize incoming value which may be a public path like "/uploads/sub/file.png"
        let normalized = fileName.replace(/\\/g, '/');
        // Remove leading slashes
        normalized = normalized.replace(/^\/+/, '');
        // Ensure path starts at uploads/
        const uploadsIndex = normalized.indexOf('uploads/');
        if (uploadsIndex > 0) normalized = normalized.slice(uploadsIndex);
        const filePath = path.join(process.cwd(), normalized);
        await fs.unlink(filePath);
    } catch (e) {
        // Silently ignore if file doesn't exist
    }
}

// validate picture
export const isValidPicture = (picture: FormDataEntryValue | null) => {
    try {
        const pictureIsNotEmpty = !!picture;
        const pictureIsAFile = picture instanceof File;
        const pictureIsAString = typeof picture === 'string';
        const pictureHasOnlyOneFile = (picture as File).size > 0;

        const validation = (
            pictureIsNotEmpty &&
            pictureIsAFile &&
            pictureHasOnlyOneFile &&
            !pictureIsAString
        );

        return validation;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Server side picture input processing
export const storeAndGetPicturePath = async (picture: FormDataEntryValue | null, subDir: string) => {
    try {
        // Validate picture
        if (!isValidPicture(picture)) return null;

        // Get the picture path
        const picturePath = await storePicture(picture as File, subDir);
        return picturePath;
    } catch (error) {
        console.log(error);
        return null;
    }
}
