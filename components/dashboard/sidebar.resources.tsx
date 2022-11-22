import { FiBarChart, FiFilePlus, FiHome, FiUsers } from "react-icons/fi";

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
];
