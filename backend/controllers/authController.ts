import type {Request, Response} from "express";
import {supabase} from "../config/supabase";
import {hashPassword, comparePassword} from "../utils/bcrypt";
import {createToken} from "../utils/jwt";
import {sendEmail} from "../config/brevo";
import {generateSignupEmailTemplate, generateLoginEmailTemplate} from "../templates/emailtemplates";

export async function register(req: Request, res: Response) {
    const {username, email, password, fullName, address, cellNumber, dateOfBirth, age, gender, hobbies} = req.body;

    const hashed = await hashPassword(password);

    // Generate custom ID: CCA[YY][4-digit sequential number]
    const currentYear = new Date().getFullYear();
    const yearSuffix = currentYear.toString().slice(-2); // Last 2 digits of year

    // Get count of existing users for this year to generate sequential number
    const {data: existingUsers, error: countError} = await supabase
      .from("users_htmx")
      .select("id")
      .like("id", `CCA${yearSuffix}%`);

    let sequentialNumber = 1;
    if (!countError && existingUsers && existingUsers.length > 0) {
      sequentialNumber = existingUsers.length + 1;
    }

    // Format as 4-digit number with leading zeros
    const paddedNumber = sequentialNumber.toString().padStart(4, '0');
    const customId = `CCA${yearSuffix}${paddedNumber}`;

    const {data, error} = await supabase
      .from("users_htmx")
      .insert({
        id: customId,
        username,
        email,
        password: hashed,
        full_name: fullName,
        address,
        cell_number: cellNumber,
        date_of_birth: dateOfBirth,
        age,
        gender,
        hobbies,
      })
      .select();

      if (error) {
        return res.status(400).json(error);
      }

      // Send signup email
      try {
        const emailContent = generateSignupEmailTemplate({ 
          username, 
          email, 
          fullName, 
          address, 
          cellNumber, 
          dateOfBirth, 
          age, 
          gender, 
          hobbies 
        });
        await sendEmail(email, username, 'Welcome to CRT Student Portal!', emailContent);
      } catch (emailError) {
        console.error('Failed to send signup email:', emailError);
      }

      res.json(data);
}

export async function login(req: Request, res: Response) {
    const {username, password} = req.body;

    const {data} = await supabase
    .from("users_htmx")
    .select("*")
    .or(`username.eq.${username},email.eq.${username}`)
    .single();

    if (!data) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const valid = await comparePassword(
        password,
        data.password
    );

    if (!valid) {
        return res.status(401).json({
            message: "Wrong password"
        });
    }

    const token = createToken(data.id);

    // Send login notification email
    try {
        const emailContent = generateLoginEmailTemplate({ username: data.username, email: data.email });
        await sendEmail(data.email, data.username, 'Login Notification - CRT Student Portal', emailContent);
    } catch (emailError) {
        console.error('Failed to send login email:', emailError);
    }

    res.json({
        message: "Login successful",
        token,
        user: {
            id: data.id,
            username: data.username,
            email: data.email,
            fullName: data.full_name,
            profile_image: data.profile_image,
            created_at: data.created_at
        }
    });
}

export async function getUsers(
    req: Request,
    res: Response
) {
    const {data} = await supabase
    .from("users_htmx")
    .select("*");

    res.json(data);
}

export async function checkEmailExists(req: Request, res: Response) {
    const { email } = req.query;

    const { data, error } = await supabase
        .from("users_htmx")
        .select("email")
        .eq("email", email)
        .single();

    if (error || !data) {
        return res.json({ exists: false });
    }

    res.json({ exists: true });
}

export async function checkUsernameExists(req: Request, res: Response) {
    const { username } = req.query;

    const { data, error } = await supabase
        .from("users_htmx")
        .select("username")
        .eq("username", username)
        .single();

    if (error || !data) {
        return res.json({ exists: false });
    }

    res.json({ exists: true });
}

export async function updateProfile(req: any, res: Response) {
    try {
        const { id } = req.params;
        const { fullName, username, email } = req.body;
        const file = req.file;

        let profileImageUrl: string | undefined;

        // Upload image to Cloudinary if provided
        if (file) {
            const crypto = await import('crypto');
            const cloudName = 'djtsciuwn';
            const apiKey = '534982727152784';
            const apiSecret = 'no-H7sjim9V8vGwuF2exJiF0Fko';

            const base64String = file.buffer.toString('base64');
            const dataUrl = `data:${file.mimetype};base64,${base64String}`;

            const timestamp = Math.floor(Date.now() / 1000);
            const folder = 'profile_images';
            
            const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
            const signature = crypto
                .createHash('sha1')
                .update(paramsToSign + apiSecret)
                .digest('hex');

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

            profileImageUrl = result.secure_url;
        }

        // Update user profile in database
        const updateData: any = {};
        if (fullName) updateData.full_name = fullName;
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (profileImageUrl) updateData.profile_image = profileImageUrl;

        const { data, error } = await supabase
            .from("users_htmx")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return res.status(400).json(error);
        }

        res.json({
            id: data.id,
            username: data.username,
            email: data.email,
            fullName: data.full_name,
            profile_image: data.profile_image,
            created_at: data.created_at
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}