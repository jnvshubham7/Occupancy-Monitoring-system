import { useState, useEffect } from 'react'
import { Row, Col, Card , Button, Container} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../firebase";
import { forceReload } from '../../redux/reloadSlice.js';
import {
   collection,
   getDocs,
   addDoc,
   setDoc,
   updateDoc,
   deleteDoc,
   doc,
} from "firebase/firestore";

import Carditem from './Carditem';

const Cards = () => {
   const reloadFlag = useSelector((state) => state.reload.reloadFlag);
   const dispatch = useDispatch();

   const [name, setName] = useState("");
   const [max, setMax] = useState();
   const [image,setImage] = useState("");
   const [buildings, setBuildings] = useState([]);

   const buildingsColletion = collection(db, "buildings");

   const createBuilding = async (e) => {
      e.preventDefault();

      await setDoc(doc(db, "buildings", name), {
         name: name,
         maxocc: Number(max),
         curocc: Number(0),
         image: image?image:"https://it.iiita.ac.in/images/IIIT_logo_transparent.gif"
      });
      dispatch(forceReload({reloadFlag: !reloadFlag}));
      setName("")
      setMax(0)
      setImage("")
   };

   const getBuildings = async () => {
      const data = await getDocs(buildingsColletion);
      console.log(data)
      setBuildings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   };

   useEffect(() => {
      getBuildings();
   }, [reloadFlag]);

   return (
      <>
         <Row>
            {buildings.map((building) => (
               <Col key={building.id} sm={12} md={6} lg={4} xl={4}>
                  <Carditem building={building} />
               </Col>
               
            ))}
            <Col key="new" sm={12} md={6} lg={4} xl={4}>
            <Card style={{ width: '18rem', marginTop: "2rem" }}>
               <Card.Body>
               <Card.Title><h3>Add Building</h3></Card.Title>
               <div className='mb-2'>
                   <input className="form-control form-control-lg"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of the building" />
               </div>
               <div className='mb-2'>
               <input className="form-control form-control-lg"  value={max} onChange={(e) => setMax(e.target.value)} placeholder="Maximum Occupancy" />
               </div>
               <div className='mb-2'>
                   <input className="form-control form-control-lg"  value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image address" />
               </div>
               <button onClick={createBuilding} type="submit" className="btn btn-primary mb-3 btn-lg align-center">Enter</button>
               </Card.Body>
            </Card>
            </Col>
         </Row>
      </>
   );
}

export default Cards