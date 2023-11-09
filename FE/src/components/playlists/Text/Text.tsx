import React from "react";
import Props from "@/types";
import styles from './Text.module.css'

interface TextProps extends Props {
  type: string;
  content: string;
}

const Text = ({ type, content }: TextProps) => {
  return (
    <p className={styles[type]}>{content}</p>
  );
};

export default Text;
