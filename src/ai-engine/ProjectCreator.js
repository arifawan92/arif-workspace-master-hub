import fs from 'fs';
import path from 'path';

export function createProjectFolder(name) {
  const projectPath = path.join('src', 'subprojects', name);
  
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
    
    // Auto files bana do
    fs.writeFileSync(path.join(projectPath, 'index.js'), `// ${name} - PEOS Auto Generated\nconsole.log('Hello from ${name}')`);
    fs.writeFileSync(path.join(projectPath, 'README.md'), `# ${name}\n\nPEOS se banaya gaya project`);
    
    return { success: true, path: projectPath };
  }
  return { success: false, message: 'Already exists' };
}
