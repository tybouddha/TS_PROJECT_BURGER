import { AdminTabEnum } from "@/enums/tab";

export type TabType = {
  index: AdminTabEnum;
  label: string;
  Icon?: JSX.Element;
  Content?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
