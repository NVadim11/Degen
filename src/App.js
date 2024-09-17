import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './components/Router';
import { store } from './store';
import './App.scss';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>

  );
}

export default App;