import { Button } from "@/shared";
import { useLocation, useNavigate } from "react-router";

export const LogInButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      name="войти"
      variant="submit"
      size="small"
      disabled={pathname === "/login"}
      onClick={() => navigate("/login")}
    />
  );
};
