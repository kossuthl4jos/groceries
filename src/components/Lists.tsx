import React, { Fragment, useEffect, useState } from 'react';
import { List } from '../types';
import { ListManager, Items } from './';
import { getLists, addList, deleteList, updateList } from '../gateway/';

export const Lists = () => {
  const [lists, setLists] = useState<Array<List>>([]);
  const [selectedListId, setSelectedListId] = useState<string>();

  useEffect(() => {
    if (lists != null && lists.length > 0 && selectedListId == null) {
      setSelectedListId(lists[0]._id);
    }
  }, [lists]);

  useEffect(() => {
    const fetchData = async () => {
      const newLists = await getLists();

      if (newLists != null && newLists.length > 0 && selectedListId == null) {
        setLists(newLists);
      }
    };

    fetchData();
  }, [getLists()]);

  const items = lists.length > 0 ? lists?.find((item) => item._id === selectedListId)?.items : [];

  const handleAddList = async (list: List) => {
    addList(list);
    setLists(await getLists());
    setSelectedListId(list._id);
  };

  const handleDeleteList = async (listId: string) => {
    deleteList(listId);
    setLists(await getLists());
    if (lists[0]._id != null) {
      setSelectedListId(lists[0]._id);
    }
  };

  const handleUpdateList = async (list: List) => {
    updateList(list);
    setLists(await getLists());
  };

  return (
    <Fragment>
      <ListManager
        lists={lists}
        addList={handleAddList}
        deleteList={handleDeleteList}
        updateList={handleUpdateList}
        selectedListId={selectedListId}
        updateSelectedListId={(selectedListId: string) => setSelectedListId(selectedListId)}
      />
      {items != null && items.length > 0 ? (
        <Items
          selectedList={lists.find((list) => list._id === selectedListId)}
          updateList={handleUpdateList}
          items={items}
        />
      ) : null}
    </Fragment>
  );
};
