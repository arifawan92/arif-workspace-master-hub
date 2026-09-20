export const AI_Engine = {
  
  // RULE 1: GATEKEEPER - Koi src ke bahar file nahi bana sakta
  validatePath: (path) => {
    if (!path.startsWith('src/subprojects/')) {
      console.error('PEOS RULE VIOLATION: Path must be inside src/subprojects/');
      alert('BLOCKED: Ye PEOS Rules ke khilaf hai');
      return false;
    }
    return true;
  },

  // RULE 2: AUTO COMPLETE
  autoCompleteProject: (projectName, description) => {
    const path = `src/subprojects/${projectName}/`;
    if (!AI_Engine.validatePath(path)) return;

    console.log(`AI is building: ${path}`);
    console.log(`Task: ${description}`);
    
    // Yahan baad me hum actual file write ka code lagayen ge
    alert(`AI Started: ${projectName}\nLocation: ${path}\nStatus: Building...`);
  }
};