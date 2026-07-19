import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AdminSeeder } from '../seeders/AdminSeeder.js';
import { ServiceSeeder } from '../seeders/ServiceSeeder.js';
import { ProjectSeeder } from '../seeders/ProjectSeeder.js';
import { TeamSeeder } from '../seeders/TeamSeeder.js';
import { TestimonialSeeder } from '../seeders/TestimonialSeeder.js';
import { PartnerSeeder } from '../seeders/PartnerSeeder.js';
import { FaqSeeder } from '../seeders/FaqSeeder.js';
import { BlogSeeder } from '../seeders/BlogSeeder.js';

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

async function seed() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    for (const SeederClass of seeders) {
      const seeder = new SeederClass();
      console.log(`\n📦 Running ${SeederClass.name}...`);
      await seeder.run();
    }

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Seeded data:');
    console.log('   - Admin users');
    console.log('   - Services');
    console.log('   - Projects');
    console.log('   - Team members');
    console.log('   - Testimonials');
    console.log('   - Partners');
    console.log('   - FAQs');
    console.log('   - Blog posts');
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

seed();