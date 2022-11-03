import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Flex justifyContent="center" alignItems="center" w="full" h="calc(100vh - 80px)">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                />
        </Flex>
    )
}