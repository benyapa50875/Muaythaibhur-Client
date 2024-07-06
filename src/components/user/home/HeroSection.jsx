import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

function HeroSection({
  hero_img,
  sub,
  header,
  icon1,
  list1,
  ld_1,
  icon2,
  list2,
  ld_2,
}) {
  return (
    <Flex direction={{ base: "column", md: "row" }} alignItems="center">
      {/* Hero Image */}
      <Image
        src={`/uploads/homepage/${hero_img}`}
        boxSize={{ base: "100%", md: "50%" }}
        objectFit="cover"
        rounded={{ base: "none", md: "lg" }}
        mb={{ base: 4, md: 0 }}
      />

      {/* Text Content */}
      <VStack ml={{ base: 0, md: 8 }} mt={{ base: 4, md: 0 }} alignItems="flex-start">
        <Text color="#B80000" fontWeight="bold" mb={4}>
          {sub}
        </Text>
        <Heading as="h2" size="xl" mb={4}>
          {header}
        </Heading>

        {/* First List */}
        <Flex align="center" mb={2}>
          <Image src={`/uploads/homepage/${icon1}`} boxSize="32px" mr={2} />
          <Text>{list1}</Text>
        </Flex>
        <Text ml={{ base: 0, md: 10 }} mb={4}>
          {ld_1}
        </Text>

        {/* Second List */}
        <Flex align="center">
          <Image src={`/uploads/homepage/${icon2}`} boxSize="32px" mr={2} />
          <Text>{list2}</Text>
        </Flex>
        <Text ml={{ base: 0, md: 10 }}>{ld_2}</Text>
      </VStack>
    </Flex>
  );
}

export default HeroSection;
