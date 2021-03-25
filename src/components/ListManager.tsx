import React, { ChangeEvent, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import InputGroup from 'react-bootstrap/InputGroup';
import { Item, List } from '../types';
import { AddListModal } from './';

const uuidv4 = require('uuid/v4');

export const ListManager = ({
  addList,
  addItem,
  selectedListId,
  updateSelectedList,
  lists,
}: {
  lists?: Array<List>;
  addList: (list: List) => void;
  addItem: (item: Item) => void;
  selectedListId?: string;
  updateSelectedList: (selectedListId: string) => void;
}) => {
  const [addListModalVisible, setAddListModalVisible] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const stopAddingItem = () => {
    setAddingItem(false);
  };

  const clearStateForItem = () => {
    setNewItemName('');
  };

  const handleOnClickSave = (newListName: string) => {
    const newList = {
      id: uuidv4(),
      name: newListName,
      items: [],
    };
    addList(newList);
    setAddListModalVisible(false);
  };

  const handleOnClickAdd = () => {
    const newItem = {
      itemId: uuidv4(),
      name: newItemName,
      completed: false,
      completedBy: '',
      price: undefined,
    };
    addItem(newItem);
    stopAddingItem();
    clearStateForItem();
  };

  const startAddingList = () => {
    setAddListModalVisible(true);
  };

  const toogleItemForm = () => {
    setAddingItem(!addingItem);
  };

  const handleNewItemName = (e: ChangeEvent) => {
    setNewItemName((e.target as HTMLInputElement).value);
  };

  return (
    <div className="main-component">
      <Form>
        <Form.Group controlId="selectList">
          <InputGroup>
            <Form.Control
              onChange={(e: ChangeEvent) =>
                updateSelectedList((e.target as HTMLInputElement).value)
              }
              value={selectedListId}
              as="select">
              {lists != null && lists.length > 0 ? (
                lists.map((list: List) => (
                  <option value={list.id} key={list.id}>
                    {list.name}
                  </option>
                ))
              ) : (
                <option>Please create a list first</option>
              )}
              ;
            </Form.Control>
            <InputGroup.Append onClick={startAddingList}>
              <InputGroup.Text>+</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>

      {lists != null && lists.length > 0 ? (
        <Fragment>
          <div className="new-item-btn" onClick={toogleItemForm}>
            Add new item
          </div>
          <Collapse in={addingItem}>
            <Form>
              <Form.Control
                placeholder="Enter item name"
                value={newItemName}
                onChange={handleNewItemName}
              />
              <Form.Text className="text-muted">
                This item will be added to the selected shopping list.
              </Form.Text>
              <Button variant="primary" onClick={handleOnClickAdd}>
                Add
              </Button>
            </Form>
          </Collapse>
        </Fragment>
      ) : null}

      <AddListModal
        show={addListModalVisible}
        stopAddingList={() => setAddListModalVisible(false)}
        handleOnClickSave={handleOnClickSave}
      />
    </div>
  );
};
