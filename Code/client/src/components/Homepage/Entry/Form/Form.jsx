import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp,getDoc  } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {Alert} from 'react-bootstrap'

import { forceReload } from '../../../../redux/reloadSlice.js';
import { db } from "./../../../../firebase.js";

const Form = () => {
    const reloadFlag = useSelector((state) => state.reload.reloadFlag);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [building, setBuilding] = useState('');
    const [buildings, setBuildings] = useState([]);
    const [alert,setAlert] = useState(false)

    const buildingsColletion = collection(db, "buildings");
    const entryCollection = collection(db, "entries");

    const updateBuilding = async (id, curocc) => {
        const buildingDoc = doc(db, "buildings", id);
        const newFields = { curocc: curocc + 1 };
        await updateDoc(buildingDoc, newFields);
        dispatch(forceReload({reloadFlag: !reloadFlag}));
        
    };

    const getBuildings = async () => {
        const data = await getDocs(buildingsColletion);

        setBuildings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    useEffect(() => {
        getBuildings();
    }, [reloadFlag]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef=doc(db, "buildings", building);
        const docSnap = await getDoc(docRef);
        const docData=docSnap.data();

        if(docData.curocc>=docData.maxocc)
            setAlert(true)
        else {
            setAlert(false)
            await addDoc(entryCollection, {
                name: name,
                building: building,
                entry: serverTimestamp(),
                exit: null
            });
            updateBuilding(building, docData.curocc);
    
            setName("")
            setBuilding("")
        }
    };

    return (
        <div className='container' >
            <div className='pt-3 px-5'>
                <h3 className='px-3'>Enter your details</h3>
                <div className="row g-3">
                    <div className="col-6">
                        <input className="form-control form-control-lg"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                    </div>
                    <div className="col-4">
                        <select className="form-select form-select-lg"  onClick={(e) => setBuilding(e.target.value)} >
                            {buildings.map((building) => (
                                <option key={building.id} value={building.id}>{building.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-auto">
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary mb-3 btn-lg">Enter</button>
                    </div>
                </div>
                { alert && (
                    <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    <Alert.Heading>Sorry! You can't enter the building</Alert.Heading>
                    <p>
                      It seems the buidling you're trying to enter is at its maximum capacity
                    </p>
                  </Alert>
                )}
                <div className="row g-3">
                    
                </div>
            </div>
            <hr className="style1" />

        </div>
    )
}

export default Form;