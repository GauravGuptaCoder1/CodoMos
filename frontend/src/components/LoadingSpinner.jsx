import React from 'react';
import { Box, Spinner, Center, Text, VStack } from '@chakra-ui/react';

export function FullPageSpinner() {
  return (
    <Center minH="100vh" bg="white" _dark={{ bg: 'gray.900' }}>
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text color="gray.600" _dark={{ color: 'gray.300' }}>
          Loading...
        </Text>
      </VStack>
    </Center>
  );
}

export function InlineSpinner() {
  return (
    <Spinner
      thickness="2px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="md"
    />
  );
}

export default FullPageSpinner;
