import React, { useState } from "react";
import ArkWriter from "./arkwriter.jsx";

export default function App() {
  const [elements, setElements] = useState([]); // Store ladder logic elements
  const [connections, setConnections] = useState([]); // Store connections between elements
  const [draggingConnection, setDraggingConnection] = useState(null); // Temporary connection state
  const gridSize = 20; // Grid snapping size

  const handleDrop = (event) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData("type");
    const rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Snap to grid
    x = Math.round(x / gridSize) * gridSize;
    y = Math.round(y / gridSize) * gridSize;

    setElements([...elements, { id: elements.length, type: elementType, x, y }]);
  };

  const handleDragStart = (event, type) => {
    event.dataTransfer.setData("type", type);
  };

  const handleElementClick = (index) => {
    const updatedElements = elements.filter((_, i) => i !== index);
    const updatedConnections = connections.filter(
      (conn) => conn.from !== index && conn.to !== index
    );
    setElements(updatedElements);
    setConnections(updatedConnections);
  };

  const handleConnectionStart = (elementId) => {
    setDraggingConnection({ from: elementId, to: null });
  };

  const handleConnectionEnd = (elementId) => {
    if (draggingConnection) {
      setConnections([
        ...connections,
        { from: draggingConnection.from, to: elementId },
      ]);
      setDraggingConnection(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <img
          src="https://raw.githubusercontent.com/Liberty-Chris/morley/refs/heads/main/images/morley_white_soft_transparent.png"
          alt="Morley Logo"
          className="header-logo"
        />
        <div className="menu">
          <span className="menu-button">New Project</span>
          <span className="menu-button">Open Project</span>
          <span className="menu-button">Save Project</span>
          <span className="menu-button">Compile</span>
        </div>
        <h1 className="title">ArkWriter</h1>
      </header>
      <div className="content">
        <aside className="sidebar">
          <h2 className="sidebar-title">Tool Pallet</h2>
          <div className="tool-grid">
            <div
              className="tool-item contact-no"
              draggable
              onDragStart={(e) => handleDragStart(e, "contact-no")}
            >
              NO Contact
            </div>
            <div
              className="tool-item contact-nc"
              draggable
              onDragStart={(e) => handleDragStart(e, "contact-nc")}
            >
              NC Contact
            </div>
            <div
              className="tool-item rung"
              draggable
              onDragStart={(e) => handleDragStart(e, "rung")}
            >
              Rung
            </div>
            <div
              className="tool-item coil"
              draggable
              onDragStart={(e) => handleDragStart(e, "coil")}
            >
              Coil
            </div>
            <div
              className="tool-item timer"
              draggable
              onDragStart={(e) => handleDragStart(e, "timer")}
            >
              Timer
            </div>
            <div
              className="tool-item counter"
              draggable
              onDragStart={(e) => handleDragStart(e, "counter")}
            >
              Counter
            </div>
            <div
              className="tool-item output"
              draggable
              onDragStart={(e) => handleDragStart(e, "output")}
            >
              Output
            </div>
            <div
              className="tool-item logic-and"
              draggable
              onDragStart={(e) => handleDragStart(e, "logic-and")}
            >
              AND Gate
            </div>
            <div
              className="tool-item logic-or"
              draggable
              onDragStart={(e) => handleDragStart(e, "logic-or")}
            >
              OR Gate
            </div>
            <div
              className="tool-item logic-not"
              draggable
              onDragStart={(e) => handleDragStart(e, "logic-not")}
            >
              NOT Gate
            </div>
            <div
              className="tool-item logic-xor"
              draggable
              onDragStart={(e) => handleDragStart(e, "logic-xor")}
            >
              XOR Gate
            </div>
            <div
              className="tool-item memory-bit"
              draggable
              onDragStart={(e) => handleDragStart(e, "memory-bit")}
            >
              Memory Bit
            </div>
            <div
              className="tool-item analog-input"
              draggable
              onDragStart={(e) => handleDragStart(e, "analog-input")}
            >
              Analog Input
            </div>
            <div
              className="tool-item analog-output"
              draggable
              onDragStart={(e) => handleDragStart(e, "analog-output")}
            >
              Analog Output
            </div>
            <div
              className="tool-item arithmetic-add"
              draggable
              onDragStart={(e) => handleDragStart(e, "arithmetic-add")}
            >
              Add
            </div>
            <div
              className="tool-item arithmetic-subtract"
              draggable
              onDragStart={(e) => handleDragStart(e, "arithmetic-subtract")}
            >
              Subtract
            </div>
            <div
              className="tool-item arithmetic-multiply"
              draggable
              onDragStart={(e) => handleDragStart(e, "arithmetic-multiply")}
            >
              Multiply
            </div>
            <div
              className="tool-item arithmetic-divide"
              draggable
              onDragStart={(e) => handleDragStart(e, "arithmetic-divide")}
            >
              Divide
            </div>
            <div
              className="tool-item label"
              draggable
              onDragStart={(e) => handleDragStart(e, "label")}
            >
              Label
            </div>
            <div
              className="tool-item comment"
              draggable
              onDragStart={(e) => handleDragStart(e, "comment")}
            >
              Comment
            </div>
          </div>
        </aside>
        <main className="main">
          <div
            className="canvas"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {connections.map((conn, index) => {
              const fromElement = elements.find((el) => el.id === conn.from);
              const toElement = elements.find((el) => el.id === conn.to);

              if (fromElement && toElement) {
                return (
                  <svg
                    key={index}
                    className="connection-line"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <line
                      x1={fromElement.x + 50}
                      y1={fromElement.y + 20}
                      x2={toElement.x + 50}
                      y2={toElement.y + 20}
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                );
              }
              return null;
            })}
            {elements.map((element, index) => (
              <div
                key={index}
                className={`element ${element.type}`}
                style={{
                  position: "absolute",
                  left: element.x,
                  top: element.y,
                }}
                onMouseDown={() => handleConnectionStart(element.id)}
                onMouseUp={() => handleConnectionEnd(element.id)}
              >
                {element.type
                  .replace("contact-no", "NO Contact")
                  .replace("contact-nc", "NC Contact")
                  .replace("rung", "Rung")
                  .replace("logic-and", "AND Gate")
                  .replace("logic-or", "OR Gate")
                  .replace("logic-not", "NOT Gate")
                  .replace("logic-xor", "XOR Gate")
                  .replace("memory-bit", "Memory Bit")
                  .replace("analog-input", "Analog Input")
                  .replace("analog-output", "Analog Output")
                  .replace("arithmetic-add", "Add")
                  .replace("arithmetic-subtract", "Subtract")
                  .replace("arithmetic-multiply", "Multiply")
                  .replace("arithmetic-divide", "Divide")
                  .replace("label", "Label")
                  .replace("comment", "Comment")}
              </div>
            ))}
          </div>
        </main>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

        body {
          margin: 0;
          font-family: 'Ubuntu', sans-serif;
          background-color: #f5f5f5;
        }

        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #000;
          color: #fff;
          padding: 10px 20px;
        }

        .header-logo {
          height: 40px;
        }

        .menu {
          display: flex;
          gap: 20px;
        }

        .menu-button {
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 500;
        }

        .content {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 220px;
          background-color: #e0e0e0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          border-right: 1px solid #ccc;
        }

        .sidebar-title {
          font-size: 1.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 15px;
        }

        .tool-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .tool-item {
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: center;
          cursor: grab;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .contact-no {
          background-color: #007bff;
          color: #fff;
        }

        .contact-nc {
          background-color: #ff5733;
          color: #fff;
        }

        .rung {
          background-color: #9b59b6;
          color: #fff;
        }

        .coil {
          background-color: #28a745;
          color: #fff;
        }

        .timer {
          background-color: #ffc107;
          color: #000;
        }

        .counter {
          background-color: #6f42c1;
          color: #fff;
        }

        .output {
          background-color: #17a2b8;
          color: #fff;
        }

        .logic-and {
          background-color: #8e44ad;
          color: #fff;
        }

        .logic-or {
          background-color: #e74c3c;
          color: #fff;
        }

        .logic-not {
          background-color: #f39c12;
          color: #fff;
        }

        .logic-xor {
          background-color: #3498db;
          color: #fff;
        }

        .memory-bit {
          background-color: #34495e;
          color: #fff;
        }

        .analog-input {
          background-color: #27ae60;
          color: #fff;
        }

        .analog-output {
          background-color: #2ecc71;
          color: #fff;
        }

        .arithmetic-add {
          background-color: #e67e22;
          color: #fff;
        }

        .arithmetic-subtract {
          background-color: #d35400;
          color: #fff;
        }

        .arithmetic-multiply {
          background-color: #c0392b;
          color: #fff;
        }

        .arithmetic-divide {
          background-color: #16a085;
          color: #fff;
        }

        .label {
          background-color: #95a5a6;
          color: #fff;
        }

        .comment {
          background-color: #7f8c8d;
          color: #fff;
        }

        .main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .canvas {
          width: 100%;
          height: 100%;
          border: 2px solid #ccc;
          position: relative;
          background-color: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-image: linear-gradient(45deg, #f9f9f9 25%, transparent 25%, transparent 50%, #f9f9f9 50%, #f9f9f9 75%, transparent 75%, transparent);
          background-size: 20px 20px;
        }

        .connection-line {
          pointer-events: none;
        }

        .element {
          padding: 5px 10px;
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
        }

        .element.contact-no {
          background-color: #007bff;
          color: #fff;
        }

        .element.contact-nc {
          background-color: #ff5733;
          color: #fff;
        }

        .element.rung {
          background-color: #9b59b6;
          color: #fff;
        }

        .element.coil {
          background-color: #28a745;
          color: #fff;
        }

        .element.timer {
          background-color: #ffc107;
          color: #000;
        }

        .element.counter {
          background-color: #6f42c1;
          color: #fff;
        }

        .element.output {
          background-color: #17a2b8;
          color: #fff;
        }

        .element.logic-and {
          background-color: #8e44ad;
          color: #fff;
        }

        .element.logic-or {
          background-color: #e74c3c;
          color: #fff;
        }

        .element.logic-not {
          background-color: #f39c12;
          color: #fff;
        }

        .element.logic-xor {
          background-color: #3498db;
          color: #fff;
        }

        .element.memory-bit {
          background-color: #34495e;
          color: #fff;
        }

        .element.analog-input {
          background-color: #27ae60;
          color: #fff;
        }

        .element.analog-output {
          background-color: #2ecc71;
          color: #fff;
        }

        .element.arithmetic-add {
          background-color: #e67e22;
          color: #fff;
        }

        .element.arithmetic-subtract {
          background-color: #d35400;
          color: #fff;
        }

        .element.arithmetic-multiply {
          background-color: #c0392b
.element.arithmetic-divide {
  background-color: #16a085;
  color: #fff;
}

.element.label {
  background-color: #95a5a6;
  color: #fff;
}

.element.comment {
  background-color: #7f8c8d;
  color: #fff;
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.canvas {
  width: 100%;
  height: 100%;
  border: 2px solid #ccc;
  position: relative;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-image: linear-gradient(45deg, #f9f9f9 25%, transparent 25%, transparent 50%, #f9f9f9 50%, #f9f9f9 75%, transparent 75%, transparent);
  background-size: 20px 20px;
}

.connection-line {
  pointer-events: none;
}

.element {
  padding: 5px 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.element.contact-no {
  background-color: #007bff;
  color: #fff;
}

.element.contact-nc {
  background-color: #ff5733;
  color: #fff;
}

.element.rung {
  background-color: #9b59b6;
  color: #fff;
}

.element.coil {
  background-color: #28a745;
  color: #fff;
}

.element.timer {
  background-color: #ffc107;
  color: #000;
}

.element.counter {
  background-color: #6f42c1;
  color: #fff;
}

.element.output {
  background-color: #17a2b8;
  color: #fff;
}

.element.logic-and {
  background-color: #8e44ad;
  color: #fff;
}

.element.logic-or {
  background-color: #e74c3c;
  color: #fff;
}

.element.logic-not {
  background-color: #f39c12;
  color: #fff;
}

.element.logic-xor {
  background-color: #3498db;
  color: #fff;
}

.element.memory-bit {
  background-color: #34495e;
  color: #fff;
}

.element.analog-input {
  background-color: #27ae60;
  color: #fff;
}

.element.analog-output {
  background-color: #2ecc71;
  color: #fff;
}

.element.arithmetic-add {
  background-color: #e67e22;
  color: #fff;
}

.element.arithmetic-subtract {
  background-color: #d35400;
  color: #fff;
}

.element.arithmetic-multiply {
  background-color: #c0392b;
  color: #fff;
}

.element.arithmetic-divide {
  background-color: #16a085;
  color: #fff;
}

.element.label {
  background-color: #95a5a6;
  color: #fff;
}

.element.comment {
  background-color: #7f8c8d;
  color: #fff;
}
`}</style>
    </div>
  );
}