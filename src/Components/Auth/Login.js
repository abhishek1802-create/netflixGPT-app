import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import { checkValidData } from "../../Utils/Validate";
import backgroundImage from "../../Images/backgroundImage.jpg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {addUser} from '../../Slices/userSlice'

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleInForm = () => {
    setSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //Validate the form Data
    console.log(email.current.value, password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Authentication Login Here

    if (!isSignInForm) {
      //SignUp logic Here
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              // ...
              const {uid,email,password,displayName} = auth.currentUser;
              dispatch(addUser({uid:uid,email:email,password:password,displayName:displayName}));
              console.log(user);
              navigate("/Browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //SignIn logic Here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/Browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={backgroundImage}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-6 bg-black my-28 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-60"
      >
        <h1 className="font-bold text-3xl py-2 m-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref = {name}
            type="text"
            placeholder="Name"
            className="p-2 m-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 m-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-2 m-2 w-full bg-gray-700"
        />
        {errorMessage && (
          <p className="font-bold text-red-500 p-2 m-2">{errorMessage}</p>
        )}
        <button
          className="px-4 py-1 m-2 bg-red-500 rounded-md w-full font-bold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <h6
          className="py-1 m-2 cursor-pointer text-white-500"
          onClick={toggleInForm}
        >
          {isSignInForm
            ? "New to Netflix ? Sign Up Now"
            : "Already Registered ! Login Now"}
        </h6>
      </form>
    </div>
  );
};

export default Login;
