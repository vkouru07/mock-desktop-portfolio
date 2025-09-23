import DesktopIcon from './DesktopIcon';
import type { FileEntry } from '../types/FileTypes';
import styles from './Desktop.module.css';

interface Props {
  files: FileEntry[];
  onIconDoubleClick: (id: string) => void;
}

export default function Desktop({ files, onIconDoubleClick }: Props) {
  return (
    <div className={styles.desktop}>
      {files.map(file => (
        <DesktopIcon key={file.id} file={file} onDoubleClick={() => onIconDoubleClick(file.id)} />
      ))}
    </div>
  );
}
