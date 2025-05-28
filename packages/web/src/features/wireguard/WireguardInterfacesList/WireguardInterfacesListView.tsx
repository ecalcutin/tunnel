import React from 'react';
import { ListItemView, ListView } from '../../../ui/List';

type Props = {
  readonly items: [];
};

export const WireguardInterfacesListView: React.FC<Props> = props => {
  const { items } = props;

  return (
    <div>
      <ListView>
        {items.map((item, index) => {
          return <ListItemView key={index} subtitle='' title='' />;
        })}
      </ListView>
    </div>
  );
};
