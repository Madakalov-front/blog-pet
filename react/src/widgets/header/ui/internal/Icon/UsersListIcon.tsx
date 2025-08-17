import { IconLink } from "@/shared/ui/IconLink/IconLink";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UsersListIcon = () => {
  return (
    <IconLink
      to="/users"
      icon={<FontAwesomeIcon icon={faUsers} />}
      className="users-list"
    />
  );
};
