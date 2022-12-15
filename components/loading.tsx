import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex justifyContent='center' alignItems='center' w='full' h='50vh' maxHeight='500px'>
      <Spinner size='xl' />
    </Flex>
  );
}
