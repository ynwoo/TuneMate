import React from 'react';
import Props from '@/types';
import styles from './NameBar.module.css'

interface NameBarProps extends Props {
  name: string
}

const NameBar = ({ name }: NameBarProps) => {
  return (
    <div className={styles["name-bar"]}>
      <h3 className={styles["name-text"]} >{ name }</h3>
    </div>
  );
};

export default NameBar;
