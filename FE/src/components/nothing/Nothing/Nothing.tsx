import Props from "@/types";
import styles from "./Nothing.module.css";
import { classNameWrapper } from "@/utils/className";

interface NothingProps extends Props {
  //
}

const Nothing = ({ children, className }: NothingProps) => {
  return (
    <div className={classNameWrapper(styles["nothing"], className)}>
      <p className={styles["nothing__text"]}>{children}</p>
    </div>
  );
};

export default Nothing;
