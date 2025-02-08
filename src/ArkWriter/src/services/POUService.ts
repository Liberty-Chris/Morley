import { POU, Variable } from '../types/plc';

class POUService {
  validatePOU(pou: POU): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate name
    if (!pou.name?.trim()) {
      errors.push('POU name is required');
    }

    // Validate type
    if (!['program', 'function', 'functionBlock'].includes(pou.type)) {
      errors.push('Invalid POU type');
    }

    // Validate variables
    this.validateVariables(pou.variables.input, 'Input', errors);
    this.validateVariables(pou.variables.output, 'Output', errors);
    this.validateVariables(pou.variables.local, 'Local', errors);

    // Validate function blocks have at least one input and output
    if (pou.type === 'functionBlock') {
      if (pou.variables.input.length === 0) {
        errors.push('Function blocks must have at least one input variable');
      }
      if (pou.variables.output.length === 0) {
        errors.push('Function blocks must have at least one output variable');
      }
    }

    // Validate rungs
    if (pou.rungs.length === 0) {
      errors.push('POU must contain at least one rung');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private validateVariables(variables: Variable[], scope: string, errors: string[]) {
    const names = new Set<string>();
    const addresses = new Set<string>();

    variables.forEach(variable => {
      // Check for duplicate names
      if (names.has(variable.name)) {
        errors.push(`Duplicate ${scope} variable name: ${variable.name}`);
      }
      names.add(variable.name);

      // Check for duplicate addresses
      if (addresses.has(variable.address)) {
        errors.push(`Duplicate ${scope} variable address: ${variable.address}`);
      }
      addresses.add(variable.address);

      // Validate address format
      if (!this.isValidAddress(variable.address)) {
        errors.push(`Invalid ${scope} variable address format: ${variable.address}`);
      }
    });
  }

  private isValidAddress(address: string): boolean {
    // Add address validation logic based on your requirements
    return /^[A-Za-z0-9_]+$/.test(address);
  }

  generateSTCode(pou: POU): string {
    let code = '';

    // Generate header
    code += `${pou.type.toUpperCase()} ${pou.name}\n\n`;

    // Generate variable declarations
    code += 'VAR_INPUT\n';
    pou.variables.input.forEach(v => {
      code += `  ${v.name} : ${v.type};\n`;
    });
    code += 'END_VAR\n\n';

    code += 'VAR_OUTPUT\n';
    pou.variables.output.forEach(v => {
      code += `  ${v.name} : ${v.type};\n`;
    });
    code += 'END_VAR\n\n';

    code += 'VAR\n';
    pou.variables.local.forEach(v => {
      code += `  ${v.name} : ${v.type};\n`;
    });
    code += 'END_VAR\n\n';

    // Generate logic
    pou.rungs.forEach((rung, index) => {
      code += `(* Rung ${index + 1} *)\n`;
      // Convert ladder logic to ST
      // This is a placeholder - implement actual conversion logic
      code += 'IF TRUE THEN\n  // Rung logic here\nEND_IF;\n\n';
    });

    code += `END_${pou.type.toUpperCase()}\n`;

    return code;
  }
}

export const pouService = new POUService();