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
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    const getUnseenNotifications = async () => {
      if (!objectName) return;

      const { data, error } = await supabase
        .from("notification")
        .select("id, object_name")
        .eq("read", "false")
        .eq("object_name", objectName)
        .limit(2);

      if (error) return setSeen(true);

      setSeen(data.length === 0);
    };

    getUnseenNotifications();
  }, [objectName]);

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
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

        {!seen && <div className='sidebar-unseen-notification' />}

        {/* {notification && name == "الاشعارات" ? (
          <Tag size='sm' colorScheme='red' borderRadius='full' mr={3}>
            <TagLabel>{notification}</TagLabel>
          </Tag>
        ) : (
          <></>
        )} */}
      </Flex>
    </Link>
  );
};
export default NavItem;
