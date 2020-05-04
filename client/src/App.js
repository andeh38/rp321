import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { AppNavbar } from './components/AppNavbar';
import { UploadImage } from './components/UploadImage';
import { CarouselComponent } from './components/Carousel';
import { Showcase } from './components/Showcase';

import { AuthProvider } from './context/AuthState';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppNavbar>
          <Showcase id="Showcase"></Showcase>
          <UploadImage id="Upload image"></UploadImage>
          <CarouselComponent id="Carousel"></CarouselComponent>
        </AppNavbar>
      </div>
    </AuthProvider>
  );
}

export default App;
