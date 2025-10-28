// Test landing page without icons
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function TestLanding() {
  return (
    <Box bg="white" minH="100vh">
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading size="3xl" color="blue.900" mb={4}>
              Test Landing Page
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              This is a test to see if the basic setup works without icons.
            </Text>
          </Box>

          {/* CTA Buttons */}
          <HStack spacing={6} justify="center">
            <Button 
              colorScheme="blue" 
              size="lg"
              px={8}
              py={6}
            >
              Test Button 1
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
            >
              Test Button 2
            </Button>
          </HStack>

          {/* Features */}
          <Box mt={16}>
            <Heading size="2xl" textAlign="center" mb={12} color="blue.900">
              Test Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <TestCard
                title="Feature 1"
                desc="This is a test feature card without icons."
              />
              <TestCard
                title="Feature 2"
                desc="This is another test feature card."
              />
              <TestCard
                title="Feature 3"
                desc="This is the third test feature card."
              />
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

function TestCard({ title, desc }) {
  return (
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
      textAlign="center"
    >
      <Heading 
        size="lg" 
        color="blue.900"
        fontWeight="bold"
        mb={4}
      >
        {title}
      </Heading>
      <Text 
        fontSize="md" 
        color="gray.600"
        lineHeight="tall"
      >
        {desc}
      </Text>
    </Box>
  );
}
