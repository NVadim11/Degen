import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './Main';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
    {
        basename: '/Degen', // Додаємо basename для підкаталогу GitHub Pages
      }
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
