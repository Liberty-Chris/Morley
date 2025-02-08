import { ProjectData } from '../types/project';

export type FileFormat = 'll' | 'st' | 'json';

class FileService {
  async saveProject(projectData: ProjectData, format: FileFormat): Promise<void> {
    try {
      let fileContent: string;
      let fileExtension: string;
      let mimeType: string;

      switch (format) {
        case 'll':
          fileContent = this.convertToLL(projectData);
          fileExtension = '.ll';
          mimeType = 'application/octet-stream';
          break;
        case 'st':
          fileContent = this.convertToST(projectData);
          fileExtension = '.st';
          mimeType = 'text/plain';
          break;
        case 'json':
          fileContent = JSON.stringify(projectData, null, 2);
          fileExtension = '.json';
          mimeType = 'application/json';
          break;
        default:
          throw new Error('Unsupported file format');
      }

      const options = {
        suggestedName: `${projectData.name}${fileExtension}`,
        types: [
          {
            description: 'Project File',
            accept: {
              [mimeType]: [fileExtension]
            }
          }
        ]
      };

      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      await writable.write(fileContent);
      await writable.close();
    } catch (error: any) {
      throw new Error(`Failed to save project: ${error.message}`);
    }
  }

  private convertToLL(projectData: ProjectData): string {
    // Convert project data to .ll format
    let output = `PROJECT: ${projectData.name}\n`;
    output += `AUTHOR: ${projectData.settings.author}\n`;
    output += `DESCRIPTION: ${projectData.settings.description}\n\n`;

    projectData.rungs.forEach((rung, index) => {
      output += `RUNG ${index + 1}\n`;
      rung.components.forEach(component => {
        output += `  ${component.type} ${component.position} `;
        if (component.variables) {
          output += JSON.stringify(component.variables);
        }
        output += '\n';
      });
      output += 'END_RUNG\n\n';
    });

    return output;
  }

  private convertToST(projectData: ProjectData): string {
    // Convert project data to Structured Text format
    let output = `PROGRAM ${projectData.name.replace(/\s+/g, '_')}\n`;
    output += `(*\n  Author: ${projectData.settings.author}\n`;
    output += `  Description: ${projectData.settings.description}\n*)\n\n`;
    output += 'VAR\n';
    
    // Collect all variables
    const variables = new Set<string>();
    projectData.rungs.forEach(rung => {
      rung.components.forEach(component => {
        if (component.variables?.address) {
          variables.add(component.variables.address);
        }
      });
    });

    // Declare variables
    variables.forEach(variable => {
      output += `  ${variable} : BOOL;\n`;
    });
    
    output += 'END_VAR\n\n';

    // Convert ladder logic to ST
    projectData.rungs.forEach((rung, index) => {
      output += `(* Rung ${index + 1} *)\n`;
      // Convert rung components to ST logic
      const stLogic = this.convertRungToST(rung);
      output += stLogic + '\n\n';
    });

    output += 'END_PROGRAM\n';
    return output;
  }

  private convertRungToST(rung: any): string {
    // Convert a single rung to ST format
    let output = '';
    let conditions: string[] = [];
    let actions: string[] = [];

    rung.components.forEach((component: any) => {
      if (component.type.includes('CONTACT')) {
        const varName = component.variables?.address || 'UnknownVar';
        conditions.push(component.type === 'CONTACT_NO' ? varName : `NOT(${varName})`);
      } else if (component.type === 'COIL') {
        const varName = component.variables?.address || 'UnknownVar';
        actions.push(varName);
      }
    });

    if (conditions.length > 0) {
      output += `IF ${conditions.join(' AND ')} THEN\n`;
      actions.forEach(action => {
        output += `  ${action} := TRUE;\n`;
      });
      output += 'END_IF;';
    }

    return output;
  }
}

export const fileService = new FileService();