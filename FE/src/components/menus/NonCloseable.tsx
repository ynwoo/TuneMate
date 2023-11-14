import React from "react";
import styles from "./menus.module.css";
import Props from "@/types";
import { classNameWrapper } from "@/utils/className";

interface MenuProps extends Props {
  isMenuOpen: boolean;
  children: JSX.Element | JSX.Element[];
}

const NonCloseableMenu = ({
  className,
  isMenuOpen,
  children,
}: MenuProps) => {
  return (
    <>
    {isMenuOpen && (
        <div
          className={classNameWrapper(className, styles["menu-overlay"])}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={styles["menu-box"]}
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