import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="full"
      h="calc(100vh - 80px)"
    >
      <Spinner size="xl" />
    </Flex>
  );
}
