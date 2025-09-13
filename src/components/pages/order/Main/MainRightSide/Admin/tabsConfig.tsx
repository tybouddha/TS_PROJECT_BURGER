import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import EditForm from "./AdminPanel/EditForm/EditForm";
import HintMessage from "./AdminPanel/EditForm/HintMessage";
import AddForm from "./AdminPanel/AddForm/AddForm";
import { AdminTabEnum } from "@/enums/tab";
import { TabType } from "@/types/Tab";

export const getTabsConfig = (hasAlreadyBeenClicked?: boolean): TabType[] => [
  {
    index: AdminTabEnum.ADD,
    label: "Ajouter un produit",
    Icon: <AiOutlinePlus />,
    Content: <AddForm />,
  },
  {
    index: AdminTabEnum.EDIT,
    label: "Modifier un produit",
    Icon: <MdModeEditOutline />,
    Content: hasAlreadyBeenClicked ? <EditForm /> : <HintMessage />,
  },
];

export const getTabSelected = (
  tabs: TabType[],
  currentTabSelected: AdminTabEnum
) => {
  return tabs.find((tab) => tab.index === currentTabSelected);
};
