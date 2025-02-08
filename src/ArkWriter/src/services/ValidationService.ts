import { ProjectData, Component } from '../types/project';

class ValidationService {
  validateProject(project: ProjectData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate project settings
    if (!project.name?.trim()) {
      errors.push('Project name is required');
    }

    // Validate rungs
    project.rungs.forEach((rung, index) => {
      // Check for empty rungs
      if (rung.components.length === 0) {
        errors.push(`Rung ${index + 1} is empty`);
      }

      // Validate component connections
      const lastPosition = rung.components.length > 0 
        ? Math.max(...rung.components.map(c => c.position))
        : 0;
      
      // Check for gaps in component positions
      const positions = new Set(rung.components.map(c => c.position));
      for (let i = 1; i <= lastPosition; i++) {
        if (!positions.has(i)) {
          errors.push(`Rung ${index + 1} has a gap at position ${i}`);
        }
      }

      // Validate component-specific rules
      rung.components.forEach((component, compIndex) => {
        const componentErrors = this.validateComponent(component);
        componentErrors.forEach(error => {
          errors.push(`Rung ${index + 1}, Component ${compIndex + 1}: ${error}`);
        });
      });
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private validateComponent(component: Component): string[] {
    const errors: string[] = [];

    // Validate component type
    if (!component.type) {
      errors.push('Component type is required');
    }

    // Validate position
    if (typeof component.position !== 'number' || component.position < 0) {
      errors.push('Invalid component position');
    }

    // Validate variables based on component type
    if (component.variables) {
      switch (component.type) {
        case 'TIMER':
          if (typeof component.variables.preset !== 'number') {
            errors.push('Timer preset must be a number');
          }
          break;
        case 'COUNTER':
          if (typeof component.variables.preset !== 'number') {
            errors.push('Counter preset must be a number');
          }
          break;
        case 'COMPARE':
          if (typeof component.variables.value1 !== 'number' || 
              typeof component.variables.value2 !== 'number') {
            errors.push('Compare values must be numbers');
          }
          break;
      }

      // Validate addresses if present
      if (component.variables.address && !this.isValidAddress(component.variables.address)) {
        errors.push('Invalid address format');
      }
    }

    return errors;
  }

  private isValidAddress(address: string): boolean {
    // Add address validation logic based on your requirements
    return /^[A-Za-z0-9_]+$/.test(address);
  }
}

export const validationService = new ValidationService();