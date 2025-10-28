// frontend/src/pages/Landing.jsx
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  SimpleGrid,
  Icon,
  Image,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUsers, FaProjectDiagram, FaBrain } from "react-icons/fa";

export default function Landing() {
  return (
    <Box bg="white" minH="100vh">
      <Container maxW="container.xl" py={16}>
        {/* Hero Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center" mb={20}>
          {/* Hero left */}
          <VStack align="start" spacing={8}>
            <Heading 
              size="3xl" 
              lineHeight="shorter" 
              color="blue.900"
              fontWeight="bold"
            >
              Unified AI for People, Projects & Product
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="2xl"
              lineHeight="tall"
            >
              Streamline hiring, simulate product interviews, and manage projects with a single AI-powered
              interface. Built as a demo for the hackathon — fast to review, simple to extend.
            </Text>

            <HStack spacing={6} pt={4}>
              <Button 
                as={RouterLink} 
                to="/login" 
                colorScheme="blue" 
                size="lg"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="semibold"
                borderRadius="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl"
                }}
                transition="all 0.2s"
              >
                View Employee Demo
              </Button>
              <Button 
                as={RouterLink} 
                to="/login" 
                variant="ghost" 
                size="lg"
                fontSize="lg"
                fontWeight="semibold"
                color="gray.600"
                _hover={{
                  color: "blue.600",
                  bg: "blue.50"
                }}
              >
                Sign in
              </Button>
            </HStack>

            <HStack spacing={12} pt={8}>
              <Box>
                <Text fontWeight="bold" color="gray.800" mb={2}>Stack</Text>
                <Text fontSize="md" color="gray.600">FastAPI • React • Chakra UI • MongoDB</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="gray.800" mb={2}>Status</Text>
                <Text fontSize="md" color="gray.600">Demo-ready (no backend required for UI preview)</Text>
              </Box>
            </HStack>
          </VStack>

          {/* Hero right - illustration */}
          <Box>
            <Box
              bg="gray.100"
              borderRadius="xl"
              p={8}
              textAlign="center"
              minH="400px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px dashed"
              borderColor="gray.300"
            >
              <VStack spacing={4}>
                <Icon as={FaProjectDiagram} w={16} h={16} color="gray.400" />
                <Text color="gray.500" fontSize="lg" fontWeight="medium">
                  Dashboard Screenshot
                </Text>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>

        {/* Features Section */}
        <Box mt={24} mb={20}>
          <Heading 
            size="2xl" 
            mb={12} 
            textAlign="center"
            color="blue.900"
            fontWeight="bold"
          >
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

        {/* Call to Action Section */}
        <Box 
          bg="gray.50" 
          p={12} 
          borderRadius="2xl" 
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex align="center" direction={{ base: "column", md: "row" }} gap={8}>
            <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <Heading 
                size="xl" 
                color="blue.900"
                fontWeight="bold"
                mb={4}
              >
                Want to review quickly?
              </Heading>
              <Text 
                color="gray.600" 
                fontSize="lg"
                maxW="md"
              >
                Use the <strong>Employee Demo</strong> link to preview the UI without running the backend.
              </Text>
            </Box>
            <Button 
              as={RouterLink} 
              to="/login" 
              colorScheme="blue" 
              size="lg"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl"
              }}
              transition="all 0.2s"
            >
              Open demo
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

/* Feature Card component */
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
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        borderColor: "blue.200"
      }}
      transition="all 0.3s ease"
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
