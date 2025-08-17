import { useEditRoleUserMutation } from "@/app/reducers";
import { SelectRole } from "@/entities/select-role";
import { ROLE_ID } from "@/shared/constants";
import { SaveButton } from "@/shared/ui";
import { useState } from "react";

type UpdateRoleProps = {
  style: string;
  role_id: number;
  id: number;
};

export const UpdateRole = ({ style, role_id, id }: UpdateRoleProps) => {
  const [editRoleUser] = useEditRoleUserMutation();
  const [updateCurrentRole, setUpdateCurrentRole] = useState<number>(role_id);

  const handleUpdateRole = () => {
    if (id) {
      editRoleUser({ id, role_id: updateCurrentRole });
    }
  };
  const handleCange = (cur: number) => setUpdateCurrentRole(cur);
  return (
    <div className={style}>
      <SelectRole handleChange={handleCange} role_id={role_id} />
      {role_id !== ROLE_ID.ADMIN && <SaveButton onClick={handleUpdateRole} />}
    </div>
  );
};
