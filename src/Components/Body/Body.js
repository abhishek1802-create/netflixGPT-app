import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Utils/Firebase';
import Login from '../Auth/Login'
import Browse from '../Browse/Browse'
import { addUser, removeUser } from '../../Slices/userSlice';

const Body = () => {

  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
        path : '/',
        element : <Login/>,
    },
    {
        path : '/Browse',
        element : <Browse/>,
    }
  ])

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        //const uid = user.uid;
        // ...
        const {uid,email,password} = user;
        dispatch(addUser({uid:uid,email:email,password:password}));
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
      }
    });
  },[])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
