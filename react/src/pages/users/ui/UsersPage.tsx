"use client";
import { useAppSelector } from "@/app/store";
import { GridUsers } from "@/pages/users/ui/internal";
import { ROLE_ID } from "@/shared/constants";

export const UsersPage = () => {
  const role_id = useAppSelector((state) => state.user.role_id);
  return (
    <main className="users-page">
      <div className="container">
        {role_id !== ROLE_ID.ADMIN ? (
          <>
            <h1>Страница не доступна для вас</h1>
          </>
        ) : (
          <GridUsers />
        )}
      </div>
    </main>
  );
};
