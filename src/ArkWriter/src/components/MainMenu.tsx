import React from 'react';
import { Menu } from './Menu';

interface MainMenuProps {
  onNewProject: () => void;
  onOpenProject: () => void;
  onSaveProject: () => void;
  onShowVariables: () => void;
  onShowIOConfig: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onNewProject,
  onOpenProject,
  onSaveProject,
  onShowVariables,
  onShowIOConfig
}) => {
  const menus = [
    {
      label: 'Edit',
      items: [
        { label: 'Cut', onClick: () => {} },
        { label: 'Copy', onClick: () => {} },
        { label: 'Paste', onClick: () => {} },
        { label: 'Delete', onClick: () => {} }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', onClick: () => {} },
        { label: 'Zoom Out', onClick: () => {} },
        { label: 'Fit to Screen', onClick: () => {} },
        { type: 'separator' },
        { label: 'Show Grid', onClick: () => {} },
        { label: 'Show Address Labels', onClick: () => {} }
      ]
    },
    {
      label: 'Project',
      items: [
        { label: 'Properties', onClick: () => {} },
        { label: 'Variables', onClick: onShowVariables },
        { label: 'I/O Configuration', onClick: onShowIOConfig }
      ]
    },
    {
      label: 'Build',
      items: [
        { label: 'Verify', onClick: () => {} },
        { label: 'Build Project', onClick: () => {} },
        { label: 'Generate Plutus', onClick: () => {} },
        { type: 'separator' },
        { label: 'Build Settings', onClick: () => {} }
      ]
    },
    {
      label: 'Debug',
      items: [
        { label: 'Start Debugging', onClick: () => {} },
        { label: 'Stop Debugging', onClick: () => {} },
        { type: 'separator' },
        { label: 'Watch Window', onClick: () => {} },
        { label: 'Force Values', onClick: () => {} }
      ]
    }
  ];

  return (
    <div className="flex items-center space-x-4">
      {menus.map((menu, index) => (
        <Menu key={index} {...menu} />
      ))}
    </div>
  );
};