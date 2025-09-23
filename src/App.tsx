import { useState } from 'react';
import { files as initialFiles, defaultOpenedFileIDs } from './data/files';
import type { FileEntry, ProjectDetailFile } from './types/FileTypes';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import './App.css';

interface OpenWindow {
  file: FileEntry;
  zIndex: number;
  position: { x: number; y: number };
}

function App() {
  const createInitialWindows = (): OpenWindow[] => {
    // const defaultFileIds = ['about', 'resume']; 
    
    return defaultOpenedFileIDs.map((id, index) => {
      const file = initialFiles.find(f => f.id === id);
      if (!file) return null;
      
      const offset = index * 20;
      return {
        file,
        zIndex: index + 1,
        position: { x: 100 + offset, y: 100 + offset }
      };
    }).filter(Boolean) as OpenWindow[];
  };

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>(createInitialWindows());
  const [zCount, setZCount] = useState(3); // Start with higher z-index to account for default windows

  const openFile = (id: string) => {
    const file = initialFiles.find(f => f.id === id);
    if (!file) return;

    setOpenWindows(prev => {
      const exists = prev.find(w => w.file.id === id);
      if (exists) {
        focusWindow(id);
        return prev;
      }

      const offset = prev.length * 20;
      const windowWithOffset = {
        file,
        zIndex: zCount,
        position: { x: 100 + offset, y: 100 + offset }
      };

      return [...prev, windowWithOffset];
    });

    setZCount(z => z + 1);
  };

  const openProjectWindow = (project: ProjectDetailFile) => {

    const projectFile: ProjectDetailFile = {
      ...project,
      name: project.name ?? project.id,
      icon: project.icon || 'project'
    };

    setOpenWindows(prev => {
      const exists = prev.find(w => w.file.id === projectFile.id);
      if (exists) {
        focusWindow(projectFile.id);
        return prev;
      }

      const offset = prev.length * 20;
      const windowWithOffset = {
        file: projectFile,
        zIndex: zCount,
        position: { x: 100 + offset, y: 100 + offset }
      };

      return [...prev, windowWithOffset];
    });

    setZCount(z => z + 1);
  };

  const closeFile = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.file.id !== id));
  };

  const focusWindow = (id: string) => {
    setOpenWindows(prev =>
      prev.map(w =>
        w.file.id === id ? { ...w, zIndex: zCount } : w
      )
    );
    setZCount(z => z + 1);
  };

  return (
    <div className="app">
      <Desktop files={initialFiles} onIconDoubleClick={openFile} />
      {openWindows.map(w => (
        <Window
          key={w.file.id}
          file={w.file}
          onClose={() => closeFile(w.file.id)}
          onFocus={() => focusWindow(w.file.id)}
          zIndex={w.zIndex}
          position={w.position}
          onOpenWindow={openProjectWindow}
        />
      ))}
      <Taskbar openWindows={openWindows} onFocus={focusWindow} />
    </div>
  );
}

export default App;
