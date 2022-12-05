import { FiBarChart, FiFilePlus, FiHome, FiUsers, FiBell} from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs"
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  href: string;
  icon: IconType;
  needAdminPermissions: boolean;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: "الرئيسية", href: "/", icon: FiHome, needAdminPermissions: false },
  {
    name: "احصائيات",
    href: "/dashboard/statistics",
    icon: FiBarChart,
    needAdminPermissions: true,
  },
  {
    name: "ادارة المقالات",
    href: "/dashboard/manage-blogs",
    icon: BsCardChecklist,
    needAdminPermissions: true,
  },
  {
    name: "إدارة المحررين",
    href: "/dashboard/editors",
    icon: FiUsers,
    needAdminPermissions: true,
  },
  {
    name: "اضف مقال جديد",
    href: "/dashboard/add-blog",
    icon: FiFilePlus,
    needAdminPermissions: false,
  },
  {
    name: "الاشعارات",
    href: "/dashboard/notifications",
    icon: FiBell,
    needAdminPermissions: false,
  },
];
