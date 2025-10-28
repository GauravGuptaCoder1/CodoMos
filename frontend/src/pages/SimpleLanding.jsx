// Simplified landing page for testing
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
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUsers, FaProjectDiagram, FaBrain } from "react-icons/fa";

export default function SimpleLanding() {
  return (
    <Box bg="white" minH="100vh">
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading size="3xl" color="blue.900" mb={4}>
              Unified AI for People, Projects & Product
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              Streamline hiring, simulate product interviews, and manage projects with a single AI-powered
              interface. Built as a demo for the hackathon — fast to review, simple to extend.
            </Text>
          </Box>

          {/* CTA Buttons */}
          <HStack spacing={6} justify="center">
            <Button 
              as={RouterLink} 
              to="/login" 
              colorScheme="blue" 
              size="lg"
              px={8}
              py={6}
            >
              View Employee Demo
            </Button>
            <Button 
              as={RouterLink} 
              to="/login" 
              variant="ghost" 
              size="lg"
            >
              Sign in
            </Button>
          </HStack>

          {/* Features */}
          <Box mt={16}>
            <Heading size="2xl" textAlign="center" mb={12} color="blue.900">
              What it does
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <FeatureCard
                icon={FaUsers}
                title="People & Hiring"
                desc="Auto-screen resumes, match candidates to roles, and save interviewer notes."
              />
              <FeatureCard
                icon={FaProjectDiagram}
                title="Project Management"
                desc="AI-assisted team building, task assignment and risk prediction."
              />
              <FeatureCard
                icon={FaBrain}
                title="Product Intelligence"
                desc="Simulate thousands of user interviews and connect market signals to product decisions."
              />
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

function FeatureCard({ icon: IconCmp, title, desc }) {
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
      <Icon 
        as={IconCmp} 
        w={12} 
        h={12} 
        color="blue.500" 
        mb={6}
      />
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
