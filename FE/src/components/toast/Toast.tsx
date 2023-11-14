import React from "react";
import Props from "@/types";
import styles from "./Toast.module.css";

interface ToastProps extends Props {
  msg: string;
  toastStatus: boolean;
}

const Toast = ({ msg, toastStatus }: ToastProps) => {
  return <div className={`${styles.toast} ${toastStatus ? styles.visible : ''}`}>{msg}</div>;
}

export default Toast;