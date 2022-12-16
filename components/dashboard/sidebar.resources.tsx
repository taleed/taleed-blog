import { FiBarChart, FiFilePlus, FiHome, FiUsers, FiBell, FiMessageSquare } from "react-icons/fi";
import { BsCardChecklist, BsFillHandbagFill } from "react-icons/bs";
import { IconType } from "react-icons";
import { icons } from "react-icons/lib";

interface LinkItemProps {
  name: string;
  href: string;
  icon: IconType;
  needAdminPermissions: boolean;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: "الرئيسية", href: "/", icon: FiHome, needAdminPermissions: false },
  {
    name: "إحصائيات",
    href: "/dashboard/statistics",
    icon: FiBarChart,
    needAdminPermissions: true,
  },
  {
    name: "إدارة المقالات",
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
    name: "أضف مقال جديد",
    href: "/dashboard/add-blog",
    icon: FiFilePlus,
    needAdminPermissions: false,
  },
  {
    name: "الإشعارات",
    href: "/dashboard/notifications",
    icon: FiBell,
    needAdminPermissions: false,
  },
  {
    name: "الرسائل",
    href: "/dashboard/messages",
    icon: FiMessageSquare,
    needAdminPermissions: true,
  },
  {
    name: "الشركاء",
    href: "/dashboard/partners",
    icon: BsFillHandbagFill,
    needAdminPermissions: true,
  },
];
