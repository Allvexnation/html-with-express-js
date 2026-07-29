import type {Request, Response} from "express";
import {supabase} from "../config/supabase";
import {hashPassword, comparePassword} from "../utils/bcrypt";
import {createToken} from "../utils/jwt";
import {sendEmail} from "../config/brevo";
import {generateSignupEmailTemplate, generateLoginEmailTemplate} from "../templates/emailtemplates";

export async function register(req: Request, res: Response) {
    const {username, email, password} = req.body;

    const hashed = await hashPassword(password);

    const {data, error} = await supabase
      .from("users_htmx")
      .insert({
        username,
        email,
        password: hashed,
      })
      .select();

      if (error) {
        return res.status(400).json(error);
      }

      // Send signup email
      try {
        const emailContent = generateSignupEmailTemplate({ username, email });
        await sendEmail(email, username, 'Welcome to Jhon Ladines Portfolio!', emailContent);
      } catch (emailError) {
        console.error('Failed to send signup email:', emailError);
      }

      res.json(data);
}

export async function login(req: Request, res: Response) {
    const {email, password} = req.body;

    const {data} = await supabase
    .from("users_htmx")
    .select("*")
    .eq("email", email)
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
        await sendEmail(data.email, data.username, 'Login Notification - Jhon Ladines Portfolio', emailContent);
    } catch (emailError) {
        console.error('Failed to send login email:', emailError);
    }

    res.json({
        message: "Login successful",
        token,
        user: {
            id: data.id,
            username: data.username,
            email: data.email
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