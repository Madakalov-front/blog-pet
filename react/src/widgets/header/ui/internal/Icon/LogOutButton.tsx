import { logOut } from "@/app/reducers/user-reducer";
import { useAppDispatch } from "@/app/store";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate("/");
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faArrowRightToBracket} />
    </button>
  );
};
