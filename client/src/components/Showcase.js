import React, { useState, useContext } from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
  Media,
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
    description: 'text about raccoons',
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
      <Container>
        <Modal isOpen={modal} toggle={toggle} className="modal-xl ">
          <ModalHeader>{items[imgId].name}</ModalHeader>
          <ModalBody className="mx-auto">
                <img
                  object
                  src={'/uploads/squirrel.jpg'}
                  alt="Generic placeholder image"
                  style={{ width: '100%', height: '100%' }}
                />
          </ModalBody>
        </Modal>
        <ListGroup>
          {items.map((item) => (
            <ListGroupItem
              key={item.id}
              className="d-flex justify-content-between align-items-center ">
              <img
                role="button"
                src={'/uploads/squirrel.jpg'}
                width="300px"
                height="200px"
                alt="Generic placeholder image"
                onClick={() => {
                  setImgId(item.id);
                  setModal(!modal);
                  console.log(item.name);
                }}
              />
              <div style={{ width: '50%' }}>
                <h5>{item.name}</h5>
                <div>{item.description}</div>
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
                  style={{ height: '40px' }}>
                  Do something
                </Button>
              ) : (
                <div>Register or login to continue</div>
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

{/* <Media align="center" className="mt-1">
<Media middle href="#" style={{ cursor: 'default' }}>
  <Media
    object
    img-src={items[imgId].img}
    alt="Generic placeholder image"
    style={{ width: '100%', height: '100%' }}
  />
</Media>
</Media> */}