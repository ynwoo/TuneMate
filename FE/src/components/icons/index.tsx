import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./icons.module.css";

const Icon = {
  Home: () => (
    <FontAwesomeIcon className={styles.icon} icon={faHouse} size="2xl" />
  ),
  Profile: () => (
    <FontAwesomeIcon className={styles.icon} icon={faUser} size="2xl" />
  ),
  Friends: () => (
    <FontAwesomeIcon className={styles.icon} icon={faMessage} size="2xl" />
  ),
  Recommendation: () => (
    <FontAwesomeIcon className={styles.icon} icon={faUserPlus} size="2xl" />
  ),
  Back: () => (
    <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} size="2xl" />
  ),
  Alarm: () => (
    <FontAwesomeIcon className={styles.icon} icon={faBell} size="2xl" />
  ),
};

export default Icon;
