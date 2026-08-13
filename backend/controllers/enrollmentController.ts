import type {Request, Response} from "express";
import {supabase} from "../config/supabase";

export async function enrollStudent(req: Request, res: Response) {
    const {studentId, subjectIds, status} = req.body;

    // Generate custom ID: ENR[YY][4-digit sequential number]
    const currentYear = new Date().getFullYear();
    const yearSuffix = currentYear.toString().slice(-2);

    const {data: existingEnrollments, error: countError} = await supabase
      .from("enrollments")
      .select("id")
      .like("id", `ENR${yearSuffix}%`);

    let sequentialNumber = 1;
    if (!countError && existingEnrollments && existingEnrollments.length > 0) {
      sequentialNumber = existingEnrollments.length + 1;
    }

    const paddedNumber = sequentialNumber.toString().padStart(4, '0');
    const customId = `ENR${yearSuffix}${paddedNumber}`;

    const {data, error} = await supabase
      .from("enrollments")
      .insert({
        id: customId,
        student_id: studentId,
        subject_ids: subjectIds,
        status: status || 'active'
      })
      .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function getEnrollments(req: Request, res: Response) {
    const {data} = await supabase
    .from("enrollments")
    .select(`
        *,
        students:student_id (*)
    `)
    .order("created_at", {ascending: false});

    if (!data) {
        return res.json([]);
    }

    // Fetch subjects for each enrollment
    const enrollmentsWithSubjects = await Promise.all(
        data.map(async (enrollment: any) => {
            const subjectIds = enrollment.subject_ids;
            const {data: subjects} = await supabase
                .from("subjects")
                .select("*")
                .in("id", subjectIds);
            
            return {
                ...enrollment,
                subjects
            };
        })
    );

    res.json(enrollmentsWithSubjects);
}

export async function getEnrollmentsByStudent(req: Request, res: Response) {
    const {studentId} = req.params;

    const {data} = await supabase
    .from("enrollments")
    .select(`
        *,
        students:student_id (*)
    `)
    .eq("student_id", studentId)
    .order("created_at", {ascending: false});

    if (!data || data.length === 0) {
        return res.json([]);
    }

    // Fetch subjects for the enrollment
    const enrollment = data[0];
    const subjectIds = enrollment.subject_ids;
    const {data: subjects} = await supabase
        .from("subjects")
        .select("*")
        .in("id", subjectIds);

    res.json({
        ...enrollment,
        subjects
    });
}

export async function updateEnrollment(req: Request, res: Response) {
    const {id} = req.params;
    const {status, subjectIds} = req.body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (subjectIds) updateData.subject_ids = subjectIds;

    const {data, error} = await supabase
    .from("enrollments")
    .update(updateData)
    .eq("id", id)
    .select();

    if (error) {
        return res.status(400).json(error);
    }

    res.json(data);
}

export async function deleteEnrollment(req: Request, res: Response) {
    const {id} = req.params;

    const {error} = await supabase
    .from("enrollments")
    .delete()
    .eq("id", id);

    if (error) {
        return res.status(400).json(error);
    }

    res.json({message: "Enrollment deleted successfully"});
}
