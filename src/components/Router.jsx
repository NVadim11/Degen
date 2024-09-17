import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './Main';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	}
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
