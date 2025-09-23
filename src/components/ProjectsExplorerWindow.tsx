import type { ProjectFolder, ProjectDetailFile } from '../types/FileTypes';

interface Props {
  file: ProjectFolder;
  onOpenWindow: (project: ProjectDetailFile) => void;
}

export default function ProjectsExplorerWindow({ file, onOpenWindow }: Props) {
  return (
    <div>
      {/* <h2>{file.name ?? file.id}</h2> */}
      <div className="project-explorer-list">
        {file.items.map(item => (
          <div
            key={item.name ?? item.id}
            className="project-explorer-item"
            onClick={() => onOpenWindow(item)}
            style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', margin: '4px 0' }}
          >
            📄 {item.name ?? item.id}
          </div>
        ))}
      </div>
    </div>
  );
}
