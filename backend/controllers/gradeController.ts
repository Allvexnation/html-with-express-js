import type {Request, Response} from "express";
import {supabase} from "../config/supabase";

export async function createGrade(req: Request, res: Response) {
    const {studentId, subjectId, grade, remarks} = req.body;

    console.log('Grade creation request body:', req.body);

    // Validate required fields
    if (!studentId || !subjectId || grade === undefined || grade === null) {
        return res.status(400).json({message: "Missing required fields: studentId, subjectId, grade"});
    }

    // Validate grade range
    if (grade < 0 || grade > 100) {
        return res.status(400).json({message: "Grade must be between 0 and 100"});
    }

    // Generate custom ID: GRD[YY][4-digit sequential number]
    const currentYear = new Date().getFullYear();
    const yearSuffix = currentYear.toString().slice(-2);

    const {data: existingGrades, error: countError} = await supabase
      .from("grades")
      .select("id")
      .like("id", `GRD${yearSuffix}%`);

    let sequentialNumber = 1;
    if (!countError && existingGrades && existingGrades.length > 0) {
      sequentialNumber = existingGrades.length + 1;
    }

    const paddedNumber = sequentialNumber.toString().padStart(4, '0');
    const customId = `GRD${yearSuffix}${paddedNumber}`;

    const {data, error} = await supabase
      .from("grades")
      .insert({
        id: customId,
        student_id: studentId,
        subject_id: subjectId,
        grade,
        remarks
      })
      .select();

    if (error) {
        console.error('Grade creation error:', error);
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function getGrades(req: Request, res: Response) {
    const {data} = await supabase
    .from("grades")
    .select("*")
    .order("created_at", {ascending: false});

    if (!data) {
        return res.json([]);
    }

    // Fetch student and subject data for each grade
    const gradesWithRelations = await Promise.all(
        data.map(async (grade: any) => {
            const {data: student} = await supabase
                .from("users_htmx")
                .select("*")
                .eq("id", grade.student_id)
                .single();

            const {data: subject} = await supabase
                .from("subjects")
                .select("*")
                .eq("id", grade.subject_id)
                .single();

            return {
                ...grade,
                students: student,
                subjects: subject
            };
        })
    );

    res.json(gradesWithRelations);
}

export async function getGradesByStudent(req: Request, res: Response) {
    const {studentId} = req.params;

    const {data} = await supabase
    .from("grades")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", {ascending: false});

    if (!data || data.length === 0) {
        return res.json([]);
    }

    // Fetch subject data for each grade
    const gradesWithSubjects = await Promise.all(
        data.map(async (grade: any) => {
            const {data: subject} = await supabase
                .from("subjects")
                .select("*")
                .eq("id", grade.subject_id)
                .single();

            return {
                ...grade,
                subjects: subject
            };
        })
    );

    res.json(gradesWithSubjects);
}

export async function getGradeById(req: Request, res: Response) {
    const {id} = req.params;

    const {data} = await supabase
    .from("grades")
    .select(`
        *,
        subjects:subject_id (*),
        students:student_id (*)
    `)
    .eq("id", id)
    .single();

    if (!data) {
        return res.status(404).json({message: "Grade not found"});
    }

    res.json(data);
}

export async function updateGrade(req: Request, res: Response) {
    const {id} = req.params;
    const {studentId, subjectId, grade, remarks} = req.body;

    const {data, error} = await supabase
    .from("grades")
    .update({
        student_id: studentId,
        subject_id: subjectId,
        grade,
        remarks
    })
    .eq("id", id)
    .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function deleteGrade(req: Request, res: Response) {
    const {id} = req.params;

    const {error} = await supabase
    .from("grades")
    .delete()
    .eq("id", id);

    if (error) {
        return res.status(400).json(error);
    }

    res.json({message: "Grade deleted successfully"});
}
