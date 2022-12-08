import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import Head from 'next/head';
import Layout from "@/layouts/Default";
import { ReactElement } from "react";

function About () {
  const purpleTitles = useColorModeValue("brand.primary","brand.secondary")
  return (
    <>
      <Head>
        <title>تليد - سياسة الخصوصية</title>
      </Head>
      <Container my="50px" maxW="container.xl">
        <Box>
          <Heading fontSize="3xl" color={purpleTitles}>
            سياسة الخصوصية
          </Heading>
          <Text my="30px" fontSize="xl">
            هذا الموقع تملكه وتديره مبادرة تليد الثقافية ، يرجى الإطلاع بشكل
            دقيق على الأحكام والشروط أدناه .
          </Text>
          <Heading fontSize="2xl">1. المستخدم</Heading>
          <Text my="20px" fontSize="xl" lineHeight={1.8}>
            باستخدامك أو زيارتك لهذا الموقع فإنك تقر وتوافق على هذه الشروط التي
            يضعها فريق تليد على موقعه. ودخولك إليه ومشاركتك أو تحميل المواد من
            الموقع يشير إلى موافقتك على الالتزام بتلك الشروط وإذا لم توافق على
            أي من هذه الشروط فيرجى التوقف عن استخدام الموقع فورا
          </Text>
          <Heading fontSize="2xl">2. شروط الاستخدام</Heading>
          <Text my="20px" fontSize="xl" lineHeight={1.8}>
            يسمح باستخدام هذا الموقع لأغراض مشروعة وبطريقة لا تنتهك القانون أو
            أي من الحقوق أو القيود المفروضة على استخدام هذا الموقع من قبل طرف
            ثالث. وتشمل هذه القيود التحرش وتشويه السمعة واستخدام اللغة البذيئة
            والعدوانية بحق طرف ثالث، وأي تصرف آخر قد يعتبر غير ملائم. وبموجب ذلك
            تتعهد هنا بأن عمرك يزيد عن 18 عام ، أو تملك جميع الموافقات
            والإجراءات القانونية لاستخدام هذا الموقع، وتتعهد بأن تلتزم بكافة
            الشروط ، كما تتعهد بأنك قادر على الاطلاع على تلك الشروط والأحكام
            والالتزام بها.
          </Text>
          <Heading fontSize="2xl">3. مواقع وروابط الطرف الثالث</Heading>
          <Text my="20px" fontSize="xl" lineHeight={1.8}>
            موقع تليد ليس مسؤول عن وجود أو محتوى مواد منشورة في مواقع الطرف
            الثالث أو مواد تلج إليها من خلال هذا الموقع. فإذا قررت زيارة أي موقع
            عبر رابطه، فإنك تتحمل مخاطر ومسؤولية اتخاذ جميع الإجراءات الحمائية
            ضد الفيروسات أو المحتوى الرديئ أو مواد أخرى الأخرى. موقع تليد لا
            يعتمد ولا يتحمل مسؤولية أي محتوى أو إعلان أو منتجات أو خدمات أو
            معلومات متوفرة من قبل مواقع طرف ثالث أو مواد (تتضمن دفع ثمن وتوصيل
            مثل تلك المنتجات أو الخدمة معينة )
          </Text>
        </Box>
      </Container>
    </>
  );
}
About.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default About;
