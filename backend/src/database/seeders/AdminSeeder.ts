import { Seeder } from '../seed/seeder.js';
import { User } from '../../modules/auth/models/user.model.js';

export class AdminSeeder extends Seeder {
  protected readonly seederName = 'AdminSeeder';

  async run(): Promise<void> {
    this.log('Starting admin user seeding...');

    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@rawafid-omran.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
      const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
      const adminLastName = process.env.ADMIN_LAST_NAME || 'User';

      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminEmail });
      
      if (existingAdmin) {
        this.success(`Admin user already exists: ${adminEmail}`);
        return;
      }

      // Create admin user (password will be hashed by pre-save hook)
      const admin = new User({
        email: adminEmail,
        password: adminPassword,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: 'admin',
        isActive: true,
        isEmailVerified: true
      });

      await admin.save();
      this.success(`Admin user created: ${adminEmail}`);
    } catch (error) {
      this.error(`Failed to seed admin: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing admin users...');

    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@rawafid-omran.com';
      await User.deleteMany({ email: adminEmail });
      this.success('Admin users removed');
    } catch (error) {
      this.error(`Failed to remove admin: ${error}`);
      throw error;
    }
  }
}