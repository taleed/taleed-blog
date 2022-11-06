import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

import Layout from "@/layouts/Default";
import { ReactElement } from "react";

function About() {
  return (
    <Container my="50px" maxW="container.xl">
      <Box>
        <Heading color="brand.primary" fontSize="3xl">
          من نحن
        </Heading>
        <Text my="30px" fontSize="xl">
          هذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
          أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماج
          الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
          أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا هذا
          الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
          أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا
          أدناه .
        </Text>
        <Text my="30px" fontSize="xl">
          هذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
          أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا
          أليكيو هذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
          يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
          ماجنا هذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
          يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
          ماجنا أدناه .
        </Text>
        <Text my="30px" fontSize="xl">
          هذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
          أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا
          أليكيوهذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
          يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
          ماجنا هذا الموقع تملكه وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
          يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
          ماجنا أدناه .
        </Text>
      </Box>
    </Container>
  );
}
About.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default About;
