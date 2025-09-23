import type { FileEntry } from '../types/FileTypes';
import { ICONS } from '../assets/icons';
import './DesktopIcon.css';

interface Props {
  file: FileEntry;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ file, onDoubleClick }: Props) {
  const icon = ICONS[file.type] || ICONS.default;

  return (
    <div className="desktop-icon" onDoubleClick={onDoubleClick}>
      <div className="icon">{icon}</div>
      <div className="label">{file.name}</div>
    </div>
  );
}
