import React from 'react'
import { CreateCampaign, HomePage, Layout, SigninPage, WithDrawPage } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
        {
          path:'/create-campaign',
          element:<CreateCampaign/>
        },
        {
          path:"",
          element:<HomePage/>
        },
        {
          path:"/withdraw",
          element:<WithDrawPage/>
        },
        {
          path:'/sign-in',
          element:<SigninPage/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
