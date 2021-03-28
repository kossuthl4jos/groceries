import React, { Fragment, useEffect, useState } from 'react';
import { List } from '../types';
import { ListManager, Items } from './';
import { Gateway } from '../gateway/';

export const Lists = () => {
  const { gatewayService } = new Gateway();
  const [lists, setLists] = useState(gatewayService.getLists());
  const [selectedListId, setSelectedListId] = useState<string>();

  useEffect(() => {
    if (lists != null && lists.length > 0 && selectedListId == null) {
      setSelectedListId(lists[0].id);
    }
  }, [lists]);

  useEffect(() => {
    const newLists = gatewayService.getLists();
    if (newLists != null && newLists.length > 0 && selectedListId == null) {
      setLists(newLists);
    }
  }, [gatewayService.getLists()]);

  const items = lists?.find((item) => item.id === selectedListId)?.items;

  const addList = (list: List) => {
    gatewayService.addList(list);
    setLists(gatewayService.getLists());
    setSelectedListId(list.id);
  };

  const deleteList = (listId: string) => {
    gatewayService.deleteList(listId);
    setLists(gatewayService.getLists());
    if (lists[0].id != null) {
      setSelectedListId(lists[0].id);
    }
  };

  const updateList = (list: List) => {
    gatewayService.updateList(list);
    setLists(gatewayService.getLists());
  };

  return (
    <Fragment>
      <ListManager
        lists={lists}
        addList={addList}
        deleteList={deleteList}
        updateList={updateList}
        selectedListId={selectedListId}
        updateSelectedListId={(selectedListId: string) => setSelectedListId(selectedListId)}
      />
      {items != null && items.length > 0 ? (
        <Items
          selectedList={lists.find((list) => list.id === selectedListId)}
          updateList={updateList}
          items={items}
        />
      ) : null}
    </Fragment>
  );
};
