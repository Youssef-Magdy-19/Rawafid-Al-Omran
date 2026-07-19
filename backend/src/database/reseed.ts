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

async function reseed() {
  try {
    console.log('🔄 Starting database reseed...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Run down() method for all seeders in reverse order
    console.log('🗑️  Removing existing data...\n');
    for (const SeederClass of [...seeders].reverse()) {
      const seeder = new SeederClass();
      console.log(`   - Removing ${SeederClass.name}...`);
      await seeder.down();
    }

    console.log('\n🌱 Seeding new data...\n');
    // Run up() method for all seeders
    for (const SeederClass of seeders) {
      const seeder = new SeederClass();
      console.log(`   - Seeding ${SeederClass.name}...`);
      await seeder.run();
    }

    console.log('\n✨ Database reseed completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Reseed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

reseed();