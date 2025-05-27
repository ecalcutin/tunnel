import React, { Fragment, PropsWithChildren } from 'react';
import { useGetWireguardInterfacesQuery } from '../api';

type Props = {} & PropsWithChildren;

export const WireguardInterfacesListContainer: React.FC<Props> = props => {
  const { data: interfaces = [] } = useGetWireguardInterfacesQuery();

  console.log(interfaces);

  return <Fragment>{props.children}</Fragment>;
};
