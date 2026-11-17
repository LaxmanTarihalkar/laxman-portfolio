/**
 * Static portfolio content — personal info, navigation, experience, skills.
 * Projects are fetched dynamically from the backend; this file holds only
 * non-admin editorial content that doesn't change at runtime.
 */

export const personal = {
  fullName: 'Laxman Tarihalkar',
  firstName: 'Laxman',
  lastName: 'Tarihalkar',
  title: 'Full-Stack Developer',
  tagline: 'Building Digital Experiences Through Code.',
  secondaryTagline: 'Turning Ideas Into Functional Digital Experiences.',
  intro: "HELLO, I'M",
  email: 'laxmantarihalkar05@gmail.com',
  phone: '+91 8792451091',
  location: 'Belagavi, Karnataka, India',
  locationShort: 'Belagavi, India',
  github: 'https://github.com/LaxmanTarihalkar',
  linkedin: '',
  education: 'MCA Graduate — 2026',
  cgpa: '8.0',
  college: 'Jain College of Engineering, Belagavi',
  degree: 'Master of Computer Applications (MCA)',
  resumeUrl: '/resume/Laxman-Tarihalkar-Resume.pdf',
  heroVideo: '/videos/hero-video.mp4',
  heroPoster: '/images/hero-poster.svg',
};

export const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
];

export const aboutParagraphs = [
  "I'm Laxman Tarihalkar, an MCA graduate and aspiring Full-Stack Developer from Belagavi, Karnataka.",
  'I enjoy building modern, responsive web applications and turning ideas into practical digital solutions.',
  'My technical interests include frontend development with React.js, backend development using Node.js and Express.js, and working with databases such as MongoDB and MySQL.',
  'I have gained practical experience through internships and hands-on projects involving web development, data analytics, and application development.',
  "I'm continuously improving my technical skills, exploring new technologies, and looking for opportunities to contribute to a software development team.",
];

export const aboutFacts = [
  { label: 'MCA Graduate', value: '2026' },
  { label: 'CGPA', value: '8.0' },
  { label: 'Location', value: 'Belagavi, India' },
];

export const experiences = [
  {
    id: 'ifuturetech',
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
  },
  {
    id: 'edureka',
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
  },
];

export const skillGroups = [
  {
    title: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
    icon: 'Layout',
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'Java', 'REST APIs'],
    icon: 'Server',
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'SQL'],
    icon: 'Database',
  },
  {
    title: 'Tools & Version Control',
    skills: ['Git', 'GitHub'],
    icon: 'GitBranch',
  },
  {
    title: 'Additional Practical Exposure',
    skills: ['Python', 'Microsoft Excel', 'Power BI'],
    icon: 'BarChart3',
  },
];

export const staticProjects = [
  {
    _id: 'rentride',
    slug: 'rentride',
    title: 'RentRide — Multi-Vehicle Rental Platform',
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
    _id: 'text-to-image',
    slug: 'text-to-image-generation',
    title: 'Text-to-Image Generation',
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
    _id: 'portfolio',
    slug: 'personal-developer-portfolio',
    title: 'Personal Developer Portfolio',
    description:
      'A responsive personal portfolio showcasing technical skills, internship experience, and development projects. Features dynamic project management via a secure admin dashboard, a working contact form, and JWT-secured APIs.',
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    image: '/images/projects/portfolio.svg',
    githubUrl: 'https://github.com/LaxmanTarihalkar',
    liveUrl: '',
    featured: true,
    displayOrder: 3,
  },
];
