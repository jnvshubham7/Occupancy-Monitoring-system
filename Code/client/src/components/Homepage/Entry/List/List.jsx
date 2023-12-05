import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc, serverTimestamp, getDoc,query,where } from "firebase/firestore";
import { ListGroup, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import { forceReload } from '../../../../redux/reloadSlice.js';
import { db } from "../../../../firebase";

const List = () => {
  const reloadFlag = useSelector((state) => state.reload.reloadFlag);
  const dispatch = useDispatch();

  const [entries, setEntries] = useState([]);
  const entriesColletion = collection(db, "entries");

  const getEntries = async () => {
    const q = query(collection(db, "entries"), where("exit", "==", null));
    const data = await getDocs(q);

    setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  const updateBuilding = async (id) => {
    const buildingDoc = doc(db, "buildings", id);
    const docSnap = await getDoc(buildingDoc);
    const docData=docSnap.data();

    const newFields = { curocc: docData.curocc - 1 };
    await updateDoc(buildingDoc, newFields);

  };

  const handleExit = async (id) => {
    const EntryDoc = doc(db, "entries", id);
    const docSnap = await getDoc(EntryDoc);
    const docData=docSnap.data();

    const newFields = { exit: serverTimestamp() };
    await updateDoc(EntryDoc, newFields);

    dispatch(forceReload({reloadFlag: !reloadFlag}));
    
    updateBuilding(docData.building);
  };
  useEffect(() => {
    getEntries();
  }, [reloadFlag]);

  return (
    <Container>
      <h4 className='px-3'>Active User List</h4>
      <ListGroup as="ol" numbered>
        {entries.map((en) => (
          en.exit == null &&
          < ListGroup.Item className="d-flex justify-content-between align-items-start" key={en.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{en.name} </div>
              <div>{en.building} | {new Date(en.entry?.toDate()).toUTCString()}</div>
            </div>
            <Button onClick={() => {
              handleExit(en.id);
            }}> Exit</Button>
          </ListGroup.Item>
        ))}
      </ListGroup >
    </Container>
  )
}

export default List