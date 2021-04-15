import React, { useEffect, useState } from 'react';
import { Item, List } from '../../types';
import { getLists } from '../../gateway';

export const Statistics = () => {
  const [lists, setLists] = useState<Array<List>>([]);

  const refreshLists = async () => {
    const newLists = await getLists();

    if (newLists != null) {
      setLists(newLists);
    }
  };

  useEffect(() => {
    refreshLists();
  }, []);

  const getTotalAmountSpent = () => {
    let totalAmountSpent = 0;
    const items = lists?.map((list: List) => list.items) ?? [];

    for (let i = 0; i < items.length; i++) {
      const completedItems = items[i].filter((item: Item) => item.completed);

      if (completedItems.length > 0) {
        for (let i = 0; i < completedItems.length; i++) {
          if (!isNaN(completedItems[i].price!)) {
            totalAmountSpent += completedItems[i].price!;
          }
        }
      }
    }

    return totalAmountSpent;
  };

  return (
    <div className="main-component">Total money spent on Groceries: {getTotalAmountSpent()}</div>
  );
};

export default Statistics;
