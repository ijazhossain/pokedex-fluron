import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Main from './Layouts/Main.jsx'
import Listing from './Pages/Listing/Listing.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/listing',
        element:<Listing></Listing>,
        loader:()=>fetch('https://pokeapi.co/api/v2/pokemon/')
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
