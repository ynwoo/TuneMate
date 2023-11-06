import React from "react";
import Props from "@/types";
import styles from './Text.module.css'

interface TextProps extends Props {
  type: string;
  content: string;
}

const Text = ({ type, content }: TextProps) => {
  return (
    <h3 className={styles[type]}>{content}</h3>
  );
}