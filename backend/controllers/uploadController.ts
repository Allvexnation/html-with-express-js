import type {Request, Response} from "express";
import crypto from 'crypto';

export async function uploadImage(req: any, res: Response) {
    try {
        const file = req.file;
        
        if (!file) {
            return res.status(400).json({error: 'No file uploaded'});
        }

        // Cloudinary credentials
        const cloudName = 'djtsciuwn';
        const apiKey = '534982727152784';
        const apiSecret = 'no-H7sjim9V8vGwuF2exJiF0Fko';

        // Convert buffer to base64
        const base64String = file.buffer.toString('base64');
        const dataUrl = `data:${file.mimetype};base64,${base64String}`;

        // Generate timestamp for signed upload
        const timestamp = Math.floor(Date.now() / 1000);
        const folder = 'subject_covers';
        
        // Create signature string (parameters must be sorted alphabetically)
        const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
        const signature = crypto
            .createHash('sha1')
            .update(paramsToSign + apiSecret)
            .digest('hex');

        // Upload to Cloudinary using REST API
        const formData = new FormData();
        formData.append('file', dataUrl);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', folder);
        formData.append('signature', signature);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json() as any;

        if (!response.ok) {
            console.error('Cloudinary API error:', result);
            return res.status(500).json({error: result.error?.message || 'Upload failed'});
        }

        res.json({
            success: true,
            url: result.secure_url
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({error: 'Failed to upload image'});
    }
}
