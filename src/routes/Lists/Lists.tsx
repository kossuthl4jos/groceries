import React, { Fragment, useEffect, useState } from 'react';
import { List } from '../../types';
import { getLists, addList, deleteList, updateList } from '../../gateway';
import { ListManager, Items } from './components';

export const Lists = () => {
  const [lists, setLists] = useState<Array<List>>([]);
  const [selectedListId, setSelectedListId] = useState<string>();

  const refreshLists = async () => {
    const newLists = await getLists();

    if (newLists != null) {
      setLists(newLists);
    }
  };

  useEffect(() => {
    if (lists != null && lists.length > 0 && selectedListId == null) {
      setSelectedListId(lists[0]._id);
    }
  }, [lists]);

  useEffect(() => {
    refreshLists();
  }, []);

  const items = lists.length > 0 ? lists?.find((item) => item._id === selectedListId)?.items : [];

  const handleAddList = async (list: List) => {
    await addList(list);
    await refreshLists();
  };

  const handleDeleteList = async (listId: string) => {
    //deleting last list is not OK
    await deleteList(listId);
    await refreshLists();
    if (lists != null && lists.length > 0) {
      setSelectedListId(lists[0]._id);
    } else {
      setSelectedListId(undefined);
    }
  };

  const handleUpdateList = async (list: List) => {
    await updateList(list);
    await refreshLists();
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
