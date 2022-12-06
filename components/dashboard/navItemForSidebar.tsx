import { Flex, FlexProps, Icon, Tag, TagLabel } from "@chakra-ui/react";

import { IconType } from "react-icons";
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";

import { useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";


interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: string;
  children: ReactNode;
}
const NavItem = ({ href, icon, name, children, ...rest }: NavItemProps) => {
  const user = useUser()
  const [notification, setNotifications] = useState(0)

  useEffect(() => {
    if (name == "الاشعارات" && user?.id) {

      supabase.channel('*')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notification', filter: 'to=eq.'+user.id },
      async () => {
        await fetch('/api/notifications/get-notifications?count=true')
        .then((res) => res.json())
        .then(data => {
          setNotifications(data.count)
        })
      })
      .subscribe()
    }
  }, [setNotifications, user?.id])

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        px="8"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.secondary",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            ml="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}

        {(notification && name == "الاشعارات") ? (
          <Tag size='sm' colorScheme='red' borderRadius='full' mr={3}>
            <TagLabel>{notification}</TagLabel>
          </Tag>
        ) : <></>}
      </Flex>
    </Link>
  );
};
export default NavItem;
