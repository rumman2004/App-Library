import { Crop, Calculator, LayoutDashboard, FolderLock } from 'lucide-react';

export interface AppInfo {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: any; // Lucide icon
  image: string;
  features: string[];
  techStack: string[];
  downloadUrl: string;
  version: string;
  releaseDate: string;
  color: string; // Used for unique branding per app
}

export const appsData: AppInfo[] = [
  {
    id: 'dr-crop',
    name: 'Dr. Crop',
    shortDescription: 'AI-powered crop disease detection and agricultural assistant.',
    fullDescription: 'Dr. Crop is a mobile application designed to help farmers and agricultural enthusiasts identify crop diseases instantly. By utilizing advanced machine learning models, it analyzes plant leaves to detect issues and provides actionable remedies, improving yield and crop health.',
    icon: Crop,
    image: 'https://images.unsplash.com/photo-1592982537447-6f2284af08ee?auto=format&fit=crop&q=80&w=800', // Placeholder image
    features: [
      'Real-time disease detection using device camera',
      'Extensive database of plant diseases and remedies',
      'Weather integration for agricultural planning',
      'Community forum for farmers to share knowledge'
    ],
    techStack: ['React Native', 'TensorFlow Lite', 'Node.js', 'MongoDB', 'Cloudinary'],
    downloadUrl: 'https://expo.dev/accounts/rumman04/projects/dr-crop/builds/7c7f1385-a485-4e70-b9ab-22eb65f1a1d9',
    version: '1.2.0',
    releaseDate: 'October 2025',
    color: 'from-green-400 to-emerald-600',
  },
  {
    id: 'my-calculator',
    name: 'MyCalculator',
    shortDescription: 'A sleek, multi-functional calculator for everyday and scientific use.',
    fullDescription: 'MyCalculator reimagines the standard calculator app with a stunning glassmorphism UI and advanced functionalities. It features a standard mode for quick calculations, a scientific mode for complex equations, and a history log that persists across sessions.',
    icon: Calculator,
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=800',
    features: [
      'Standard, Scientific, and Programmer modes',
      'Beautiful, responsive glassmorphism design',
      'Calculation history and memory functions',
      'Customizable themes (Light/Dark)'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    downloadUrl: 'https://expo.dev/artifacts/eas/aX8KhqZzSizYmnc254xFKb.apk',
    version: '2.0.1',
    releaseDate: 'January 2026',
    color: 'from-purple-400 to-indigo-600',
  },
  {
    id: 'planix',
    name: 'Planix',
    shortDescription: 'Intuitive task management and productivity planner.',
    fullDescription: 'Planix is a comprehensive productivity suite that helps you organize your life. With Kanban boards, calendar views, and intelligent time-blocking, it adapts to your workflow, ensuring you stay focused and achieve your goals efficiently.',
    icon: LayoutDashboard,
    image: 'https://images.unsplash.com/photo-1507925922893-873d059086d1?auto=format&fit=crop&q=80&w=800',
    features: [
      'Interactive Kanban boards with drag-and-drop',
      'Detailed analytics and productivity insights',
      'Integration with Google Calendar and Outlook',
      'Collaborative workspaces for teams'
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Zustand'],
    downloadUrl: 'https://expo.dev/accounts/rumman04/projects/planix-mobile/builds/3a376cd6-42f1-4ec6-bf8f-be2efcc9de06',
    version: '1.0.5',
    releaseDate: 'March 2026',
    color: 'from-rose-400 to-orange-500',
  },
  {
    id: 'antinode',
    name: 'Antinode',
    shortDescription: 'Centralized, secure notes & document manager with a live cloud backend.',
    fullDescription: 'Antinode is a modern, high-performance mobile app that centralizes your digital workspace. Create folders, upload documents, and organize notes in one secure hub — backed by JWT authentication and a live AWS EC2 cloud server, all wrapped in a premium, distraction-free design.',
    icon: FolderLock,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    features: [
      'Secure JWT authentication',
      'Smart folder & file management',
      'Live AWS EC2 cloud backend',
      'Premium minimalist UI with micro-animations'
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'Express', 'AWS'],
    downloadUrl: 'https://drive.google.com/file/d/1fGlz5E20LyGignmI8o9-SlgbVHE3i5ZR/view?usp=sharing',
    version: '1.0.0',
    releaseDate: 'July 2026',
    color: 'from-blue-400 to-indigo-600',
  }
];
