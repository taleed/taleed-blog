import { Flex, Spinner } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Flex justifyContent='center' alignItems='center' w='full' h='50vh' maxHeight='500px'>
      <Spinner size='xl' />
    </Flex>
  );
};

export default Loading;
