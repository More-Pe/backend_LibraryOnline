import bcrypt from 'bcrypt';
import { AppDataSource } from '../db';
import { User } from '../models/User';
export const userSeeder = async () => {
    try {
        await AppDataSource.initialize();
        const adminUser = new User();
        adminUser.id = 1;
        adminUser.name = "admin";
        adminUser.email = "admin@admin.com";
        adminUser.password = bcrypt.hashSync("admin", 10);
        adminUser.role = "admin";
        await adminUser.save()
        const superAdmin = new User();
        superAdmin.id = 2;
        superAdmin.name = "super admin";
        superAdmin.email = "superadmin@admin.com";
        superAdmin.password = bcrypt.hashSync("super", 10);
        superAdmin.role = "superadmin";
        await superAdmin.save()
        const user = new User();
        user.id = 3;
        user.name = "user";
        user.email = "user@user.com";
        user.password = bcrypt.hashSync("user", 10);
        user.role = "user";
        await user.save()
        console.log("===========================");
        console.log("Users seeder successfully");
        console.log("===========================");
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in user seeder:', message);
        console.error("----------------------");
    } finally {
        await AppDataSource.destroy();
    }
}