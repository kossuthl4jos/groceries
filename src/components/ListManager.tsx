import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import InputGroup from 'react-bootstrap/InputGroup';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { ModalTitle } from 'react-bootstrap';

const uuidv4 = require('uuid/v4');

export const ListManager = ({
  addList,
  addItem,
  selectedListId,
  updateSelectedList,
  lists,
}: {
  addList: (list: any) => void;
  addItem: (item: any) => void;
  selectedListId: string;
  updateSelectedList: (selectedListId: string) => void;
  lists: Array<any>;
}) => {
  const [addingList, setAddingList] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newListName, setnewListName] = useState('');
  const [newItemName, setNewItemName] = useState('');

  const stopAddingList = () => {
    setAddingList(false);
  };

  const stopAddingItem = () => {
    setAddingItem(false);
  };

  const clearStateForItem = () => {
    setNewItemName('');
  };

  const handleOnClickSave = () => {
    const newList = {
      id: uuidv4(),
      name: newListName,
      items: [],
    };
    addList(newList);
    stopAddingList();
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
    setAddingList(true);
  };

  const toogleItemForm = () => {
    setAddingItem(!addingItem);
  };

  const handleNewListName = (e: ChangeEvent) => {
    setnewListName((e.target as HTMLInputElement).value);
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
              {lists.map((list: any) => (
                <option value={list.id} key={list.id}>
                  {list.name}
                </option>
              ))}
              ;
            </Form.Control>
            <InputGroup.Append onClick={startAddingList}>
              <InputGroup.Text>+</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>

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

      <Modal show={addingList} onHide={stopAddingList} centered>
        <ModalHeader closeButton>
          <ModalTitle>New list</ModalTitle>
        </ModalHeader>

        <Modal.Body>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter name"
            onChange={handleNewListName}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={stopAddingList}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnClickSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
