import type {Request, Response} from "express";
import {supabase} from "../config/supabase";
import {hashPassword, comparePassword} from "../utils/bcrypt";
import {createToken} from "../utils/jwt";

export async function adminLogin(req: Request, res: Response) {
    const {usernameOrEmail, password} = req.body;

    const {data} = await supabase
    .from("htmx_admin")
    .select("*")
    .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
    .single();

    if (!data) {
        return res.status(404).json({
            message: "Admin not found"
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

    res.json({
        message: "Admin login successful",
        token,
        admin: {
            id: data.id,
            username: data.username,
            email: data.email
        }
    });
}

export async function getStudents(req: Request, res: Response) {
    const {data} = await supabase
    .from("users_htmx")
    .select("*")
    .order("created_at", {ascending: false});

    res.json(data);
}

export async function getStudentById(req: Request, res: Response) {
    const {id} = req.params;

    const {data} = await supabase
    .from("users_htmx")
    .select("*")
    .eq("id", id)
    .single();

    if (!data) {
        return res.status(404).json({message: "Student not found"});
    }

    res.json(data);
}
