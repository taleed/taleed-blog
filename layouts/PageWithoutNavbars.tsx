import { Box, Container } from "@chakra-ui/react";

import Footer from "@/components/footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minH="100vh"
        w="full"
        bg="url(/bglogo.png)"
      >
        <Container mt="24" mb="32" maxW="container.md">
          {children}
        </Container>
        <Box mt="auto">
          <Footer />
        </Box>
      </Box>
    </>
  );
}
