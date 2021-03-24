import React, { Fragment, useEffect, useState } from 'react';
import { Item, List } from '../types';
import { useFetchLists, useSaveLists } from '../utils';
import { ListManager, Items } from './';

export const Lists = () => {
  const { lists } = useFetchLists();
  const { saveLists } = useSaveLists();
  const [selectedListId, setSelectedListId] = useState(lists[0]?.id);

  useEffect(() => {
    if (lists != null && lists.length > 0) {
      setSelectedListId(lists[0].id);
    }
  }, [lists]);

  const items = lists?.find((item) => item.id === selectedListId)?.items;

  const addList = (list: List) => {
    const newLists: Array<List> = [...(lists ?? []), list];
    saveLists(newLists);
    setSelectedListId(list.id);
  };

  const addItem = (item: Item) => {
    if (selectedListId != null) {
      const newLists: Array<List> = [...(lists ?? [])];
      newLists.find((list) => list.id === selectedListId)!.items.push(item);
      saveLists(newLists);
    }
  };

  const completeItem = (completedItem: Item) => {
    const newLists: Array<List> = [...(lists ?? [])];
    Object.assign(
      newLists
        .find((list) => list.id === selectedListId)!
        .items.find((item) => item.itemId === completedItem.itemId),
      completedItem,
    );

    saveLists(newLists);
  };

  const deleteItem = (itemId: string) => {
    const newLists: Array<List> = [...(lists ?? [])];
    const itemIndexToDelete = newLists
      .find((list) => list.id === selectedListId)!
      .items.findIndex((item) => item.itemId === itemId);

    if (itemIndexToDelete != null && selectedListId != null) {
      newLists.find((list) => list.id === selectedListId)!.items.splice(itemIndexToDelete, 1);
      saveLists(newLists);
    }
  };

  return (
    <Fragment>
      <ListManager
        lists={lists}
        addList={addList}
        addItem={addItem}
        selectedListId={selectedListId}
        updateSelectedList={(selectedListId: string) => setSelectedListId(selectedListId)}
      />
      {items != null && items.length > 0 ? (
        <Items deleteItem={deleteItem} completeItem={completeItem} items={items} />
      ) : null}
    </Fragment>
  );
};
