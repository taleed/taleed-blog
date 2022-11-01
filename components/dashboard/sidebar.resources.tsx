import {
    FiFilePlus,
    FiFileText,
    FiHome,
} from 'react-icons/fi';

import { IconType } from 'react-icons';

interface LinkItemProps {
    name: string;
    href: string;
    icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
    { name: 'الرئيسية', href: "/", icon: FiHome },
    { name: 'مقالاتي', href: "/dashboard", icon: FiFileText },
    { name: 'اضف مقالة', href: "/dashboard/addblog", icon: FiFilePlus },
];