import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  NavLink,
} from 'reactstrap';
import { AuthContext } from '../../context/AuthState';

export const RegistrationModal = () => {
  const { register, error, errorClear, isAuthenticated } = useContext(
    AuthContext
  );

  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggle = () => {
    setOpen(!isOpen);
    errorClear();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    errorClear();
    register(newUser);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false);
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavLink style={{ color: 'white' }} onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Registration</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="mb-3"
                autoComplete="username"
                onChange={(e) => setName(e.target.value)}></Input>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="mb-3"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}></Input>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="mb-3"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}></Input>
            </FormGroup>
            <Button color="dark" style={{ marginTop: '2rem' }} block>
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
