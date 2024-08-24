import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LayoutContainer, NotFoundContainer } from './shared';
import { LandingContainer, RegisterContainer, LoginContainer, CampaignListContainer, UserDashboardContainer, CreateCampaignContainer } from "./components";

function App() {  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutContainer />,
      children: [
        {
          path: '',
          element: <LandingContainer />,
        },
        {
          path: 'register',
          element: <RegisterContainer />,
        },
        {
          path: 'login',
          element: <LoginContainer />,
        },
        {
          path: 'campaign-list',
          element: <CampaignListContainer />
        },
        {
          path: 'create-campaign',
          element: <CreateCampaignContainer />
        },
        {
          path: 'user-dashboard',
          element: <UserDashboardContainer />
        },
        {
          path: '*',
          element: <NotFoundContainer />
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App
