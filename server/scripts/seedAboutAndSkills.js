/**
 * Seed the About content and Skill groups into MongoDB.
 * Run with: npm run seed-about
 * Safe to re-run — upserts existing documents.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import About from '../models/About.js';
import Skill from '../models/Skill.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const aboutData = {
  paragraphs: [
    "I'm Laxman Tarihalkar, an MCA graduate and aspiring Full-Stack Developer from Belagavi, Karnataka.",
    'I enjoy building modern, responsive web applications and turning ideas into practical digital solutions.',
    'My technical interests include frontend development with React.js, backend development using Node.js and Express.js, and working with databases such as MongoDB and MySQL.',
    'I have gained practical experience through internships and hands-on projects involving web development, data analytics, and application development.',
    "I'm continuously improving my technical skills, exploring new technologies, and looking for opportunities to contribute to a software development team.",
  ],
  facts: [
    { label: 'MCA Graduate', value: '2026' },
    { label: 'CGPA', value: '8.0' },
    { label: 'Location', value: 'Belagavi, India' },
  ],
  profileImage: '/images/Laxman-Tarihalkar-img.png',
};

const skillsData = [
  { title: 'Frontend Development', icon: 'Layout',    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'], displayOrder: 1 },
  { title: 'Backend Development',  icon: 'Server',    skills: ['Node.js', 'Express.js', 'Java', 'REST APIs'],              displayOrder: 2 },
  { title: 'Databases',            icon: 'Database',  skills: ['MongoDB', 'MySQL', 'SQL'],                                  displayOrder: 3 },
  { title: 'Tools & Version Control', icon: 'GitBranch', skills: ['Git', 'GitHub'],                                         displayOrder: 4 },
  { title: 'Additional Practical Exposure', icon: 'BarChart3', skills: ['Python', 'Microsoft Excel', 'Power BI'],           displayOrder: 5 },
];

async function seed() {
  await connectDB();
  try {
    // About — upsert single doc
    await About.findOneAndUpdate({}, aboutData, {
      upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true,
    });
    console.log('Seeded: About content');

    // Skills — upsert by title
    for (const s of skillsData) {
      await Skill.findOneAndUpdate({ title: s.title }, s, {
        upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true,
      });
      console.log(`Seeded: ${s.title}`);
    }
    console.log('About + Skills seed complete.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
