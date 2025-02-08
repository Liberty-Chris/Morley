import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WalletConnector from "./components/WalletConnector";
import ProjectSettings from './components/ProjectSettings';
import { MainMenu } from './components/MainMenu';
import VariableManager from './components/VariableManager';
import IOConfiguration from './components/IOConfiguration';
import { Variable } from './types/plc';
import { fileService } from './services/FileService';
import { toastService } from './services/ToastService';
import { useProjectState } from './hooks/useProjectState';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { 
  Circle, 
  CircleSlash, 
  Loader2, 
  Timer, 
  Hash, 
  Power,
  FileText,
  FolderOpen,
  Save,
  Printer,
  Undo2,
  Redo2,
  Bug,
  Square,
  Hammer,
  Upload,
  Plus,
  Minus,
  X,
  Clock,
  ArrowRight,
  ArrowLeftCircle,
  ArrowRightCircle,
  Cpu,
  ToggleLeft,
  ToggleRight,
  Gauge,
  Calculator,
  Binary,
  Equal,
  Divide,
  Percent,
  Type,
  Trash2,
  Settings
} from 'lucide-react';

// Constants for grid and rung configuration
const GRID_SIZE = 50;
const RAIL_WIDTH = 40;
const RUNG_HEIGHT = 100;

// Component Types
const COMPONENT_TYPES = {
  CONTACT_NO: 'CONTACT_NO',
  CONTACT_NC: 'CONTACT_NC',
  COIL: 'COIL',
  TIMER: 'TIMER',
  COUNTER: 'COUNTER',
  OUTPUT: 'OUTPUT',
  SET_COIL: 'SET_COIL',
  RESET_COIL: 'RESET_COIL',
  RISING_EDGE: 'RISING_EDGE',
  FALLING_EDGE: 'FALLING_EDGE',
  COMPARE: 'COMPARE',
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  MOD: 'MOD',
  MOVE: 'MOVE'
} as const;

// Default variables for each component type
const DEFAULT_VARIABLES = {
  [COMPONENT_TYPES.CONTACT_NO]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.CONTACT_NC]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.COIL]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.TIMER]: {
    preset: 0,
    current: 0,
    timeBase: 'ms',
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.COUNTER]: {
    preset: 0,
    current: 0,
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.COMPARE]: {
    value1: 0,
    value2: 0,
    operator: '==',
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.SET_COIL]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.RESET_COIL]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.RISING_EDGE]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.FALLING_EDGE]: {
    address: '',
    description: ''
  },
  [COMPONENT_TYPES.ADD]: {
    value1: 0,
    value2: 0,
    result: '',
    description: ''
  },
  [COMPONENT_TYPES.SUBTRACT]: {
    value1: 0,
    value2: 0,
    result: '',
    description: ''
  },
  [COMPONENT_TYPES.MULTIPLY]: {
    value1: 0,
    value2: 0,
    result: '',
    description: ''
  },
  [COMPONENT_TYPES.DIVIDE]: {
    value1: 0,
    value2: 1,
    result: '',
    description: ''
  },
  [COMPONENT_TYPES.MOD]: {
    value1: 0,
    value2: 1,
    result: '',
    description: ''
  },
  [COMPONENT_TYPES.MOVE]: {
    source: '',
    destination: '',
    description: ''
  }
} as const;

// Tools array with categories and components
const TOOLS = [
  { 
    category: "Basic",
    items: [
      { label: "NO Contact", type: COMPONENT_TYPES.CONTACT_NO, icon: ToggleRight },
      { label: "NC Contact", type: COMPONENT_TYPES.CONTACT_NC, icon: ToggleLeft },
      { label: "Coil", type: COMPONENT_TYPES.COIL, icon: Circle },
      { label: "Set Coil", type: COMPONENT_TYPES.SET_COIL, icon: ArrowRightCircle },
      { label: "Reset Coil", type: COMPONENT_TYPES.RESET_COIL, icon: ArrowLeftCircle }
    ]
  },
  {
    category: "Timers & Counters",
    items: [
      { label: "Timer ON", type: COMPONENT_TYPES.TIMER, icon: Timer },
      { label: "Timer OFF", type: COMPONENT_TYPES.TIMER, icon: Timer },
      { label: "Counter Up", type: COMPONENT_TYPES.COUNTER, icon: Plus },
      { label: "Counter Down", type: COMPONENT_TYPES.COUNTER, icon: Minus },
      { label: "Counter Reset", type: COMPONENT_TYPES.COUNTER, icon: X }
    ]
  },
  {
    category: "Edge Detection",
    items: [
      { label: "Rising Edge", type: COMPONENT_TYPES.RISING_EDGE, icon: ArrowRight },
      { label: "Falling Edge", type: COMPONENT_TYPES.FALLING_EDGE, icon: ArrowRight }
    ]
  },
  {
    category: "Math Operations",
    items: [
      { label: "Compare", type: COMPONENT_TYPES.COMPARE, icon: Equal },
      { label: "Add", type: COMPONENT_TYPES.ADD, icon: Plus },
      { label: "Subtract", type: COMPONENT_TYPES.SUBTRACT, icon: Minus },
      { label: "Multiply", type: COMPONENT_TYPES.MULTIPLY, icon: X },
      { label: "Divide", type: COMPONENT_TYPES.DIVIDE, icon: Divide },
      { label: "Modulo", type: COMPONENT_TYPES.MOD, icon: Percent }
    ]
  },
  {
    category: "Data Operations",
    items: [
      { label: "Move", type: COMPONENT_TYPES.MOVE, icon: ArrowRight },
      { label: "Digital Input", type: COMPONENT_TYPES.CONTACT_NO, icon: Binary },
      { label: "Digital Output", type: COMPONENT_TYPES.COIL, icon: Binary },
      { label: "Analog Input", type: COMPONENT_TYPES.CONTACT_NO, icon: Gauge },
      { label: "Analog Output", type: COMPONENT_TYPES.COIL, icon: Gauge },
      { label: "Memory Bit", type: COMPONENT_TYPES.CONTACT_NO, icon: Cpu }
    ]
  }
];

// DraggableTool component
interface DraggableToolProps {
  tool: {
    label: string;
    type: string;
    icon: React.ComponentType<any>;
  };
}

const DraggableTool: React.FC<DraggableToolProps> = ({ tool }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TOOL",
    item: { tool },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const Icon = tool.icon;

  return (
    <div
      ref={drag}
      className={`flex items-center space-x-2 p-2 rounded cursor-grab ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } hover:bg-gray-200 transition-colors`}
    >
      <Icon className="w-5 h-5" />
      <span>{tool.label}</span>
    </div>
  );
};

// Rung Component
interface RungProps {
  index: number;
  components: any[];
  onAddComponent: (index: number, component: any) => void;
  onEditComponent: (index: number, componentIndex: number) => void;
  onDeleteComponent: (index: number, componentIndex: number) => void;
  onDeleteRung: (index: number) => void;
  isLastRung: boolean;
}

const Rung: React.FC<RungProps> = ({ 
  index, 
  components, 
  onAddComponent, 
  onEditComponent, 
  onDeleteComponent, 
  onDeleteRung,
  isLastRung 
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TOOL",
    drop: (item: { tool: any }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const position = Math.floor((offset.x - RAIL_WIDTH) / GRID_SIZE);
        onAddComponent(index, { ...item.tool, position });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="relative">
      <div
        ref={drop}
        className="flex items-center relative"
        style={{
          height: `${RUNG_HEIGHT}px`,
          borderBottom: '1px solid #ccc',
        }}
      >
        {/* Left Power Rail */}
        <div className="bg-gray-800 h-full" style={{ width: `${RAIL_WIDTH}px` }}>
          <div className="h-full w-2 bg-gray-600 absolute left-0" />
        </div>

        {/* Rung Content */}
        <div className="flex-1 relative">
          {/* Horizontal Line */}
          <div className="absolute h-0.5 bg-gray-400 w-full top-1/2 transform -translate-y-1/2" />

          {/* Components */}
          {components.map((component, compIndex) => (
            <div
              key={compIndex}
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{ left: `${component.position * GRID_SIZE}px` }}
            >
              <div className={`p-2 rounded border ${getComponentStyle(component.type)}`}>
                {component.label || component.type}
                <div className="absolute top-full mt-1 flex space-x-1">
                  <button
                    onClick={() => onEditComponent(index, compIndex)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteComponent(index, compIndex)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Power Rail */}
        <div className="bg-gray-800 h-full" style={{ width: `${RAIL_WIDTH}px` }}>
          <div className="h-full w-2 bg-gray-600 absolute right-0" />
        </div>

        {/* Delete Rung Button (only show if not the last rung) */}
        {!isLastRung && (
          <button
            onClick={() => onDeleteRung(index)}
            className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 p-2 text-red-500 hover:text-red-700"
            title="Delete Rung"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// Helper function for component styles
const getComponentStyle = (type: string): string => {
  switch (type) {
    case COMPONENT_TYPES.CONTACT_NO:
      return 'bg-blue-100 border-blue-500';
    case COMPONENT_TYPES.CONTACT_NC:
      return 'bg-red-100 border-red-500';
    case COMPONENT_TYPES.COIL:
      return 'bg-green-100 border-green-500';
    default:
      return 'bg-gray-100 border-gray-500';
  }
};

// Main ArkWriter Component
const ArkWriter: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVariablesOpen, setIsVariablesOpen] = useState(false);
  const [isIOConfigOpen, setIsIOConfigOpen] = useState(false);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [editingComponent, setEditingComponent] = useState<any>(null);

  const {
    projectData,
    setProjectData,
    addRung,
    updateRung,
    deleteRung,
    undo,
    redo,
    canUndo,
    canRedo
  } = useProjectState({
    name: "Untitled Project",
    rungs: [{ components: [] }],
    settings: {
      name: "Untitled Project",
      description: "",
      author: "",
      gridSize: 50,
      showGrid: true,
      showAddresses: true,
      autoSave: false
    }
  });

  useKeyboardShortcuts({
    projectData,
    onNewProject: () => {
      setProjectData({
        name: "New Project",
        rungs: [{ components: [] }],
        settings: {
          name: "New Project",
          description: "",
          author: "",
          gridSize: 50,
          showGrid: true,
          showAddresses: true,
          autoSave: false
        }
      });
    },
    onSave: async () => {
      try {
        await fileService.saveProject(projectData, 'json');
        toastService.success('Project saved successfully');
      } catch (error: any) {
        toastService.error(`Failed to save project: ${error.message}`);
      }
    },
    onUndo: undo,
    onRedo: redo
  });

  const handleSettingsSave = (newSettings: any) => {
    setProjectData({
      ...projectData,
      settings: newSettings,
      name: newSettings.name
    });
    setIsSettingsOpen(false);
  };

  const handleAddComponent = (rungIndex: number, component: any) => {
    const rung = projectData.rungs[rungIndex];
    const updatedRung = {
      ...rung,
      components: [...rung.components, component].sort((a, b) => a.position - b.position)
    };
    updateRung(rungIndex, updatedRung);
  };

  const handleEditComponent = (rungIndex: number, componentIndex: number) => {
    setEditingComponent({
      rungIndex,
      componentIndex,
      component: projectData.rungs[rungIndex].components[componentIndex]
    });
  };

  const handleSaveComponent = (changes: any) => {
    if (!editingComponent) return;

    const { rungIndex, componentIndex } = editingComponent;
    const rung = projectData.rungs[rungIndex];
    const updatedComponents = [...rung.components];
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      ...changes
    };

    updateRung(rungIndex, { ...rung, components: updatedComponents });
    setEditingComponent(null);
  };

  const handleDeleteComponent = (rungIndex: number, componentIndex: number) => {
    const rung = projectData.rungs[rungIndex];
    const updatedComponents = rung.components.filter((_, index) => index !== componentIndex);
    updateRung(rungIndex, { ...rung, components: updatedComponents });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex flex-col bg-black text-white">
          {/* Main Menu Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src="https://raw.githubusercontent.com/Liberty-Chris/Morley/refs/heads/main/images/morley_white_soft_transparent.png"
                alt="Morley Logo"
                className="h-8"
              />
              <MainMenu
                onNewProject={() => {}}
                onOpenProject={() => {}}
                onSaveProject={() => {}}
                onShowVariables={() => setIsVariablesOpen(true)}
                onShowIOConfig={() => setIsIOConfigOpen(true)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <WalletConnector
                onWalletConnected={(address) => {
                  console.log("Wallet connected:", address);
                }}
              />
              <h2 className="text-xl font-bold font-ubuntu">ArkWriter</h2>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-2 bg-[#FF7F11]">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-orange-600 rounded" 
                title="Project Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-orange-600 mx-2"></div>
              <button 
                onClick={() => setProjectData({ name: "New Project", rungs: [{ components: [] }] })}
                className="p-2 hover:bg-orange-600 rounded" 
                title="New Project"
              >
                <FileText className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-orange-600 rounded" 
                title="Open Project"
              >
                <FolderOpen className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-orange-600 rounded" 
                title="Save"
              >
                <Save className="w-5 h-5" />
              </button>
              <button 
                onClick={() => window.print()}
                className="p-2 hover:bg-orange-600 rounded" 
                title="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-orange-600 mx-2"></div>
              <button 
                onClick={undo}
                disabled={!canUndo}
                className="p-2 hover:bg-orange-600 rounded disabled:opacity-50" 
                title="Undo"
              >
                <Undo2 className="w-5 h-5" />
              </button>
              <button 
                onClick={redo}
                disabled={!canRedo}
                className="p-2 hover:bg-orange-600 rounded disabled:opacity-50" 
                title="Redo"
              >
                <Redo2 className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-orange-600 mx-2"></div>
              <button className="p-2 hover:bg-orange-600 rounded" title="Start Debug">
                <Bug className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-orange-600 rounded" title="Stop Debug">
                <Square className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-orange-600 mx-2"></div>
              <button className="p-2 hover:bg-orange-600 rounded" title="Build">
                <Hammer className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-orange-600 rounded" title="Deploy">
                <Upload className="w-5 h-5" />
              </button>
            </div>

            {/* Filename display */}
            <div className="flex items-center">
              <span className="text-white text-sm font-medium">
                {projectData.name}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow">
          {/* Tool Palette */}
          <div className="w-72 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <div className="space-y-4">
              {TOOLS.map((category, index) => (
                <details key={index}>
                  <summary className="text-sm font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 p-2 rounded">
                    {category.category}
                  </summary>
                  <div className="ml-2 mt-2 space-y-1">
                    {category.items.map((tool, toolIndex) => (
                      <DraggableTool key={toolIndex} tool={tool} />
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Ladder Logic Editor */}
          <div className="flex-1 bg-white">
            <div className="p-4">
              <div className="mb-4">
                <button
                  onClick={addRung}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Add Rung
                </button>
              </div>
              <div className="border border-gray-300 rounded">
                {projectData.rungs.map((rung, index) => (
                  <Rung
                    key={index}
                    index={index}
                    components={rung.components}
                    onAddComponent={handleAddComponent}
                    onEditComponent={handleEditComponent}
                    onDeleteComponent={handleDeleteComponent}
                    onDeleteRung={deleteRung}
                    isLastRung={index === projectData.rungs.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {isSettingsOpen && (
          <ProjectSettings
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onSave={handleSettingsSave}
            initialSettings={projectData.settings}
          />
        )}

        {isVariablesOpen && (
          <VariableManager
            variables={variables}
            onAddVariable={(variable) => setVariables([...variables, variable])}
            onUpdateVariable={(index, variable) => {
              const newVariables = [...variables];
              newVariables[index] = variable;
              setVariables(newVariables);
            }}
            onDeleteVariable={(index) => {
              setVariables(variables.filter((_, i) => i !== index));
            }}
            onAddToWatch={() => {}}
            onClose={() => setIsVariablesOpen(false)}
          />
        )}

        {isIOConfigOpen && (
          <IOConfiguration
            devices={[]}
            onAddDevice={() => {}}
            onUpdateDevice={() => {}}
            onDeleteDevice={() => {}}
            onAddPoint={() => {}}
            onUpdatePoint={() => {}}
            onDeletePoint={() => {}}
            onClose={() => setIsIOConfigOpen(false)}
          />
        )}

        {editingComponent && (
          <VariableEditor
            component={editingComponent.component}
            onSave={handleSaveComponent}
            onClose={() => setEditingComponent(null)}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default ArkWriter;