import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faBars, faCirclePlay, faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./icons.module.css";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons/faMusic";

type IconSize = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
interface IconProps {
  size?: IconSize;
}

const Icon = {
  Home: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faHouse} size={size} />
  ),
  Profile: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faUser} size={size} />
  ),
  Friends: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faMessage} size={size} />
  ),
  Recommendation: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faUserPlus} size={size} />
  ),
  Back: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} size={size} />
  ),
  Alarm: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faBell} size={size} />
  ),
  Message: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faComment} size={size} />
  ),
  Music: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faMusic} size={size} />
  ),
  PlayMusic: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faCirclePlay} size={size} />
  ),
  Menu: ({ size = "2xl" }: IconProps) => (
    <FontAwesomeIcon className={styles.icon} icon={faBars} size={size} />
  ),
};

export default Icon;
