import type {Request, Response} from "express";
import {supabase} from "../config/supabase";

export async function createSubject(req: Request, res: Response) {
    const {subjectName, subjectCode, teacherName, description, coverPhoto} = req.body;

    // Generate custom ID: SUBJ[YY][4-digit sequential number]
    const currentYear = new Date().getFullYear();
    const yearSuffix = currentYear.toString().slice(-2);

    const {data: existingSubjects, error: countError} = await supabase
      .from("subjects")
      .select("id")
      .like("id", `SUBJ${yearSuffix}%`);

    let sequentialNumber = 1;
    if (!countError && existingSubjects && existingSubjects.length > 0) {
      sequentialNumber = existingSubjects.length + 1;
    }

    const paddedNumber = sequentialNumber.toString().padStart(4, '0');
    const customId = `SUBJ${yearSuffix}${paddedNumber}`;

    // Build insert object with optional cover_photo
    const insertData: any = {
        id: customId,
        subject_name: subjectName,
        subject_code: subjectCode,
        teacher_name: teacherName,
        description
    };

    // Only add cover_photo if it's provided
    if (coverPhoto) {
        insertData.cover_photo = coverPhoto;
    }

    const {data, error} = await supabase
      .from("subjects")
      .insert(insertData)
      .select();

    if (error) {
        console.error('Subject creation error:', error);
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function getSubjects(req: Request, res: Response) {
    const {data} = await supabase
    .from("subjects")
    .select("*")
    .order("created_at", {ascending: false});

    res.json(data);
}

export async function getSubjectById(req: Request, res: Response) {
    const {id} = req.params;

    const {data} = await supabase
    .from("subjects")
    .select("*")
    .eq("id", id)
    .single();

    if (!data) {
        return res.status(404).json({message: "Subject not found"});
    }

    res.json(data);
}

export async function updateSubject(req: Request, res: Response) {
    const {id} = req.params;
    const {subjectName, subjectCode, teacherName, description, coverPhoto} = req.body;

    const {data, error} = await supabase
    .from("subjects")
    .update({
        subject_name: subjectName,
        subject_code: subjectCode,
        teacher_name: teacherName,
        description,
        cover_photo: coverPhoto
    })
    .eq("id", id)
    .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function deleteSubject(req: Request, res: Response) {
    const {id} = req.params;

    const {error} = await supabase
    .from("subjects")
    .delete()
    .eq("id", id);

    if (error) {
        return res.status(400).json(error);
    }

    res.json({message: "Subject deleted successfully"});
}
