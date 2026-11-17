/**
 * Seed the portfolio's three initial projects into MongoDB.
 * Run with: npm run seed
 *
 * Safe to re-run: existing projects are matched by slug and updated.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const projects = [
  {
    title: 'RentRide — Multi-Vehicle Rental Platform',
    slug: 'rentride',
    description:
      'A multi-vehicle rental platform that allows users to explore and book different types of vehicles. Built responsive interfaces using React.js and Tailwind CSS and implemented backend services with Node.js and Express.js.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'JWT', 'Razorpay', 'Map Services', 'Supabase'],
    image: '/images/projects/rentride.svg',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    displayOrder: 1,
  },
  {
    title: 'Text-to-Image Generation',
    slug: 'text-to-image-generation',
    description:
      'An AI-powered web application that converts text prompts into images. Built an interactive frontend, integrated an AI image-generation API, and implemented backend functionality to process user prompts and display generated images.',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'],
    image: '/images/projects/text-to-image.svg',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    displayOrder: 2,
  },
  {
    title: 'Personal Developer Portfolio',
    slug: 'personal-developer-portfolio',
    description:
      'A responsive personal portfolio showcasing my technical skills, internship experience, and development projects. Features dynamic project management via a secure admin dashboard, a working contact form, and JWT-secured APIs.',
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    image: '/images/projects/portfolio.svg',
    githubUrl: 'https://github.com/LaxmanTarihalkar',
    liveUrl: '',
    featured: true,
    displayOrder: 3,
  },
];

async function seed() {
  await connectDB();

  try {
    for (const p of projects) {
      await Project.findOneAndUpdate({ slug: p.slug }, p, {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      });
      console.log(`Seeded: ${p.slug}`);
    }
    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
