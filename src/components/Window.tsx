import { Rnd } from 'react-rnd';
import type { FileEntry, ProjectDetailFile } from '../types/FileTypes';
import ProjectsExplorerWindow from './ProjectsExplorerWindow';
import './Window.css';

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 300;

interface Props {
  file: FileEntry;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  position: { x: number; y: number };
  onOpenWindow?: (project: ProjectDetailFile) => void;
}

export default function Window({ file, onClose, zIndex, onFocus, position, onOpenWindow }: Props) {
  const renderContent = () => {
    switch (file.type) {
      case 'pdf':
        return <div dangerouslySetInnerHTML={{ __html: file.contentHtml }} />;
      case 'txt':
        return <pre>{file.content}</pre>;
      case 'contact':
        return (
          <ul>
            {file.content.email && <li>Email: {file.content.email}</li>}
            <li>
              GitHub: <a href={file.content.github}>{file.content.github}</a>
            </li>
            <li>
              LinkedIn: <a href={file.content.linkedin}>{file.content.linkedin}</a>
            </li>
          </ul>
        );
      case 'folder':
        return (
          <ProjectsExplorerWindow
            file={file}
            onOpenWindow={onOpenWindow || (() => { })}
          />
        );
      case 'project-detail':
        return (
          <div>
            <p>{file.description}</p>
            <div>
              {file.techStack && <strong>Tech:</strong>} {file.techStack?.join(', ')}
            </div>
            {file.link && (
              <div><a href={file.link} target="_blank" rel="noopener noreferrer">View Project</a></div>
            )}
          </div>
        );
    }
  };

  if (file.type == 'alert') {
    return (<div></div>); 
  }
  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT
      }}
      bounds="parent"
      onDragStart={onFocus}
      onResizeStart={onFocus}
      style={{ zIndex }}
      className="window"
    >
      <div className="window-header">
        <span>{file.name}</span>
        <button onClick={onClose} className="x-button">x</button>
      </div>
      <div className="window-content">{renderContent()}</div>
    </Rnd>
  );
}
