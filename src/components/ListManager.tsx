import React, { ChangeEvent, Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import InputGroup from 'react-bootstrap/InputGroup';
import { List } from '../types';
import { AddListModal } from './';
import { ButtonGroup } from 'react-bootstrap';
import { DeleteListModal } from './DeleteListModal';

const uuidv4 = require('uuid/v4');

export const ListManager = ({
  addList,
  deleteList,
  updateList,
  selectedListId,
  updateSelectedListId,
  lists,
}: {
  lists?: Array<List>;
  addList: (list: List) => void;
  deleteList: (listId: string) => void;
  updateList: (list: List) => void;
  selectedListId?: string;
  updateSelectedListId: (selectedListId: string) => void;
}) => {
  const [addListModalVisible, setAddListModalVisible] = useState(false);
  const [deleteListModalVisible, setDeleteListModalVisible] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const selectedList = lists?.find((list) => list._id === selectedListId);

  const stopAddingItem = () => {
    setAddingItem(false);
  };

  const clearStateForItem = () => {
    setNewItemName('');
  };

  const handleOnClickSave = (newListName: string) => {
    const newList = {
      _id: uuidv4(),
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

    if (selectedList != null) {
      updateList({
        _id: selectedList._id,
        name: selectedList.name,
        items: [...selectedList.items, newItem],
      });
      stopAddingItem();
      clearStateForItem();
    }
  };

  const toogleItemForm = () => {
    setAddingItem(!addingItem);
  };

  const handleNewItemName = (e: ChangeEvent) => {
    setNewItemName((e.target as HTMLInputElement).value);
  };

  return (
    <div className="main-component">
      <div className="list-operations">
        <ButtonGroup size="sm" className="mb-2">
          <Button onClick={() => setAddListModalVisible(true)}>
            <i className="fas fa-plus" /> Add new list
          </Button>
          <Button
            disabled={selectedListId == null}
            variant="outline-danger"
            onClick={() => setDeleteListModalVisible(true)}>
            <i className="far fa-trash-alt"></i> Delete current list
          </Button>
        </ButtonGroup>
      </div>

      <Form>
        <Form.Group controlId="selectList">
          <InputGroup>
            <Form.Control
              onChange={(e: ChangeEvent) =>
                updateSelectedListId((e.target as HTMLInputElement).value)
              }
              value={selectedListId}
              as="select">
              {lists != null && lists.length > 0 ? (
                lists.map((list: List) => (
                  <option value={list._id} key={list._id}>
                    {list.name}
                  </option>
                ))
              ) : (
                <option>Please create a list first</option>
              )}
              ;
            </Form.Control>
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
          <AddListModal
            show={addListModalVisible}
            stopAddingList={() => setAddListModalVisible(false)}
            handleOnClickSave={handleOnClickSave}
          />

          <DeleteListModal
            list={lists?.find((list) => list._id === selectedListId)}
            show={deleteListModalVisible}
            stopDeletingList={() => setDeleteListModalVisible(false)}
            handleOnClickDelete={(listId: string) => {
              deleteList(listId);
              setDeleteListModalVisible(false);
            }}
          />
        </Fragment>
      ) : null}
    </div>
  );
};
