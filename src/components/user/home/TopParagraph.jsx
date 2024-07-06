import React from 'react';
import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function TopParagraph({ header, sub, button1, button2 }) {
  // Find the index where "Muay Thai Mastery" starts
  const index = header.indexOf('Muay Thai Mastery');

  // Split the header into parts based on the found index
  const beforeText = header.slice(0, index);
  const afterText = header.slice(index + 'Muay Thai Mastery'.length);

  return (
    <VStack gap={6} px={{ base: 4, md: 20 }}>
      <Heading>
        {beforeText}
        <Text as="span" color="#B80000">
          {header.substr(index, 'Muay Thai Mastery'.length)}
        </Text>
        {afterText}
      </Heading>
      <Text textAlign='center'>{sub}</Text>
      <Flex justify="center" alignItems="center" gap={4}>
        <Button as={Link} borderRadius="42px" bg="#B80000" color="white" to='/lessons'>
          {button1}
        </Button>
        <Button as={Link} borderRadius="42px" to='/community'>{button2}</Button>
      </Flex>
    </VStack>
  );
}

export default TopParagraph;
