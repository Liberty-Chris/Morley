export type DataType = 'BOOL' | 'INT' | 'DINT' | 'REAL' | 'TIME' | 'STRING' | 'WORD' | 'BYTE';

export interface Variable {
  name: string;
  type: DataType;
  address: string;
  scope: 'local' | 'global';
  usage: 'input' | 'output' | 'memory';
  description?: string;
  value?: any;
}

export interface POU {
  name: string;
  type: 'program' | 'function' | 'functionBlock';
  variables: {
    input: Variable[];
    output: Variable[];
    local: Variable[];
  };
  rungs: any[]; // Define proper rung type based on your ladder logic structure
}

export interface IOPoint {
  id: string;
  name: string;
  type: 'DI' | 'DO' | 'AI' | 'AO';
  address: string;
  protocol: string;
  deviceId: string;
  description: string;
  range?: {
    min: number;
    max: number;
  };
}

export interface IODevice {
  id: string;
  name: string;
  protocol: string;
  address: string;
  points: IOPoint[];
}

export interface DebugState {
  running: boolean;
  paused: boolean;
  scanTime: number;
  currentRung?: number;
  forcedVariables: Map<string, any>;
  breakpoints: Set<number>;
  watchList: Set<string>;
}