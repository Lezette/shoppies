import React from 'react';
import Shoppies from './components';
import { NominationProvider } from './context/nomination';

const App = () => (
  <NominationProvider>
      <div className="bg-gray-800 text-white pb-44">
        <Shoppies />
      </div>
  </NominationProvider>
  );

export default App;
