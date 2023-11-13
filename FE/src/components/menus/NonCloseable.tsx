import React from "react";
import styles from "./menus.module.css";
import Props from "@/types";
import { classNameWrapper } from "@/utils/className";

interface MenuProps extends Props {
  isOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const NonCloseableMenu = ({
  className,
  isOpen,
  children,
}: MenuProps) => {
  return (
    <>
    {isOpen && (
        <div
          className={classNameWrapper(className, styles["modal-overlay"])}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={styles["modal-box"]}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )


};

export default NonCloseableMenu;