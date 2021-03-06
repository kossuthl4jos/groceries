import React from 'react';
import { Items } from './Items';

export const List = ({
  list,
  deleteItem,
  completeItem,
}: {
  list: any;
  deleteItem: (itemId: string) => void;
  completeItem: (item: any) => void;
}) => {
  return (
    <div key={list.id}>
      <Items deleteItem={deleteItem} completeItem={completeItem} items={list.items} />
    </div>
  );
};
