import { ROLE_ID, ROLE_NAME } from "@/shared/constants";
import styles from "./GridUsers.module.scss";
import { UpdateRole } from "@/feature/updateRole/ui/UpdateRole";
import { DeleteUserButton } from "@/shared/ui";
import { useGetUsersQuery } from "@/app/reducers";
import { setFirstSymUpperCase } from "@/shared/utils";

export const GridUsers = () => {
  // const { data, status, error } = useLoadingDataUsers();
  const { data } = useGetUsersQuery();

  return (
    <div className={styles["grid-users"]}>
      <div className={styles["grid-users__info"]}>
        <span>Логин</span>
        <span>Дата регистрации</span>
        <span>Роль</span>
      </div>
      {data &&
        data.map((item) => (
          <div key={item.id} className={styles["grid-users__item"]}>
            <span className={styles["grid-users__login"]}>
              {setFirstSymUpperCase(item.login)}
            </span>
            <span className={styles["grid-users__date"]}>
              {item.register_at}
            </span>
            {item.role_id !== null ? (
              item.role_id === ROLE_ID.ADMIN ? (
                <span className="react-select--fake">
                  {ROLE_NAME[item.role_id]}
                </span>
              ) : (
                <>
                  <UpdateRole
                    style={styles["grid-users__role"]}
                    role_id={item.role_id}
                    id={item.id}
                  />
                  <DeleteUserButton id={item.id} />
                </>
              )
            ) : null}
          </div>
        ))}
    </div>
  );
};
