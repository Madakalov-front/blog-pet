import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DeleteUserButton.module.scss";
import { useDeleteUserMutation } from "@/app/reducers";

type DeleteUserButtonProps = {
  id: number;
};

export const DeleteUserButton = ({ id }: DeleteUserButtonProps) => {
  const [deleteUser] = useDeleteUserMutation();
  const handleRemoveUser = async () => {
    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button onClick={handleRemoveUser} className={styles["delete-button"]}>
      <FontAwesomeIcon icon={faUserSlash} />
    </button>
  );
};
