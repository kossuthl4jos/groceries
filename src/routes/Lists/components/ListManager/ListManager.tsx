import React, { ChangeEvent, Fragment, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { AddListModal, DeleteListModal } from './';
import { List } from '~/types';
import { addList } from '../../../../gateway';

export const ListManager = ({
  lists,
  refreshLists,
  deleteList,
  updateList,
  selectedListId,
  updateSelectedListId,
}: {
  lists?: Array<List>;
  refreshLists: () => Promise<void>;
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

  const handleOnClickSave = async (newListName: string) => {
    const newList = {
      _id: uuidv4(),
      name: newListName,
      items: [],
    };

    const { _id } = await addList(newList);
    await refreshLists();

    if (_id != null) {
      updateSelectedListId(_id);
    }
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
