import React, { useState } from 'react';
import './NestedList.css'; // Import the external CSS file

const NestedList = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  // Toggle expand/collapse functionality
  const toggleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Recursive function to render nested elements
  const renderList = (items) => {
    return (
      <ul className="nested-list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <div
              className="item-header"
              onClick={() => toggleExpand(item.id)}
            >
              {/* Folder icons */}
              {item.children && (
                <span className="folder-icon">
                  {expandedItems.includes(item.id) ? '📂' : '📁'}
                </span>
              )}
              {item.name}
            </div>
            {/* Render children if expanded */}
            {expandedItems.includes(item.id) && item.children && (
              <div className="nested-children">
                {renderList(item.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="nested-container">{renderList(data)}</div>;
};

const App = () => {
  const data = [
    {
      id: 1,
      name: 'Applications',
      children: [
        {
          id: 2,
          name: 'adam',
          children: [{ id: 3, name: 'thing1' }, { id: 4, name: 'thing2' }],
        },
        { id: 5, name: 'ghost' },
      ],
    },
    {
      id: 6,
      name: 'Library',
      children: [{ id: 7, name: 'Documents' }, { id: 8, name: 'Movies' }],
    },
    {
      id: 9,
      name: 'Users',
      children: [{ id: 10, name: 'Guest' }, { id: 11, name: 'Shared' }],
    },
  ];

  return (
    <div className="app-container">
      <h2>Nested List Component</h2>
      <NestedList data={data} />
    </div>
  );
};

export default App;
