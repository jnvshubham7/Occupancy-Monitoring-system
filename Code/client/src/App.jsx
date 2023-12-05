import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { collection, getDocs, doc, } from "firebase/firestore";

import './App.css';
import { db } from "./firebase";
import Home from './components/Homepage/Home';
import Header from './components/Navbar/Header';
import Entry from './components/Homepage/Entry/Entry';
import BuildingItem from './components/BuildingItem/BuildingItem';

const App = () => {
   return (
      <Router>
         <Header />
         <div className='container' style={{width: '70%'}}>
            <Container className=''>
               <Route path='/' component={Entry} exact />
               <Route path='/admin' component={Home} exact />
               <Route path='/building/:id' component={BuildingItem} exact />
            </Container>
         </div>
      </Router>
   )
}

export default App
