import { promises as fs } from 'fs';
import path from 'path';

/**
 * Crea un enlace simbólico si no existe
 * @param target - Ruta del archivo/carpeta original
 * @param linkPath - Ruta donde crear el enlace simbólico
 */
export async function createSymlink(target: string, linkPath: string): Promise<boolean> {
    try {
        // Verificar si el enlace ya existe
        try {
            const stats = await fs.lstat(linkPath);
            if (stats.isSymbolicLink()) {
                console.log(`Symlink already exists: ${linkPath}`);
                return true;
            }
        } catch (error) {
            // El enlace no existe, continuar
        }

        // Verificar que el target existe
        try {
            await fs.access(target);
        } catch (error) {
            console.error(`Target does not exist: ${target}`);
            return false;
        }

        // Crear el directorio padre si no existe
        const linkDir = path.dirname(linkPath);
        await fs.mkdir(linkDir, { recursive: true });

        // Crear el enlace simbólico
        await fs.symlink(target, linkPath, 'dir');
        console.log(`Symlink created: ${linkPath} -> ${target}`);
        return true;
    } catch (error) {
        console.error(`Error creating symlink: ${error}`);
        return false;
    }
}

/**
 * Inicializa el enlace simbólico para uploads
 */
export async function initializeUploadsSymlink(): Promise<boolean> {
    const projectRoot = process.cwd();
    const uploadsDir = path.join(projectRoot, 'uploads');
    const appUploadsLink = path.join(projectRoot, 'app', 'uploads');

    // Crear la carpeta uploads en la raíz si no existe
    try {
        await fs.mkdir(uploadsDir, { recursive: true });
        console.log(`Uploads directory created/verified: ${uploadsDir}`);
    } catch (error) {
        console.error(`Error creating uploads directory: ${error}`);
        return false;
    }

    // Crear el enlace simbólico
    const success = await createSymlink(uploadsDir, appUploadsLink);
    if (success) {
        console.log('Uploads symlink initialized successfully');
    } else {
        console.error('Failed to initialize uploads symlink');
    }
    
    return success;
}