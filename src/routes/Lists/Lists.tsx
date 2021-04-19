import React, { useEffect, useState } from 'react';
import { List } from '../../types';
import { getLists, deleteList, updateList } from '../../gateway';
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

  const handleDeleteList = async (listId: string) => {
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
    <div style={{ maxHeight: 'calc(100vh - 112px)', overflowY: 'auto' }}>
      <ListManager
        lists={lists}
        refreshLists={refreshLists}
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
    </div>
  );
};
