import type { FileEntry } from '../types/FileTypes';

// might change this to yaml or json later
export const defaultOpenedFileIDs = ['about', 'resume', 'help'];

export const files: FileEntry[] = [
  {
    id: 'help',
    name: 'Help.txt',
    type: 'pdf',
    icon: 'help',
    contentHtml: `
      <h4>Hiii! :D</h4>
      <p>Hey dude! Click around this site to get to know me 
      and what I can do! </p>
      <p> Or, clone this on my github and change the data/files.ts files
      to easily make your own version of this site! </p> 
      `
  }, 
  {
    id: 'resume',
    name: 'Resume/Education.pdf',
    type: 'pdf',
    icon: 'resume',
    contentHtml: `
      <h3>Vaishnavi Kouru</h3>
      <p>Computer Science @ SJSU, 2023-2026 </p>
      <a>github.com/vkouru07</a>
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
    id: 'academic',
    name: 'Academia Stuff?',
    type: 'folder',
    items: [
      {
        id: 'cs154-grader', 
        name: 'CS154 (Formal Languages and Computability) grader',
        type: 'project-detail',
        description: `
        Grader for CS 154 (Formal Languages and Computability). 
        Summer 2026. For professor Yan Chen <3. `
      }
    ]
  },
  {
    id: 'web-dev-projects',
    name: 'Web Dev Projects',
    type: 'folder',
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
        description: 'Taught kids how to code in Lua/Roblox Studio to make their own games.',
        techStack: ['Lua', 'Roblox Studio'],
      },
      {
        type: 'project-detail',
        id: 'BAM Instructor',
        description: 'Taught kids some python.'
      },
      {
        type: 'project-detail',
        id: 'Kodely Instructor',
        description: 'Taught kids some block coding. '
      },
    ]
  },
  {
    id: 'about',
    name: 'About Me.txt',
    type: 'pdf',
    icon: 'about',
    contentHtml: 
    `I'm always open to talk! 
    Doesn't really have to be work-related. Talk to me if you're interested in:
    linguistics, pedagogy, UX/UI, automata theory, Python3, the free software movement, etc. 
    Honestly anything - always interested in learning new stuff.`
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
