import { useState, useRef, useEffect } from 'react';

function FlowBuilder() {
  const [flowName, setFlowName] = useState('');
  const [components, setComponents] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Component templates
  const componentTemplates = [
    { id: 'trigger', type: 'trigger', title: 'Start Trigger', icon: 'play', description: 'Initiates the payment flow' },
    { id: 'payment', type: 'payment', title: 'Payment', icon: 'dollar', description: 'Send a payment to a recipient' },
    { id: 'split', type: 'split', title: 'Split Payment', icon: 'branch', description: 'Split a payment between multiple recipients' },
    { id: 'condition', type: 'condition', title: 'Condition', icon: 'fork', description: 'Add a conditional branch to your flow' },
    { id: 'delay', type: 'delay', title: 'Delay', icon: 'clock', description: 'Add a time delay before the next action' },
    { id: 'end', type: 'end', title: 'End', icon: 'stop', description: 'Terminate the payment flow' }
  ];

  // Handle drag start from component palette
  const handleDragStart = (e, component) => {
    const componentRect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - componentRect.left;
    const offsetY = e.clientY - componentRect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setActiveComponent({ ...component, id: `${component.type}-${Date.now()}` });
    setIsDragging(true);
  };

  // Handle drag over canvas
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragging || !activeComponent) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;
    
    setActiveComponent({ ...activeComponent, position: { x, y } });
  };

  // Handle drop on canvas
  const handleDrop = (e) => {
    e.preventDefault();
    if (!isDragging || !activeComponent) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;
    
    const newComponent = {
      ...activeComponent,
      position: { x, y }
    };
    
    setComponents([...components, newComponent]);
    setIsDragging(false);
    setActiveComponent(null);
  };

  // Handle component selection within the canvas
  const handleComponentClick = (e, component) => {
    e.stopPropagation();
    setActiveComponent(component);
  };

  // Clear selection when clicking on empty canvas
  const handleCanvasClick = () => {
    setActiveComponent(null);
  };

  // Update component positions during drag
  const handleComponentDrag = (e, component) => {
    e.stopPropagation();
    if (!component) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;
    
    const updatedComponents = components.map(c => 
      c.id === component.id ? { ...c, position: { x, y } } : c
    );
    
    setComponents(updatedComponents);
    setActiveComponent({ ...component, position: { x, y } });
  };

  // Draw connections between components (simplified for demo)
  const drawConnections = () => {
    // This would implement the logic to draw connection lines between components
    // For now, we're keeping it simple without actual connections
    return null;
  };

  // Save the current flow
  const saveFlow = () => {
    if (!flowName) {
      alert('Please enter a name for your payment flow');
      return;
    }
    
    const flow = {
      id: Date.now(),
      name: flowName,
      components,
      created: new Date().toISOString()
    };
    
    // In a real app, this would save to a backend service
    console.log('Saving flow:', flow);
    alert('Payment flow saved successfully!');
  };

  return (
    <div className="flow-builder">
      <div className="builder-header">
        <h1>Payment Flow Builder</h1>
        <div className="flow-controls">
          <input
            type="text"
            className="flow-name-input"
            placeholder="Enter flow name"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
          />
          <button className="save-flow-button" onClick={saveFlow}>Save Flow</button>
          <button className="clear-flow-button" onClick={() => setComponents([])}>Clear</button>
        </div>
      </div>
      
      <div className="builder-content">
        <div className="component-palette">
          <h3>Components</h3>
          <div className="component-list">
            {componentTemplates.map(component => (
              <div
                key={component.id}
                className="component-item"
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
              >
                <div className={`component-icon ${component.type}`}>
                  {getComponentIcon(component.icon)}
                </div>
                <div className="component-info">
                  <h4>{component.title}</h4>
                  <p>{component.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className="flow-canvas"
          ref={canvasRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleCanvasClick}
        >
          {components.map(component => (
            <div
              key={component.id}
              className={`canvas-component ${component.type} ${activeComponent && activeComponent.id === component.id ? 'selected' : ''}`}
              style={{
                left: `${component.position.x}px`,
                top: `${component.position.y}px`
              }}
              onClick={(e) => handleComponentClick(e, component)}
              onMouseDown={(e) => {
                const componentRect = e.target.getBoundingClientRect();
                setDragOffset({
                  x: e.clientX - componentRect.left,
                  y: e.clientY - componentRect.top
                });
                setIsDragging(true);
              }}
              onMouseMove={(e) => {
                if (isDragging && activeComponent && activeComponent.id === component.id) {
                  handleComponentDrag(e, component);
                }
              }}
              onMouseUp={() => setIsDragging(false)}
            >
              <div className="component-header">
                <div className={`component-icon ${component.type}`}>
                  {getComponentIcon(component.icon)}
                </div>
                <h4>{component.title}</h4>
              </div>
            </div>
          ))}
          
          {drawConnections()}
        </div>
        
        <div className="properties-panel">
          <h3>Properties</h3>
          {activeComponent ? (
            <div className="property-form">
              <h4>{activeComponent.title}</h4>
              
              <div className="property-group">
                <label>Component Type</label>
                <div className="property-value">{activeComponent.type}</div>
              </div>
              
              {activeComponent.type === 'payment' && (
                <>
                  <div className="property-group">
                    <label>Recipient Address</label>
                    <input type="text" placeholder="Enter SUI address" />
                  </div>
                  <div className="property-group">
                    <label>Amount (SUI)</label>
                    <input type="number" min="0" step="0.01" placeholder="0.00" />
                  </div>
                </>
              )}
              
              {activeComponent.type === 'split' && (
                <>
                  <div className="property-group">
                    <label>Total Amount (SUI)</label>
                    <input type="number" min="0" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="property-group">
                    <label>Recipients</label>
                    <div className="recipients-list">
                      <div className="recipient-item">
                        <input type="text" placeholder="Address" className="recipient-address" />
                        <input type="number" placeholder="%" className="recipient-percentage" />
                      </div>
                      <button className="add-recipient">+ Add Recipient</button>
                    </div>
                  </div>
                </>
              )}
              
              {activeComponent.type === 'condition' && (
                <div className="property-group">
                  <label>Condition Type</label>
                  <select>
                    <option>Time-based</option>
                    <option>Amount threshold</option>
                    <option>External event</option>
                  </select>
                </div>
              )}
              
              {activeComponent.type === 'delay' && (
                <div className="property-group">
                  <label>Delay Duration</label>
                  <div className="time-inputs">
                    <input type="number" min="0" placeholder="0" className="time-input" />
                    <select>
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a component to view properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to render component icons
function getComponentIcon(icon) {
  switch(icon) {
    case 'play':
      return '▶';
    case 'dollar':
      return '$';
    case 'branch':
      return '⑂';
    case 'fork':
      return '⋔';
    case 'clock':
      return '⏱';
    case 'stop':
      return '■';
    default:
      return '•';
  }
}

export default FlowBuilder;