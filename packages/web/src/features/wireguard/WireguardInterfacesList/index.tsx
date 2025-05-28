import React, { Fragment, PropsWithChildren } from 'react';
import { useGetWireguardInterfacesQuery } from '../api';
import { WireguardInterfacesListView } from './WireguardInterfacesListView';

export const WireguardInterfacesList: React.FC = () => {
  const { data: interfaces = [] } = useGetWireguardInterfacesQuery();

  console.log(interfaces);

  return (
    <Fragment>
      <WireguardInterfacesListView items={[]} />
    </Fragment>
  );
};
