import {supabase} from "../config/supabase";
import {hashPassword} from "../utils/bcrypt";

async function seedAdmins() {
    const admins = [
        {
            id: "ADM250001",
            username: "admin",
            email: "admin@school.com",
            password: "admin123"
        },
        {
            id: "ADM250002",
            username: "superadmin",
            email: "superadmin@school.com",
            password: "superadmin123"
        }
    ];

    for (const admin of admins) {
        const hashedPassword = await hashPassword(admin.password);

        const {error} = await supabase
            .from("htmx_admin")
            .insert({
                id: admin.id,
                username: admin.username,
                email: admin.email,
                password: hashedPassword
            });

        if (error) {
            console.error(`Error seeding admin ${admin.username}:`, error);
        } else {
            console.log(`Admin ${admin.username} seeded successfully`);
        }
    }
}

seedAdmins();
