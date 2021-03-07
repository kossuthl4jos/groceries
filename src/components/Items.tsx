import React, { ChangeEvent, useState } from 'react';

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

export const Items = ({
  items,
  deleteItem,
  completeItem,
}: {
  items: any;
  deleteItem: (itemId: string) => void;
  completeItem: (item: any) => void;
}) => {
  const [showCompletedItems, setShowCompletedItems] = useState(false);
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
      completed: true,
      completedBy,
      price,
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
    return items.some((item: any) => item.completed);
  };

  const toogleCompletedItems = () => {
    setShowCompletedItems(!showCompletedItems);
  };

  const getSelectedItem = () => {
    return items.find((item: any) => item.itemId === selectedItemId);
  };

  const getItemName = () => {
    const selectedItem = getSelectedItem();
    return getSelectedItem() != null ? selectedItem.name : null;
  };

  return (
    <div className="main-component">
      {items.map(
        (item: any) =>
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
        <div className="formGroup">
          <div className="completed-header input-group" onClick={toogleCompletedItems}>
            completed
            <span className={showCompletedItems ? 'active arrow' : 'arrow'}>
              <span />
              <span />
            </span>
          </div>
        </div>
      )}
      <Collapse in={showCompletedItems}>
        <CompletedItems completedItems={items.filter((item: any) => item.completed === true)} />
      </Collapse>

      <Modal show={completingItem} onHide={stopCompletingItem} centered>
        <ModalHeader>
          <ModalTitle>{getItemName()}</ModalTitle>
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
