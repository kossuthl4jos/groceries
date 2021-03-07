import React, { Fragment, useState } from 'react';
import { bolognese, sandwich } from '../gateway/fake-gateway';
import { Header, Navbar, ListManager, Items } from './';

export const Lists = () => {
  const [lists, setLists] = useState([...sandwich, ...bolognese]);
  const [selectedListId, setSelectedListId] = useState('1');

  const addList = (list: any) => {
    const newLists = [...lists, list];
    setLists(newLists);
    setSelectedListId(list.id);
  };

  const addItem = (item: any) => {
    const newLists = [...lists];
    if (selectedListId != null) {
      newLists.find((list) => list.id === selectedListId)!.items.push(item);
      setLists(newLists);
    }
  };

  const completeItem = (completedItem: any) => {
    const newLists = [...lists];
    Object.assign(
      newLists
        .find((list) => list.id === selectedListId)!
        .items.find((item) => item.itemId === completedItem.itemId),
      completedItem,
    );

    setLists(newLists);
  };

  const deleteItem = (itemId: string) => {
    const newLists = [...lists];
    const itemIndexToDelete = newLists
      .find((list) => list.id === selectedListId)!
      .items.findIndex((item) => item.itemId === itemId);

    if (itemIndexToDelete != null && selectedListId != null) {
      newLists.find((list) => list.id === selectedListId)!.items.splice(itemIndexToDelete, 1);
      setLists(newLists);
    }
  };

  const getSelectedList = () => {
    return lists.find((item) => item.id === selectedListId);
  };

  const updateSelectedList = (selectedListId: string) => {
    setSelectedListId(selectedListId);
  };

  return (
    <Fragment>
      <Header />
      <ListManager
        addList={addList}
        addItem={addItem}
        selectedListId={selectedListId}
        updateSelectedList={updateSelectedList}
        lists={lists}
      />
      <Items deleteItem={deleteItem} completeItem={completeItem} items={getSelectedList()?.items} />
      <Navbar />
    </Fragment>
  );
};
