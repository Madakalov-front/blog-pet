import { ROLE_NAME } from "@/shared/constants";
import type { OptionType } from "@/shared/types";
import { getRoleName } from "@/shared/utils/getRoleName";
import { useState } from "react";
import type { SingleValue } from "react-select";
import Select from "react-select";

type SelectRoleType = {
  role_id: number;
  handleChange: (cur: number) => void;
};

export const SelectRole = ({ role_id, handleChange }: SelectRoleType) => {
  const options: OptionType[] = Object.entries(ROLE_NAME).map(([, role]) => ({
    value: role,
    label: role,
    role_id: getRoleName(role),
  }));
  const [selected, setSelected] = useState<OptionType | null>(options[role_id]);

  const handleOptions = (option: SingleValue<OptionType>) => {
    setSelected(option);
    if (option && option.role_id !== null) {
      handleChange(option.role_id);
    }
  };

  return (
    <Select
      options={options}
      value={selected}
      onChange={handleOptions}
      isSearchable={false}
      classNamePrefix="custom-select"
      className="react-select"
    />
  );
};
