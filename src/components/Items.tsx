import React, { ChangeEvent, Fragment, useState } from 'react';

import { CompletedItems } from './CompletedItems';

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Collapse,
  FormControl,
  FormGroup,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from 'react-bootstrap';
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { Item } from '../types';

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
  const [completedBy, setCompletedBy] = useState('');
  const [price, setPrice] = useState('');

  const stopCompletingItem = () => {
    setCompletingItem(false);
    setSelectedItemId('');
  };

  const handleOnClickSave = () => {
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

  const handleItemPrice = (e: ChangeEvent) => {
    setPrice((e.target as HTMLInputElement).value);
  };

  const handleItemCompletedBy = (e: ChangeEvent) => {
    setCompletedBy((e.target as HTMLInputElement).value);
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

      <Modal show={completingItem} onHide={stopCompletingItem} centered>
        <ModalHeader>
          <ModalTitle>{getSelectedItem().name}</ModalTitle>
          <Button variant="danger" onClick={handleOnClickDelete}>
            DELETE
          </Button>
        </ModalHeader>
        <ModalBody>
          <FormGroup controlId="itemPrice">
            <InputGroup>
              <InputGroupWithExtras.Text>€</InputGroupWithExtras.Text>
              <FormControl
                type="text"
                placeholder="Price"
                aria-describedby="inputGroupPrepend"
                onChange={handleItemPrice}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormControl type="text" placeholder="Purchased by" onChange={handleItemCompletedBy} />
        </ModalBody>
        <ModalFooter>
          <ButtonToolbar className="justify-content-between">
            <ButtonGroup className="pull-left" aria-label="First group"></ButtonGroup>
            <ButtonGroup aria-label="Second group">
              <Button variant="secondary" onClick={stopCompletingItem}>
                Close
              </Button>
              <Button variant="primary" onClick={handleOnClickSave}>
                Save
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </ModalFooter>
      </Modal>
    </div>
  );
};
