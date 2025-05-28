import React, { Fragment } from 'react';

import styles from './list-item.module.css';

type Props = {
  readonly title: string;
  readonly subtitle: string;
};

export const ListItemView: React.FC<Props> = props => {
  return (
    <Fragment>
      <div className={styles.listItem}>
        <div>{props.title}</div>
        <div>{props.subtitle}</div>
      </div>
    </Fragment>
  );
};
