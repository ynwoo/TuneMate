import React from 'react';
import Props from '@/types';
import styles from './NameBar.module.css'

interface NameBarProps extends Props {
  name: string
}

const NameBar = ({ name }: NameBarProps) => {
  return (
    <div className={styles["name-bar"]}>
      { name }
    </div>
  );
};

export default NameBar;
