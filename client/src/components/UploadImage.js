import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Alert,
  Toast,
  ToastBody,
  ToastHeader,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { AuthContext } from '../context/AuthState';

export const UploadImage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/images/');
      setImageName(res.data);
    }
    fetchData();
  }, []);

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete('/api/images/delete');

      setImageName(res.data);
    } catch (err) {
      console.log('smthng went wrong!');
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);

      const data = new FormData();

      data.append('file', image);

      const res = await axios.post('/api/images/upload', data);

      setImage(null);

      document.getElementById('fileupload').value = null;

      setImageName(res.data.originalname);

      setShow(!show);

      setTimeout(function () {
        setShow(false);
      }, 2900);
    } catch (err) {
      setError('Wrong file format, please choose either jpg, png or jpeg');
    }
  };

  let DeleteButton;
  if (isAuthenticated) {
    if (user.user.admin) {
      DeleteButton = <Button onClick={onClick}>Delete</Button>;
    }
  }

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit} encType="multipart/form-data">
          <FormGroup>
            <Label>Change image below</Label>
            <Input
              type="file"
              name="file"
              id="fileupload"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              id="image"
              src={`/uploads/${imageName}`}
              alt="Generic placeholder"
              width="50%"
              height="25%"></img>
            {DeleteButton}
            <br />
            <br />
            <Button>Submit</Button>
            {error ? <Alert color="danger">{error}</Alert> : null}
          </FormGroup>
        </Form>
      </Container>
      <Toast
        isOpen={show}
        style={{ position: 'absolute', bottom: '0', right: '0' }}
        id="toast">
        <ToastHeader>Title</ToastHeader>
        <ToastBody> Image succesfully uploaded</ToastBody>
      </Toast>
    </>
  );
};
