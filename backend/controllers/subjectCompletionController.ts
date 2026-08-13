import type {Request, Response} from "express";
import {supabase} from "../config/supabase";

export async function markSubjectComplete(req: Request, res: Response) {
    const {studentId, subjectId} = req.body;

    // Generate custom ID: SCOMP[YY][4-digit sequential number]
    const currentYear = new Date().getFullYear();
    const yearSuffix = currentYear.toString().slice(-2);

    const {data: existingCompletions, error: countError} = await supabase
      .from("subject_completions")
      .select("id")
      .like("id", `SCOMP${yearSuffix}%`);

    let sequentialNumber = 1;
    if (!countError && existingCompletions && existingCompletions.length > 0) {
      sequentialNumber = existingCompletions.length + 1;
    }

    const paddedNumber = sequentialNumber.toString().padStart(4, '0');
    const customId = `SCOMP${yearSuffix}${paddedNumber}`;

    const {data, error} = await supabase
      .from("subject_completions")
      .insert({
        id: customId,
        student_id: studentId,
        subject_id: subjectId
      })
      .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function getStudentCompletions(req: Request, res: Response) {
    const {studentId} = req.params;

    const {data} = await supabase
    .from("subject_completions")
    .select(`
        *,
        subjects:subject_id (*)
    `)
    .eq("student_id", studentId)
    .order("completed_at", {ascending: false});

    res.json(data);
}

export async function deleteSubjectCompletion(req: Request, res: Response) {
    const {studentId, subjectId} = req.params;

    const {error} = await supabase
    .from("subject_completions")
    .delete()
    .eq("student_id", studentId)
    .eq("subject_id", subjectId);

    if (error) {
        return res.status(400).json(error);
    }

    res.json({message: "Subject completion removed successfully"});
}
