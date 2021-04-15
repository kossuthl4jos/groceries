import React, { Fragment, useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { Item } from '~/types';

interface CompletedItemsProps {
  completedItems: Array<Item>;
}

export const CompletedItems = ({ completedItems }: CompletedItemsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const toogleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Fragment>
      {completedItems.length !== 0
        ? completedItems.map((item: Item) => (
            <div key={item.itemId} onClick={toogleDetails}>
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
        : null}
    </Fragment>
  );
};
