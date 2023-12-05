import {useState} from 'react'
import { auth, provider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {Alert} from 'react-bootstrap'

import { update } from '../../redux/adminSlice';
import './Login.css';


const Login = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [alert,setAlert] = useState(false)

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const name = res.user.displayName;
        const email = res.user.email;
        const photoURL = res.user.photoURL;
        if(email=="iit2020006@iiita.ac.in") {
          dispatch(update({ name, email, photoURL }));
        }else{
          setAlert(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
      <section className="hero">
            <h1>Welcome! Admin</h1>
            <p>CLick the button below to login with your Google account</p>
            <button className="btn btn-lg btn-google btn-block btn-outline" onClick={signInWithGoogle}>
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signin with Google
          </button>
          { alert && (
                    <Alert variant="danger" onClose={() => setAlert(false)} dismissible className='mt-3'>
                    <Alert.Heading>Sorry! you don't have the admin access </Alert.Heading>
                  </Alert>
                )}
        </section>
    </div>
  )
}

export default Login