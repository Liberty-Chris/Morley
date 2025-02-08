import { loadPyodide, PyodideInterface } from 'pyodide';

export interface CompilationResult {
  success: boolean;
  data?: any;
  error?: string;
}

class CompilationService {
  private pyodide: PyodideInterface | null = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      this.pyodide = await loadPyodide();
      
      // Load the Python compiler code
      await this.pyodide.runPythonAsync(`
        ${llParserCode}
        ${validatorCode}
        ${plutusCompilerCode}
      `);

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
      throw new Error('Failed to initialize compilation service');
    }
  }

  async parseToIR(rungs: any[]): Promise<CompilationResult> {
    if (!this.pyodide) {
      return { success: false, error: 'Compilation service not initialized' };
    }

    try {
      const result = await this.pyodide.runPythonAsync(`
        parse_ladder_logic(${JSON.stringify(rungs)})
      `);

      return { success: true, data: result };
    } catch (error: any) {
      return {
        success: false,
        error: `IR Generation failed: ${error.message || 'Unknown error'}`
      };
    }
  }

  async validateIR(ir: string): Promise<CompilationResult> {
    if (!this.pyodide) {
      return { success: false, error: 'Compilation service not initialized' };
    }

    try {
      const result = await this.pyodide.runPythonAsync(`
        valid, message = validate_ir_structure(${ir})
        {'valid': valid, 'message': message}
      `);

      return {
        success: result.valid,
        data: result.valid ? 'IR validation successful' : undefined,
        error: !result.valid ? result.message : undefined
      };
    } catch (error: any) {
      return {
        success: false,
        error: `IR Validation failed: ${error.message || 'Unknown error'}`
      };
    }
  }

  async compileToPlutusTx(ir: string): Promise<CompilationResult> {
    if (!this.pyodide) {
      return { success: false, error: 'Compilation service not initialized' };
    }

    try {
      const result = await this.pyodide.runPythonAsync(`
        compile_ir_to_plutus_haskell_enhanced(${ir})
      `);

      return { success: true, data: result };
    } catch (error: any) {
      return {
        success: false,
        error: `Plutus compilation failed: ${error.message || 'Unknown error'}`
      };
    }
  }
}

export const compilationService = new CompilationService();