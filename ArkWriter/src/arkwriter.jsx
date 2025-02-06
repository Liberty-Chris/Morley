import React, { useState } from 'react';

const ArkWriter = () => {
  const [projectData, setProjectData] = useState({
    name: 'Untitled Project',
    elements: [], // Placeholder for Ladder Logic elements
  });

  // Save Project Function
  const saveProject = async () => {
    try {
      const options = {
        types: [
          {
            description: 'Ladder Logic Project Files',
            accept: { 'application/json': ['.llproj', '.json'] },
          },
        ],
      };
      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(projectData, null, 2));
      await writable.close();
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  // Open Project Function
  const openProject = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Ladder Logic Project Files',
            accept: { 'application/json': ['.llproj', '.json'] },
          },
        ],
      });
      const file = await fileHandle.getFile();
      const text = await file.text();
      const data = JSON.parse(text);
      setProjectData(data);
      alert(`Project "${data.name}" loaded successfully!`);
    } catch (error) {
      console.error('Error opening project:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-200 w-1/4 p-4">
        <h1 className="text-xl font-bold mb-4">morley</h1>
        <button
          onClick={() => setProjectData({ name: 'New Project', elements: [] })}
          className="block w-full bg-blue-500 text-white py-2 px-4 rounded mb-2"
        >
          New Project
        </button>
        <button
          onClick={openProject}
          className="block w-full bg-green-500 text-white py-2 px-4 rounded mb-2"
        >
          Open Project
        </button>
        <button
          onClick={saveProject}
          className="block w-full bg-yellow-500 text-white py-2 px-4 rounded mb-2"
        >
          Save Project
        </button>
        <button
          className="block w-full bg-red-500 text-white py-2 px-4 rounded"
        >
          Compile
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white p-4">
        <h2 className="text-lg font-bold mb-2">Ladder Logic Canvas</h2>
        <div className="border border-gray-300 h-full flex items-center justify-center">
          <span className="text-gray-500">Ladder Logic Canvas</span>
        </div>
      </div>
    </div>
  );
};

export default ArkWriter;
