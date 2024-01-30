import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from '../Auth/Login'
import Browse from '../Browse/Browse'


const Body = () => {


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

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
