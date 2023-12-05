import {useState} from 'react';
import { useSelector } from "react-redux";

import Cards from './../Cards/Cards';
import Entry from './Entry/Entry.jsx';
import Login from './../Login/Login.jsx'

const Home = () => {
   const name = useSelector((state) => state.admin.adminInfo.name);

   return (
      <div className="container">
         {name ? (<Cards />) : (<Login />)}
      </div>
   )
}

export default Home