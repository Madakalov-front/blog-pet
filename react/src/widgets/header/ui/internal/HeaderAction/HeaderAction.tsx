import { HeaderActionItem } from "@/widgets/header/ui/internal/HeaderAction/HeaderActionItem";
import { LogOutButton } from "@/widgets/header/ui/internal/Icon/LogOutButton";
import { LogInButton } from "@/widgets/header/ui/internal/Icon/LogInButton";
import { BackIcon } from "@/widgets/header/ui/internal/Icon/BackIcon";
import { NewArcticleIcon } from "@/widgets/header/ui/internal/Icon/NewArcticleIcon";
import { UsersListIcon } from "@/widgets/header/ui/internal/Icon/UsersListIcon";
import styles from "./HeaderAction.module.scss";
import { setFirstSymUpperCase } from "@/shared/utils";
import { useCheckAuthQuery } from "@/app/reducers";
import { useAppSelector } from "@/app/store";
import { LoaderSpinner } from "@/shared/ui/loader-spinner/LoaderSpinner";

export const HeaderAction = () => {
  const { isLoading } = useCheckAuthQuery(undefined, {
    skip: !localStorage.getItem("token"),
  });

  const { login } = useAppSelector((store) => store.user);
  const loginUpdate = login && setFirstSymUpperCase(login);

  return (
    <div className={styles["header-action"]}>
      <HeaderActionItem modClass="login">
        {isLoading && <LoaderSpinner />}
        {!login ? (
          <LogInButton />
        ) : (
          <>
            {loginUpdate && <span>{loginUpdate}</span>}
            <LogOutButton />
          </>
        )}
      </HeaderActionItem>
      <HeaderActionItem modClass="back-home">
        <BackIcon />
      </HeaderActionItem>
      <HeaderActionItem modClass="new-article">
        <NewArcticleIcon />
      </HeaderActionItem>
      <HeaderActionItem modClass="users-list">
        <UsersListIcon />
      </HeaderActionItem>
    </div>
  );
};
