import React, { Fragment, PropsWithChildren } from 'react';
import { ListItemView } from './ListItemView';

import styles from './list.module.css';

type Props = {
  children: React.ReactNode;
};

export const ListView: React.FC<Props> = props => {
  const { children } = props;

  return (
    <Fragment>
      <div className={styles.list}></div>
    </Fragment>
  );
};
