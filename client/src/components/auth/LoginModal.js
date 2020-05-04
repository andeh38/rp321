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

export const LoginModal = () => {
  const { login, error, errorClear, isAuthenticated } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggle = () => {
    setOpen(!isOpen);
    errorClear();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const User = {
      email,
      password,
    };

    login(User);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false);
      setEmail('');
      setPassword('');
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavLink style={{color:'white'}} onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="mb-3"
                autoComplete='email'
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
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
