export type FileType = 'pdf' | 'folder' | 'txt' | 'contact' | 'project-detail' | 'alert';

export interface BaseFile {
  id: string;
  name?: string;
  icon?: string;
  type: FileType;
}

export interface ProjectFolder extends BaseFile {
  type: 'folder';
  items: ProjectDetailFile[];
}
export interface ProjectDetailFile extends BaseFile {
  type: 'project-detail';
  // project: ProjectFolder;

  description: string;
  techStack?: string[];
  link?: string;
}

export interface PdfFile extends BaseFile {
  type: 'pdf';
  contentHtml: string;
}

export interface TxtFile extends BaseFile {
  type: 'txt';
  content: string;
}

export interface ContactFile extends BaseFile {
  type: 'contact';
  content: {
    email?: string;
    github: string;
    linkedin: string;
  };
}

export interface AlertFile extends BaseFile {
  type: 'alert';
  content: string;
}

export type FileEntry = ProjectFolder | PdfFile | TxtFile | ContactFile | ProjectDetailFile | AlertFile;