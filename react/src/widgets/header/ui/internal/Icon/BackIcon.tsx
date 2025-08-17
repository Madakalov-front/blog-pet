import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "../../../../../shared/ui/IconLink/IconLink.module.scss";
import { useNavigate } from "react-router";

export const BackIcon = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);

  return (
    <button
      onClick={handleClick}
      className={clsx(styles["link-icon"], styles["link-icon--back-link"])}
    >
      <FontAwesomeIcon icon={faCircleChevronLeft} />
    </button>
  );
};
