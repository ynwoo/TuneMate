import Props from "@/types";
import styles from "./RequestsNavbar.module.css";
import { OptionType, RequestsState } from "@/pages/requests";
import { classNameWrapper } from "@/utils/className";
import Button from "@/components/button/Button";

interface RequestsNabvarProps extends Props {
  onSelect: (value: RequestsState) => void;
  items: OptionType[];
}

const RequestsNabvar = ({
  onSelect,
  className,
  items,
}: RequestsNabvarProps) => {
  return (
    <nav className={classNameWrapper(styles["requests-navbar"], className)}>
      {items.map(({ name, value }) => (
        <Button
          className={styles["requests-navbar__item"]}
          onClick={() => onSelect(value)}
        >
          {name}
        </Button>
      ))}
    </nav>
  );
};

export default RequestsNabvar;
