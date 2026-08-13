import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import subjectCompletionRoutes from "./routes/subjectCompletionRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/subject-completions", subjectCompletionRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})