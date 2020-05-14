import React, { useState, useContext } from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { AuthContext } from '../context/AuthState';

const items = [
  {
    img: '/uploads/elephant.jpg',
    name: 'Elephant',
    description: 'text about elephants',
    id: 0,
  },
  {
    img: '/uploads/raccoon.jpg',
    name: 'Raccoon',
    description:
      'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condi',
    id: 1,
  },
  {
    img: '/uploads/squirrel.jpg',
    name: 'Squirrel',
    description:
      'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus',
    id: 2,
  },
];

export const Showcase = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [imgId, setImgId] = useState(0);
  const [show, setShow] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Container style={{ rowHeight: '1 px' }}>
        <Modal isOpen={modal} toggle={toggle} className="modal-xl ">
          <ModalHeader>{items[imgId].name}</ModalHeader>
          <ModalBody className="mx-auto">
            <img
              object
              src={items[imgId].img}
              alt="Generic placeholder"
              style={{ width: '100%', height: '100%' }}
            />
          </ModalBody>
        </Modal>
        <ListGroup className="d-flex flex-column">
          {items.map((item) => (
            <ListGroupItem key={item.id} className="d-flex align-items-center ">
              <img
                role="button"
                src={item.img}
                width="30%"
                height="100%"
                alt="Generic placeholder"
                onClick={() => {
                  setImgId(item.id);
                  setModal(!modal);
                  console.log(item.name);
                }}
              />
              <div className=" p-2 bd-highlight " style={{ width: '50%' }}>
                <h5 style={{ width: '100%' }}>{item.name}</h5>
                <div
                  style={{ height: '100px', width: '100%' }}
                  className=" overflow-auto">
                  {item.description}
                </div>
              </div>
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    if (show) {
                      return;
                    } else {
                      setImgId(item.id);
                      setShow(!show);
                      setTimeout(function () {
                        setShow(false);
                      }, 1500);
                    }
                  }}
                  className="ml-auto p-2 bd-highlight"
                  style={{ height: '100%', width: '20%', }}>
                  Do something
                </Button>
              ) : (
                <div
                  style={{ height: '100%', width: '20%', marginRight: '0px' }}
                  className="  overflow-auto">
                  Authorize to continue
                </div>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
      <Toast
        isOpen={show}
        style={{ position: 'absolute', bottom: '0', right: '0' }}
        id="toast">
        <ToastHeader>Title</ToastHeader>
        <ToastBody>
          {' '}
          You succesfully did something to {items[imgId].name}
        </ToastBody>
      </Toast>
    </>
  );
};
