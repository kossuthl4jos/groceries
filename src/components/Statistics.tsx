import React, { useState } from 'react';
import { bolognese, sandwich } from '../gateway/fake-gateway';

export const Statistics = () => {
  const [lists] = useState([...sandwich, ...bolognese]);

  const getTotalAmountSpent = () => {
    let totalAmountSpent = 0;
    const items = getItems();

    for (let i = 0; i < items.length; i++) {
      const completedItems = items[i].filter((item: any) => item.completed);

      if (completedItems.length > 0) {
        for (let i = 0; i < completedItems.length; i++) {
          if (!isNaN(completedItems[i].price)) {
            totalAmountSpent += parseInt(completedItems[i].price);
          }
        }
      }
    }

    return totalAmountSpent;
  };

  const getItems = () => {
    return lists.map((list: any) => list.items);
  };

  return (
    <div className="main-component">Total money spent on Groceries: {getTotalAmountSpent()}</div>
  );
};

export default Statistics;
