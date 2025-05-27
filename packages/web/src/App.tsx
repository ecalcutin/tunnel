import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { WireguardInterfacesListContainer } from './features/wireguard/WireguardInterfaces';

export const App: React.FC = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      <Provider store={store}>
        <h1>My App</h1>
        <WireguardInterfacesListContainer />
        <p>State is: {state}</p>
        <button onClick={() => setState(10)}>Click</button>
      </Provider>
    </div>
  );
};
