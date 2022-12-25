import { Flex, FlexProps, Icon } from "@chakra-ui/react";

import Link from "next/link";
import { IconType } from "react-icons";
import { ReactNode, useEffect, useState } from "react";

import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: string;
  objectName?: string;
  children: ReactNode;
}
const NavItem = ({ href, icon, name, objectName, children, ...rest }: NavItemProps) => {
  const [read, setRead] = useState(true);

  const readNotifications = async () => {
    if (!objectName || read) return;

    // await supabase.rpc("read_notification", { obj_name: objectName });
    setRead(true);
  };

  useEffect(() => {
    const getUnreadNotifications = async () => {
      if (!objectName) return;

      const { data, error } = await supabase
        .from("notification")
        .select("id, object_name")
        .eq("read", "false")
        .eq("object_name", objectName)
        .limit(2);

      if (error) return setRead(true);

      setRead(data.length === 0);
    };

    getUnreadNotifications();
  }, [objectName]);

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        onClick={readNotifications}
        align='center'
        justifyContent='space-between'
        p='4'
        px='8'
        role='group'
        cursor='pointer'
        _hover={{
          bg: "brand.secondary",
          color: "white",
        }}
        {...rest}>
        <Flex alignItems='center'>
          {icon && (
            <Icon
              ml='4'
              fontSize='16'
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
        {/* notification sign */}
        {!read && <div className='sidebar-unseen-notification' />}
      </Flex>
    </Link>
  );
};
export default NavItem;
