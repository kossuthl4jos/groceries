import React, { useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

interface CompletedItemsProps {
  completedItems: any;
}

export const CompletedItems = ({ completedItems }: CompletedItemsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const toogleDetails = () => {
    setShowDetails(!showDetails);
  };

  return completedItems.length !== 0
    ? completedItems.map((item: any) => (
        <div key={item} onClick={toogleDetails}>
          <div className="item" style={{ textDecoration: 'line-through' }}>
            {item.name}
            <div className="completed-check-box">
              <i className="fas fa-check fa-xs" />
            </div>
          </div>
          {showDetails && (
            <ListGroup variant="flush">
              <ListGroup.Item style={{ padding: '0.25rem 1.5rem', fontStyle: 'italic' }}>
                by {item.completedBy}
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '0.25rem 1.5rem', fontWeight: 'bold' }}>
                {item.price} €
              </ListGroup.Item>
            </ListGroup>
          )}
        </div>
      ))
    : null;
};
