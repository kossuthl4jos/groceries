import React, { Fragment, useState } from 'react';
import { List } from '~/types';
import { useFetchLists, useSaveLists } from '../utils';
import { ListManager, Items } from './';

export const Lists = () => {
  const { lists } = useFetchLists();
  const { saveLists } = useSaveLists();
  const [selectedListId, setSelectedListId] = useState('1');

  const addList = (list: List) => {
    const newLists: Array<List> = [...(lists ?? []), list];
    saveLists(newLists);
    setSelectedListId(list.id);
  };

  const addItem = (item: any) => {
    if (selectedListId != null) {
      const newLists: Array<List> = [...(lists ?? [])];
      newLists.find((list) => list.id === selectedListId)!.items.push(item);
      saveLists(newLists);
    }
  };

  const completeItem = (completedItem: any) => {
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

  const getSelectedList = () => {
    return lists?.find((item) => item.id === selectedListId);
  };

  const updateSelectedList = (selectedListId: string) => {
    setSelectedListId(selectedListId);
  };

  return (
    <Fragment>
      <ListManager
        lists={lists}
        addList={addList}
        addItem={addItem}
        selectedListId={selectedListId}
        updateSelectedList={updateSelectedList}
      />
      <Items deleteItem={deleteItem} completeItem={completeItem} items={getSelectedList()?.items} />
    </Fragment>
  );
};
