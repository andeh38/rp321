import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { AppNavbar } from './components/AppNavbar';
import { UploadImage } from './components/UploadImage';
import { CarouselComponent } from './components/Carousel';
import { Showcase } from './components/Showcase';
/* import { Header } from './components/expensetracker/Header';
import { Balance } from './components/expensetracker/Balance';
import { IncomeExpenses } from './components/expensetracker/IncomeExpenses';
import { TransactionList } from './components/expensetracker/TransactionList';
import { AddTransaction } from './components/expensetracker/AddTransaction'; */

import { AuthProvider } from './context/AuthState';
import { ExpenseProvider } from './context/ExpenseState';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppNavbar>
{/*           <Showcase id="Showcase"></Showcase> */}
          <UploadImage id="Upload image"></UploadImage>
          <CarouselComponent id="Carousel"></CarouselComponent>
          {/* <div id="Expense tracker">
            <ExpenseProvider>
              <Container>
                <Balance></Balance>
                <IncomeExpenses></IncomeExpenses>
                <TransactionList></TransactionList>
                <AddTransaction></AddTransaction>
              </Container>
            </ExpenseProvider>
          </div> */}
        </AppNavbar>
      </div>
    </AuthProvider>
  );
}

export default App;
