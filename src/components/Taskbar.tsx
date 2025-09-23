import './Taskbar.css';

interface Props {
  openWindows: { file: { id: string; name?: string } }[];
  onFocus: (id: string) => void;
}

export default function Taskbar({ openWindows, onFocus }: Props) {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="taskbar">
      <div className="start">whee</div>
      <div className="open-windows">
        {openWindows.map(({ file }) => (
          <button key={file.id} className="taskbar-button" onClick={() => onFocus(file.id)}>
            {file.name ?? file.id}
          </button>
        ))}
      </div>
      <div className="clock">{now}</div>
    </div>
  );
}
