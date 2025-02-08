export interface ProjectSettings {
  name: string;
  description: string;
  author: string;
  gridSize: number;
  showGrid: boolean;
  showAddresses: boolean;
  autoSave: boolean;
}

export interface Component {
  type: string;
  position: number;
  variables?: {
    address?: string;
    description?: string;
    [key: string]: any;
  };
}

export interface Rung {
  components: Component[];
}

export interface ProjectData {
  name: string;
  rungs: Rung[];
  settings: ProjectSettings;
}