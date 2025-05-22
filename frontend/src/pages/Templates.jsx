import { useState } from 'react';

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Template data
  const templates = [
    {
      id: 1,
      name: 'Simple Payment',
      category: 'basic',
      description: 'A straightforward one-time payment to a recipient',
      components: 3,
      popularity: 'High',
      image: '/templates/simple-payment.png'
    },
    {
      id: 2,
      name: 'Equal Split',
      category: 'split',
      description: 'Split a payment equally among multiple recipients',
      components: 5,
      popularity: 'High',
      image: '/templates/equal-split.png'
    },
    {
      id: 3,
      name: 'Percentage Split',
      category: 'split',
      description: 'Split a payment using custom percentages',
      components: 6,
      popularity: 'Medium',
      image: '/templates/percentage-split.png'
    },
    {
      id: 4,
      name: 'Monthly Subscription',
      category: 'recurring',
      description: 'Set up a recurring monthly payment',
      components: 4,
      popularity: 'High',
      image: '/templates/monthly-subscription.png'
    },
    {
      id: 5,
      name: 'Escrow Payment',
      category: 'escrow',
      description: 'Secure payment held until conditions are met',
      components: 7,
      popularity: 'Medium',
      image: '/templates/escrow-payment.png'
    },
    {
      id: 6,
      name: 'Milestone Payment',
      category: 'conditional',
      description: 'Payments triggered by completion of milestones',
      components: 8,
      popularity: 'Low',
      image: '/templates/milestone-payment.png'
    }
  ];
  
  // Filter options
  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'basic', label: 'Basic' },
    { value: 'split', label: 'Split Payments' },
    { value: 'recurring', label: 'Recurring' },
    { value: 'escrow', label: 'Escrow' },
    { value: 'conditional', label: 'Conditional' }
  ];
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter templates based on selected category
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  // Handle template selection
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  // Use selected template
  const useTemplate = () => {
    if (!selectedTemplate) return;
    
    // In a real app, this would redirect to the flow builder with the template loaded
    console.log('Using template:', selectedTemplate);
    alert(`Template "${selectedTemplate.name}" will be loaded in the flow builder.`);
    // Redirect logic would go here
  };

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>Payment Flow Templates</h1>
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.value}
              className={`filter-button ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate && selectedTemplate.id === template.id ? 'selected' : ''}`}
            onClick={() => handleTemplateClick(template)}
          >
            <div className="template-image">
              {/* This would display the template diagram image */}
              <div className="placeholder-image">
                {template.name.charAt(0)}
              </div>
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <div className="template-meta">
                <span className="components-count">{template.components} components</span>
                <span className="popularity">{template.popularity} usage</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="template-details">
          <div className="details-header">
            <h2>{selectedTemplate.name}</h2>
            <button className="use-template-button" onClick={useTemplate}>
              Use This Template
            </button>
          </div>
          
          <div className="details-body">
            <div className="template-preview">
              {/* This would show a larger preview of the template */}
              <div className="large-placeholder">
                Template Preview: {selectedTemplate.name}
              </div>
            </div>
            
            <div className="template-description">
              <h3>Description</h3>
              <p>{selectedTemplate.description}</p>
              
              <h3>Components</h3>
              <ul className="components-list">
                <li>Start Trigger</li>
                {selectedTemplate.category === 'split' && (
                  <>
                    <li>Split Component (distributes funds)</li>
                    <li>Multiple Payment Outputs</li>
                  </>
                )}
                {selectedTemplate.category === 'recurring' && (
                  <>
                    <li>Schedule Component (sets timing)</li>
                    <li>Payment Component</li>
                  </>
                )}
                {selectedTemplate.category === 'escrow' && (
                  <>
                    <li>Escrow Lock Component</li>
                    <li>Condition Checker</li>
                    <li>Release Payment Component</li>
                  </>
                )}
                <li>End Component</li>
              </ul>
              
              <h3>Common Use Cases</h3>
              <ul className="use-cases">
                {selectedTemplate.category === 'basic' && (
                  <>
                    <li>Simple vendor payments</li>
                    <li>Friend reimbursements</li>
                  </>
                )}
                {selectedTemplate.category === 'split' && (
                  <>
                    <li>Team expense sharing</li>
                    <li>Multi-participant bill splitting</li>
                    <li>Profit distribution</li>
                  </>
                )}
                {selectedTemplate.category === 'recurring' && (
                  <>
                    <li>Service subscriptions</li>
                    <li>Membership fees</li>
                    <li>Rent or lease payments</li>
                  </>
                )}
                {selectedTemplate.category === 'escrow' && (
                  <>
                    <li>Marketplace transactions</li>
                    <li>Freelance milestone payments</li>
                    <li>Secure B2B transactions</li>
                  </>
                )}
                {selectedTemplate.category === 'conditional' && (
                  <>
                    <li>Project-based payments</li>
                    <li>Goal-based rewards</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;