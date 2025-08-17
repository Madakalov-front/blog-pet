import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SaveButton.module.scss";

type SaveButtonProps = {
  onClick: () => void;
};

export const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <button className={styles["save-button"]} onClick={onClick}>
      <FontAwesomeIcon icon={faFloppyDisk} />
    </button>
  );
};
