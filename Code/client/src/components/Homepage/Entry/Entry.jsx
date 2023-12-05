import { useState, useEffect } from 'react'
import { db } from "./../../../firebase.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, } from "firebase/firestore";

import List from './List/List.jsx';
import Form from './Form/Form.jsx';

const Entry = () => {
  return (
    <>
      <Form />
      <List  />
    </>
  )
}

export default Entry