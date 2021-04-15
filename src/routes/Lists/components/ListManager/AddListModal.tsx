import React, { ChangeEvent, useState } from 'react';
import { Button, FormControl, Modal, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

interface AddListModalProps {
  show: boolean;
  stopAddingList: VoidFunction;
  handleOnClickSave: (newListName: string) => void;
}

export const AddListModal = ({ show, stopAddingList, handleOnClickSave }: AddListModalProps) => {
  const [newListName, setnewListName] = useState('');

  return (
    <Modal show={show} onHide={stopAddingList} centered>
      <ModalHeader closeButton>
        <ModalTitle>New list</ModalTitle>
      </ModalHeader>

      <Modal.Body>
        <FormControl
          size="lg"
          type="text"
          placeholder="Enter name"
          onChange={(e: ChangeEvent) => {
            setnewListName((e.target as HTMLInputElement).value);
          }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={stopAddingList}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleOnClickSave(newListName)}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
