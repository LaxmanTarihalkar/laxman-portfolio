/**
 * Seed the two initial internship experiences into MongoDB.
 * Run with: npm run seed-exp
 * Safe to re-run — matches by company+position and upserts.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const experiences = [
  {
    company: 'iFutureTech',
    position: 'Data Analytics Intern',
    type: 'Internship',
    location: 'Hybrid, Belagavi',
    duration: 'February 2026 – May 2026',
    responsibilities: [
      'Completed a three-month internship in Data Analytics and Frontend Development.',
      'Analyzed credit card and customer datasets.',
      'Created two interactive Power BI dashboards.',
      'Used Python and Microsoft Excel for data cleaning, processing, and analysis.',
      'Gained practical frontend experience using React.js and Tailwind CSS.',
    ],
    technologies: ['Python', 'Microsoft Excel', 'Power BI', 'React.js', 'Tailwind CSS'],
    displayOrder: 1,
  },
  {
    company: 'edureka! Learning Center',
    position: 'Web Developer Intern',
    type: 'Internship',
    location: 'On-site, Belagavi',
    duration: 'April 2024 – May 2024',
    responsibilities: [
      'Completed a five-week Full-Stack Web Development internship.',
      'Gained hands-on experience with HTML, CSS, JavaScript, PHP, and SQL.',
      'Practiced responsive frontend development.',
      'Learned PHP-based backend programming.',
      'Worked with SQL databases and practical development tasks.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SQL'],
    displayOrder: 2,
  },
];

async function seed() {
  await connectDB();
  try {
    for (const e of experiences) {
      await Experience.findOneAndUpdate(
        { company: e.company, position: e.position },
        e,
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
      console.log(`Seeded: ${e.position} @ ${e.company}`);
    }
    console.log('Experience seed complete.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
