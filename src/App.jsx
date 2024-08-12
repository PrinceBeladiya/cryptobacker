import { useState } from 'react';
import { LandingPage, Layout, LoginPage, RegisterPage, CampaignList } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <LandingPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'campaign-list',
          element: <CampaignList/>
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
