import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, ListGroup, Card, Button, Form, } from 'react-bootstrap'
import { updateDoc, doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { forceReload } from '../../redux/reloadSlice.js';
import Library from './../../../images/library.jpg';
import { db } from "./../../firebase.js";

const data = [
   {
      currentOccupancy: 0,
   },
   {
      currentOccupancy: 2,
   },
   
 ];

const BuildingItem = ({ history, match }) => {
   const reloadFlag = useSelector((state) => state.reload.reloadFlag);
   const dispatch = useDispatch();

   const [name, setName] = useState();
   const [maxocc, setMaxocc] = useState();
   const [curocc, setCurocc] = useState();
   const [changeocc, setChangeocc] = useState();
   const [entries, setEntries] = useState([]);

   let data = [
      {currentOccupancy: 0},{currentOccupancy:curocc}
   ]
   const getBuilding = async () => {
      const ID = match.params.id;
      const docRef = doc(db, "buildings", ID);
      const docSnap = await getDoc(docRef);
      setName(docSnap.data().name)
      setMaxocc(docSnap.data().maxocc)
      setCurocc(docSnap.data().curocc)
      
      data.push({currentOccupancy: curocc})
   }

   const getEntries = async () => {
      const q = query(collection(db, "entries"), where("building", "==", match.params.id));
      const data = await getDocs(q);

      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const docRef = doc(db, "buildings", match.params.id);
      const newFields = { maxocc: Number(changeocc) };
      await updateDoc(docRef, newFields);


      setChangeocc(0)
      dispatch(forceReload({ reloadFlag: !reloadFlag }));
   };

   useEffect(() => {
      getBuilding();
      getEntries();
   }, [reloadFlag]);

   return (
      <Container className="border-solid">
         <Link className='btn btn-light my-3' to='/admin'>
            Go Back
         </Link>
         <>
            <h1>{name}</h1>
            <hr className="style1" />
            <Row>
               <h4 className='px-3'>Building Stats</h4>
               <Card className="">
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <Row>
                           <Col md={7} >Maximum Occupancy:</Col>
                           <Col md={5} >{maxocc}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col md={7}>Current Occupancy:</Col>
                           <Col md={5}>
                              {curocc}
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col md={7}>Change Maximum Occupancy:</Col>
                           <Col md={5}>
                              <input className="form-control form-control-lg" value={changeocc} onChange={(e) => setChangeocc(e.target.value)} />
                           </Col>
                           <Button
                              onClick={handleSubmit}
                              className='btn-block mt-2'
                              type='button'
                              disabled={changeocc < curocc}
                           >
                              Update
                           </Button>
                        </Row>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Row>
            <hr className="style1" />
            <Row >
               <Col md={8}>
               <LineChart width={650} height={400} data={data} margin={{top: 5,right: 30,left: 20,bottom: 5,}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis type="number" domain={[0, Number(curocc)+5]}/>
                  <Tooltip />
                  <Legend />
                  
                  <Line type="monotone" dataKey="currentOccupancy" stroke="#82ca9d" />
               </LineChart>
               </Col>
               <Col md={4} >
                  <h4 className='px-3'>Recent Visitors</h4>
                  <ListGroup as="ol" numbered>
                     {entries.map((en) => (
                        en.exit == null &&
                        < ListGroup.Item className="d-flex justify-content-between align-items-start" key={en.id}
                        >
                           <div className="ms-2 me-auto">
                              <div className="fw-bold">Name: {en.name} </div>
                              <div>Entry: {new Date(en.entry?.toDate()).toUTCString()}</div>
                           </div>

                        </ListGroup.Item>
                     ))}
                  </ListGroup >
               </Col>

            </Row>
         </>
      </ Container>
   )
}

export default BuildingItem;