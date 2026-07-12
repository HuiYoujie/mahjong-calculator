import React from 'react';
import CustomTabBar from './custom-tab-bar';
import './app.scss';

function App({ children }) {
  return (
    <>
      {children}
      {process.env.TARO_ENV === 'h5' ? <CustomTabBar /> : null}
    </>
  );
}

export default App;
