export type OptionType = {
  value: string;
  label: string;
  role_id: number | null;
};

export type SelectType = {
  options: OptionType[];
  role_id: number;
  handleChange: (cur: number) => void;
};
