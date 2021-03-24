import React, { Fragment, useState } from 'react';

import { CompletedItems } from './CompletedItems';

import { Collapse } from 'react-bootstrap';

import { Item } from '../types';
import { CompleteItemModal } from './CompleteItemModal';

export const Items = ({
  items,
  deleteItem,
  completeItem,
}: {
  items: Array<Item>;
  deleteItem: (itemId: string) => void;
  completeItem: (item: Item) => void;
}) => {
  const [showCompletedItems, setShowCompletedItems] = useState(true);
  const [completingItem, setCompletingItem] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const stopCompletingItem = () => {
    setCompletingItem(false);
    setSelectedItemId('');
  };

  const handleOnClickSave = (completedBy: string, price: string) => {
    const completedItem = {
      itemId: selectedItemId,
      name: getSelectedItem().name,
      completed: true,
      completedBy,
      price: Number(price),
    };
    completeItem(completedItem);
    stopCompletingItem();
  };

  const handleOnClickDelete = () => {
    deleteItem(selectedItemId);
    setCompletingItem(false);
  };

  const startCompletingItem = (itemId: string) => {
    setCompletingItem(true);
    setSelectedItemId(itemId);
  };

  const hasSomeCompleted = () => {
    return items.some((item: Item) => item.completed);
  };

  const hasAllCompleted = () => {
    return items.every((item: Item) => item.completed);
  };

  const toogleCompletedItems = () => {
    setShowCompletedItems(!showCompletedItems);
  };

  const getSelectedItem = (): Item => {
    return items.find((item: Item) => item.itemId === selectedItemId)!;
  };

  const getItemPlaceholder = () => {
    return (
      <div className="itemPlaceholder">
        {items.length === 0 ? "Let's get started, add a new item" : 'Good job, you are all set'}
      </div>
    );
  };

  return (
    <div className="main-component">
      {hasAllCompleted()
        ? getItemPlaceholder()
        : items.map(
            (item: Item) =>
              !item.completed && (
                <div key={item.itemId}>
                  <div className="item">
                    {item.name}
                    <div
                      onClick={() => startCompletingItem(item.itemId)}
                      className="to-complete-check-box">
                      <i className="fas fa-check fa-xs"></i>
                    </div>
                  </div>
                </div>
              ),
          )}
      {hasSomeCompleted() && (
        <Fragment>
          <div className="formGroup">
            <div className="completed-header input-group" onClick={toogleCompletedItems}>
              completed
              <span className={showCompletedItems ? 'active arrow' : 'arrow'}>
                <span />
                <span />
              </span>
            </div>
          </div>
          <Collapse in={showCompletedItems}>
            <div>
              <CompletedItems
                completedItems={items.filter((item: Item) => item.completed === true)}
              />
            </div>
          </Collapse>
        </Fragment>
      )}

      <CompleteItemModal
        completingItem={completingItem}
        stopCompletingItem={stopCompletingItem}
        item={items.find((item: Item) => item.itemId === selectedItemId)!}
        handleOnClickSave={handleOnClickSave}
        handleOnClickDelete={handleOnClickDelete}
      />
    </div>
  );
};
