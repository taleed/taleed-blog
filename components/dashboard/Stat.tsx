import { Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";

interface StatsCardProps {
  title: string;
  stat: number;
}
export default function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      bg={useColorModeValue("white", "whiteAlpha.50")}
      px={{ base: 4, md: 8 }}
      py='5'
      shadow='xl'
      border='1px solid'
      borderColor={useColorModeValue("gray.500", "whiteAlpha.100")}
      rounded='lg'>
      <StatLabel mb={2} fontWeight={"medium"}>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}
