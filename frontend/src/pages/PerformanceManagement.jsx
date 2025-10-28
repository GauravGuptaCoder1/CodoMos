// frontend/src/pages/PerformanceManagement.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

export default function PerformanceManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReview, setSelectedReview] = useState(null);

  // Mock data for demonstration
  const performanceData = {
    currentQuarter: {
      selfAssessment: { completed: true, score: 4.2 },
      managerReview: { completed: false, dueDate: "2024-01-15" },
      peerReviews: { completed: 2, total: 3, avgScore: 4.0 },
      goals: { completed: 3, total: 5, progress: 60 },
    },
    reviews: [
      {
        id: 1,
        type: "Self Assessment",
        status: "Completed",
        score: 4.2,
        date: "2024-01-10",
        reviewer: "Self",
        color: "green",
      },
      {
        id: 2,
        type: "Manager Review",
        status: "Pending",
        score: null,
        date: "2024-01-15",
        reviewer: "John Smith",
        color: "yellow",
      },
      {
        id: 3,
        type: "Peer Review",
        status: "Completed",
        score: 4.0,
        date: "2024-01-08",
        reviewer: "Sarah Johnson",
        color: "green",
      },
    ],
    goals: [
      {
        id: 1,
        title: "Increase team productivity by 20%",
        type: "OKR",
        progress: 75,
        status: "On Track",
        dueDate: "2024-03-31",
        category: "Team Leadership",
      },
      {
        id: 2,
        title: "Complete advanced React certification",
        type: "KPI",
        progress: 100,
        status: "Completed",
        dueDate: "2024-01-15",
        category: "Learning & Development",
      },
      {
        id: 3,
        title: "Reduce bug reports by 30%",
        type: "OKR",
        progress: 45,
        status: "At Risk",
        dueDate: "2024-02-28",
        category: "Quality Improvement",
      },
    ],
    oneOnOnes: [
      {
        id: 1,
        date: "2024-01-20",
        time: "2:00 PM",
        manager: "John Smith",
        status: "Scheduled",
        notes: "Discuss Q1 goals and career development",
      },
      {
        id: 2,
        date: "2024-01-15",
        time: "10:00 AM",
        manager: "John Smith",
        status: "Completed",
        notes: "Performance review discussion - positive feedback on recent projects",
      },
    ],
    trends: {
      overallScore: 4.1,
      trend: "up",
      change: 0.3,
      categories: [
        { name: "Technical Skills", score: 4.5, trend: "up" },
        { name: "Communication", score: 3.8, trend: "up" },
        { name: "Leadership", score: 4.0, trend: "stable" },
        { name: "Problem Solving", score: 4.2, trend: "up" },
      ],
    },
  };

  const handleStartReview = (review) => {
    setSelectedReview(review);
    onOpen();
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➖";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Pending":
        return "yellow";
      case "At Risk":
        return "red";
      case "On Track":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="2xl" color="blue.900" mb={2}>
              Performance Management
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Track your performance, set goals, and manage reviews
            </Text>
          </Box>

          {/* Performance Overview Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Overall Score</StatLabel>
                  <StatNumber fontSize="2xl" color="blue.600">
                    {performanceData.trends.overallScore}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {performanceData.trends.change} from last quarter
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Goals Completed</StatLabel>
                  <StatNumber fontSize="2xl" color="green.600">
                    {performanceData.currentQuarter.goals.completed}/
                    {performanceData.currentQuarter.goals.total}
                  </StatNumber>
                  <StatHelpText>
                    <Progress
                      value={performanceData.currentQuarter.goals.progress}
                      colorScheme="green"
                      size="sm"
                      mt={2}
                    />
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Reviews Completed</StatLabel>
                  <StatNumber fontSize="2xl" color="purple.600">
                    {performanceData.reviews.filter((r) => r.status === "Completed").length}/
                    {performanceData.reviews.length}
                  </StatNumber>
                  <StatHelpText>This quarter</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Peer Reviews</StatLabel>
                  <StatNumber fontSize="2xl" color="orange.600">
                    {performanceData.currentQuarter.peerReviews.completed}/
                    {performanceData.currentQuarter.peerReviews.total}
                  </StatNumber>
                  <StatHelpText>
                    Avg Score: {performanceData.currentQuarter.peerReviews.avgScore}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Main Content Tabs */}
          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>Performance Reviews</Tab>
              <Tab>Goals & OKRs</Tab>
              <Tab>1:1 Meetings</Tab>
              <Tab>Analytics</Tab>
            </TabList>

            <TabPanels>
              {/* Performance Reviews Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="lg">Performance Reviews</Heading>
                    <Button colorScheme="blue" onClick={() => handleStartReview({ type: "Self Assessment" })}>
                      Start Self Assessment
                    </Button>
                  </HStack>

                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {performanceData.reviews.map((review) => (
                      <Card key={review.id} _hover={{ shadow: "lg" }}>
                        <CardHeader>
                          <HStack justify="space-between">
                            <Heading size="sm">{review.type}</Heading>
                            <Badge colorScheme={review.color}>{review.status}</Badge>
                          </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack align="stretch" spacing={3}>
                            <HStack justify="space-between">
                              <Text fontSize="sm" color="gray.600">
                                Reviewer: {review.reviewer}
                              </Text>
                              {review.score && (
                                <HStack>
                                  <Text>⭐</Text>
                                  <Text fontWeight="bold">{review.score}</Text>
                                </HStack>
                              )}
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              Due: {review.date}
                            </Text>
                            <Button
                              size="sm"
                              colorScheme={review.status === "Completed" ? "gray" : "blue"}
                              variant={review.status === "Completed" ? "outline" : "solid"}
                              onClick={() => handleStartReview(review)}
                            >
                              {review.status === "Completed" ? "View" : "Start"}
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>

              {/* Goals & OKRs Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="lg">Goals & OKRs</Heading>
                    <Button colorScheme="blue">Add New Goal</Button>
                  </HStack>

                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Goal</Th>
                        <Th>Type</Th>
                        <Th>Category</Th>
                        <Th>Progress</Th>
                        <Th>Status</Th>
                        <Th>Due Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {performanceData.goals.map((goal) => (
                        <Tr key={goal.id}>
                          <Td>
                            <Text fontWeight="medium">{goal.title}</Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="blue" variant="outline">
                              {goal.type}
                            </Badge>
                          </Td>
                          <Td>
                            <Text fontSize="sm" color="gray.600">
                              {goal.category}
                            </Text>
                          </Td>
                          <Td>
                            <VStack align="stretch" spacing={1}>
                              <Progress
                                value={goal.progress}
                                colorScheme={goal.progress === 100 ? "green" : "blue"}
                                size="sm"
                              />
                              <Text fontSize="sm" color="gray.600">
                                {goal.progress}%
                              </Text>
                            </VStack>
                          </Td>
                          <Td>
                            <Badge colorScheme={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                          </Td>
                          <Td>
                            <Text fontSize="sm" color="gray.600">
                              {goal.dueDate}
                            </Text>
                          </Td>
                          <Td>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
              </TabPanel>

              {/* 1:1 Meetings Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="lg">One-on-One Meetings</Heading>
                    <Button colorScheme="blue">Schedule Meeting</Button>
                  </HStack>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {performanceData.oneOnOnes.map((meeting) => (
                      <Card key={meeting.id}>
                        <CardHeader>
                          <HStack justify="space-between">
                            <Heading size="sm">1:1 with {meeting.manager}</Heading>
                            <Badge colorScheme={meeting.status === "Completed" ? "green" : "blue"}>
                              {meeting.status}
                            </Badge>
                          </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack align="stretch" spacing={3}>
                            <HStack>
                              <Text>📅</Text>
                              <Text fontSize="sm">
                                {meeting.date} at {meeting.time}
                              </Text>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {meeting.notes}
                            </Text>
                            <HStack>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                {meeting.status === "Completed" ? "View Notes" : "Join Meeting"}
                              </Button>
                              <Button size="sm" variant="ghost">
                                Reschedule
                              </Button>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>

              {/* Analytics Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Heading size="lg">Performance Analytics</Heading>

                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    <Card>
                      <CardHeader>
                        <Heading size="md">Performance Trends</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          {performanceData.trends.categories.map((category, index) => (
                            <Box key={index}>
                              <HStack justify="space-between" mb={2}>
                                <Text fontWeight="medium">{category.name}</Text>
                                <HStack>
                                  <Text fontWeight="bold">{category.score}</Text>
                                  <Text>{getTrendIcon(category.trend)}</Text>
                                </HStack>
                              </HStack>
                              <Progress
                                value={(category.score / 5) * 100}
                                colorScheme="blue"
                                size="sm"
                              />
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Heading size="md">Recent Achievements</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <Text fontSize="sm">
                              Completed React certification with 95% score
                            </Text>
                          </Alert>
                          <Alert status="info" borderRadius="md">
                            <AlertIcon />
                            <Text fontSize="sm">
                              Led team to 20% productivity increase
                            </Text>
                          </Alert>
                          <Alert status="warning" borderRadius="md">
                            <AlertIcon />
                            <Text fontSize="sm">
                              Received positive peer feedback (4.2/5)
                            </Text>
                          </Alert>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>

        {/* Review Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedReview?.type || "Performance Review"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={6} align="stretch">
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Text fontSize="sm">
                    This is a demo form. In a real application, this would connect to your backend.
                  </Text>
                </Alert>

                <FormControl>
                  <FormLabel>Overall Performance Rating</FormLabel>
                  <Select placeholder="Select rating">
                    <option value="1">1 - Needs Improvement</option>
                    <option value="2">2 - Below Expectations</option>
                    <option value="3">3 - Meets Expectations</option>
                    <option value="4">4 - Exceeds Expectations</option>
                    <option value="5">5 - Outstanding</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Strengths</FormLabel>
                  <Textarea placeholder="List your key strengths and achievements..." />
                </FormControl>

                <FormControl>
                  <FormLabel>Areas for Improvement</FormLabel>
                  <Textarea placeholder="Identify areas where you can grow and develop..." />
                </FormControl>

                <FormControl>
                  <FormLabel>Goals for Next Quarter</FormLabel>
                  <Textarea placeholder="What do you want to achieve in the next quarter?" />
                </FormControl>

                <HStack>
                  <Button colorScheme="blue">Save Draft</Button>
                  <Button colorScheme="green">Submit Review</Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}