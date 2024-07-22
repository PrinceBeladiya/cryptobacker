import React, { useEffect } from 'react'
import { CreateCampaign, HomePage, Layout, SigninPage, WithDrawPage, RegisterPage, CampaignDetails, WithDrawDetails } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInLayout from './pages/SignInLayout'

const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
        {
          path:'/create-campaign',
          element:<SignInLayout/>
        },
        {
          path:"",
          element:<HomePage/>
        },
        {
          path:"/withdraw",
          element:<WithDrawPage/>,
        },
        {
          path:'withdraw-details/:address',
          element:<WithDrawDetails/>
        },
        {
          path:'/sign-in',
          element:<SigninPage/>
        },
        {
          path:'/register',
          element:<RegisterPage/>
        },
        {
          path:'/campaign-details/:address',
          element:<CampaignDetails/>
        },
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
