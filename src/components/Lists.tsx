import React, { Fragment, useEffect, useState } from 'react';
import { List } from '../types';
import { ListManager, Items } from './';
import { getLists, addList, deleteList, updateList } from '../gateway/';

export const Lists = () => {
  const [lists, setLists] = useState(getLists());
  const [selectedListId, setSelectedListId] = useState<string>();

  useEffect(() => {
    if (lists != null && lists.length > 0 && selectedListId == null) {
      setSelectedListId(lists[0].id);
    }
  }, [lists]);

  useEffect(() => {
    const newLists = getLists();
    if (newLists != null && newLists.length > 0 && selectedListId == null) {
      setLists(newLists);
    }
  }, [getLists()]);

  const items = lists?.find((item) => item.id === selectedListId)?.items;

  const handleAddList = (list: List) => {
    addList(list);
    setLists(getLists());
    setSelectedListId(list.id);
  };

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
    setLists(getLists());
    if (lists[0].id != null) {
      setSelectedListId(lists[0].id);
    }
  };

  const handleUpdateList = (list: List) => {
    updateList(list);
    setLists(getLists());
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
          selectedList={lists.find((list) => list.id === selectedListId)}
          updateList={handleUpdateList}
          items={items}
        />
      ) : null}
    </Fragment>
  );
};
