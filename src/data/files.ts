import type { FileEntry } from '../types/FileTypes';

// might change this to yaml or json later
export const defaultOpenedFileIDs = ['about', 'resume'];

export const files: FileEntry[] = [
  {
    id: 'resume',
    name: 'Resume/Education.pdf',
    type: 'pdf',
    icon: 'resume',
    contentHtml: `
      <h3>Vaishnavi Kouru</h3>
      <p>Computer Science @ SJSU, 2023-2026 </p>
      <p>github.com/vkouru07</p>
      <p>Fav Langs: Python3, C++, Java, TS, JS </p>
      <p>
        CS Courses: Data Structures and Algorithms (CS 146), 
        Object Oriented Design (CS 151), Formal Languages and Computability (CS 154), 
        Computer Systems (CS 47), Operating Systems (CS 149), 
        Computer Architecture (CS 147), Mobile App Development (CS 175)
      </p>
      <p>
        Math Courses: Linear Algebra (MATH 39), Combinatorics (Math 142), Discrete Math (MATH 42)
      </p> 
    `
  },
  {
    id: 'web-dev-projects',
    name: 'Web Dev Projects',
    type: 'folder',
    // icon: 'projects',
    items: [
      {
        type: 'project-detail',
        id: 'portfolio-website',
        name: 'simple mock desktop portfolio site',
        // icon: 'portfolio',
        description: 'This website, a simple mock desktop portfolio.',
        techStack: ['React', 'TS', 'CSS'],
        link: 'remember to put a link here'
      },
      {
        type: 'project-detail',
        id: 'end-of-the-track',
        // icon: 'iot',
        description: 'Live pvp game using websockets. Sort of similar to chess.',
        techStack: ['React', 'Node', 'Flask']
      },
    ]
  },
  {
    id: 'teaching-exp',
    name: 'teaching/ tutoring experience',
    type: 'folder',
    items: [
      {
        type: 'project-detail',
        id: 'ID Tech Roblox Studio / Lua Coding Instructor',
        // name: 'Personal Portfolio Website',
        description: 'Taught kids how to code in Lua/Roblox Studio to make their own games.',
        techStack: ['Lua', 'Roblox Studio'],
      },
    ]
  },
  {
    id: 'about',
    name: 'About Me.txt',
    type: 'txt',
    icon: 'about',
    content: `I'm a CS student. I'm pretty open-minded, and I've done a variety of stuff.`
  },
  {
    id: 'contact',
    name: 'Contact',
    type: 'contact',
    icon: 'contact',
    content: {
      email: 'vkouru07@gmail.com',
      github: 'https://github.com/vkouru07',
      linkedin: 'https://www.linkedin.com/in/vaishnavi-kouru/'
    }
  }
];
