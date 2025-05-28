import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { WireguardInterfacesList } from './features/wireguard/WireguardInterfacesList';

export const App: React.FC = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      <Provider store={store}>
        <h1>My App</h1>
        <WireguardInterfacesList />
        <p>State is: {state}</p>
        <button onClick={() => setState(10)}>Click</button>
      </Provider>
    </div>
  );
};
