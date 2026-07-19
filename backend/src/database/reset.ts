import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AdminSeeder } from './seeders/AdminSeeder.js';
import { ServiceSeeder } from './seeders/ServiceSeeder.js';
import { ProjectSeeder } from './seeders/ProjectSeeder.js';
import { TeamSeeder } from './seeders/TeamSeeder.js';
import { TestimonialSeeder } from './seeders/TestimonialSeeder.js';
import { PartnerSeeder } from './seeders/PartnerSeeder.js';
import { FaqSeeder } from './seeders/FaqSeeder.js';
import { BlogSeeder } from './seeders/BlogSeeder.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rawafid-omran';

const seeders = [
  AdminSeeder,
  ServiceSeeder,
  ProjectSeeder,
  TeamSeeder,
  TestimonialSeeder,
  PartnerSeeder,
  FaqSeeder,
  BlogSeeder
];

async function reset() {
  try {
    console.log('🔄 Starting database reset...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Run down() method for all seeders in reverse order
    for (const SeederClass of [...seeders].reverse()) {
      const seeder = new SeederClass();
      console.log(`🗑️  Running ${SeederClass.name}...`);
      await seeder.down();
    }

    console.log('\n✨ Database reset completed successfully!');
    console.log('\n📊 Removed data:');
    console.log('   - Blog posts');
    console.log('   - FAQs');
    console.log('   - Partners');
    console.log('   - Testimonials');
    console.log('   - Team members');
    console.log('   - Projects');
    console.log('   - Services');
    console.log('   - Admin users');
    
  } catch (error) {
    console.error('\n❌ Reset failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

reset();