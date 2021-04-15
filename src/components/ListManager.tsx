import React, { ChangeEvent, Fragment, useState } from 'react';
import { List } from '../types';
import { AddListModal } from './';
import {
  ButtonGroup,
  Button,
  Form,
  Collapse,
  InputGroup,
  FormControl,
  FormText,
  FormGroup,
} from 'react-bootstrap';
import { DeleteListModal } from './DeleteListModal';
import { v4 as uuidv4 } from 'uuid';

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
        <FormGroup controlId="selectList">
          <InputGroup>
            <FormControl
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
            </FormControl>
          </InputGroup>
        </FormGroup>
      </Form>

      {lists != null && lists.length > 0 ? (
        <Fragment>
          <div className="new-item-btn" onClick={toogleItemForm}>
            Add new item
          </div>
          <Collapse in={addingItem}>
            <Form>
              <FormControl
                placeholder="Enter item name"
                value={newItemName}
                onChange={handleNewItemName}
              />
              <FormText className="text-muted">
                This item will be added to the selected shopping list.
              </FormText>
              <Button variant="primary" onClick={handleOnClickAdd} disabled={newItemName === ''}>
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

      <DeleteListModal
        list={lists?.find((list) => list._id === selectedListId)}
        show={deleteListModalVisible}
        stopDeletingList={() => setDeleteListModalVisible(false)}
        handleOnClickDelete={(listId: string) => {
          deleteList(listId);
          setDeleteListModalVisible(false);
        }}
      />
    </div>
  );
};
