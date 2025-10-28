import React, { useEffect, useState } from 'react'
import { 
  Box, Container, Heading, SimpleGrid, Spinner, useToast, Button, Card, CardBody, 
  CardHeader, Text, Badge, VStack, Flex, Stat, StatLabel, StatNumber, StatHelpText, 
  StatArrow, Progress, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, 
  Tr, Th, Td, Alert, AlertIcon, Divider
} from '@chakra-ui/react'
import api from '../api/client'
import { Link } from 'react-router-dom'

function ProjectCard({ project, repoCount }) {
  return (
    <Card as={Link} to={`/projects/${project.id}`} _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }} transition="all 0.2s">
      <CardBody>
        <VStack align="start" spacing={3}>
          <Flex w="full" justify="space-between" align="center">
            <Heading size="md">{project.name}</Heading>
            <Badge colorScheme={project.status === 'active' ? 'green' : 'gray'}>{project.status}</Badge>
          </Flex>
          <Text fontSize="sm" color="gray.600">{repoCount} {repoCount === 1 ? 'repository' : 'repositories'} linked</Text>
          <Text fontSize="xs" color="gray.500">Click to manage repos, team & settings</Text>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [repos, setRepos] = useState([])
  const toast = useToast()

  // Handler functions for Performance Management actions
  const handleAction = (action) => {
    toast({
      title: `${action} Opened`,
      description: `This will open the ${action} interface. Feature coming soon!`,
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  // Mock performance data (can be replaced with real API calls)
  const performanceData = {
    trends: { overallScore: 4.1, change: 0.3 },
    currentQuarter: {
      goals: { completed: 3, total: 5, progress: 60 },
      peerReviews: { completed: 2, total: 3, avgScore: 4.0 }
    },
    reviews: [
      { id: 1, type: "Self Assessment", status: "Completed", score: 4.2, date: "2024-01-10", reviewer: "Self", color: "green" },
      { id: 2, type: "Manager Review", status: "Pending", score: null, date: "2024-01-15", reviewer: "Manager", color: "yellow" },
      { id: 3, type: "Peer Review", status: "Completed", score: 4.0, date: "2024-01-08", reviewer: "Sarah J.", color: "green" }
    ],
    goals: [
      { id: 1, title: "Increase team productivity by 20%", type: "OKR", progress: 75, status: "On Track", dueDate: "2024-03-31", category: "Team Leadership" },
      { id: 2, title: "Complete advanced React certification", type: "KPI", progress: 100, status: "Completed", dueDate: "2024-01-15", category: "Learning" },
      { id: 3, title: "Reduce bug reports by 30%", type: "OKR", progress: 45, status: "At Risk", dueDate: "2024-02-28", category: "Quality" }
    ],
    oneOnOnes: [
      { id: 1, date: "2024-01-20", time: "2:00 PM", with: "Manager - John Doe", status: "Scheduled", actionItems: 3 },
      { id: 2, date: "2024-01-13", time: "10:00 AM", with: "Manager - John Doe", status: "Completed", actionItems: 5, notes: "Discussed Q1 goals and career development" },
      { id: 3, date: "2024-01-06", time: "3:00 PM", with: "Direct Report - Alice", status: "Completed", actionItems: 2, notes: "Performance feedback and project updates" }
    ],
    pips: [
      { id: 1, employee: "Bob Smith", startDate: "2023-12-01", endDate: "2024-02-29", status: "In Progress", progress: 60, areas: "Code Quality, Communication" },
      { id: 2, employee: "Carol Johnson", startDate: "2023-11-15", endDate: "2024-01-15", status: "Completed", progress: 100, areas: "Time Management" }
    ],
    reviewCycles: [
      { id: 1, name: "Q4 2023 Annual Review", type: "Annual", startDate: "2023-12-01", endDate: "2023-12-31", status: "Completed", participation: 95 },
      { id: 2, name: "Q1 2024 Quarterly Review", type: "Quarterly", startDate: "2024-01-01", endDate: "2024-01-31", status: "In Progress", participation: 67 },
      { id: 3, name: "Mid-Year Review 2024", type: "Semi-Annual", startDate: "2024-06-01", endDate: "2024-06-30", status: "Scheduled", participation: 0 }
    ]
  }

  useEffect(() => {
    async function load() {
      try {
        const [proj, reposData] = await Promise.all([
          api.get('/projects/'),
          api.get('/projects/repos'),
        ])
        setProjects(proj.data || [])
        setRepos(reposData.data || [])
      } catch (err) {
        toast({ title: 'Failed to load dashboard', status: 'error' })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [toast])

  const getRepoCount = (projectId) => {
    return repos.filter(r => (r.project_ids || []).includes(projectId)).length
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "green"
      case "Pending": return "yellow"
      case "At Risk": return "red"
      case "On Track": return "blue"
      case "In Progress": return "blue"
      case "Scheduled": return "gray"
      default: return "gray"
    }
  }


  if (loading) return (
    <Container maxW="6xl" py={8}><Spinner /></Container>
  )

  const activeProjects = projects.filter(p => p.status === 'active')

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="6xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="2xl" color="blue.900" mb={2}>Dashboard</Heading>
            <Text fontSize="lg" color="gray.600">Your projects, performance, and goals at a glance</Text>
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
                    {performanceData.currentQuarter.goals.completed}/{performanceData.currentQuarter.goals.total}
                  </StatNumber>
                  <StatHelpText>
                    <Progress value={performanceData.currentQuarter.goals.progress} colorScheme="green" size="sm" mt={2} />
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Reviews Completed</StatLabel>
                  <StatNumber fontSize="2xl" color="purple.600">
                    {performanceData.reviews.filter(r => r.status === "Completed").length}/{performanceData.reviews.length}
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
                    {performanceData.currentQuarter.peerReviews.completed}/{performanceData.currentQuarter.peerReviews.total}
                  </StatNumber>
                  <StatHelpText>Avg Score: {performanceData.currentQuarter.peerReviews.avgScore}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Main Content Tabs */}
          <Tabs colorScheme="blue">
            <TabList>
              <Tab>Projects</Tab>
              <Tab>Reviews</Tab>
              <Tab>Goals & OKRs</Tab>
              <Tab>Performance Management 📈</Tab>
            </TabList>

            <TabPanels>
              {/* Projects Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Heading size="lg">Active Projects</Heading>
                    <Button as={Link} to="/projects/new" colorScheme="blue">+ New Project</Button>
                  </Flex>

                  {activeProjects.length === 0 && (
                    <Card bg="blue.50" border="1px" borderColor="blue.200">
                      <CardBody>
                        <VStack spacing={3}>
                          <Text fontSize="lg" fontWeight="medium">No active projects yet</Text>
                          <Text fontSize="sm" color="gray.600">Create your first project to start tracking repos, PRs, and team XP.</Text>
                          <Button as={Link} to="/projects/new" colorScheme="blue" size="sm">Create Project</Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  )}

                  {activeProjects.length > 0 && (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {activeProjects.map(proj => (
                        <ProjectCard key={proj.id} project={proj} repoCount={getRepoCount(proj.id)} />
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              </TabPanel>

              {/* Reviews Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Heading size="lg">Performance Reviews</Heading>
                    <Button colorScheme="blue" onClick={() => handleAction('Start Self Assessment')}>Start Self Assessment</Button>
                  </Flex>

                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {performanceData.reviews.map((review) => (
                      <Card key={review.id} _hover={{ shadow: "lg" }}>
                        <CardHeader>
                          <Flex justify="space-between" align="center">
                            <Heading size="sm">{review.type}</Heading>
                            <Badge colorScheme={review.color}>{review.status}</Badge>
                          </Flex>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack align="stretch" spacing={3}>
                            <Flex justify="space-between">
                              <Text fontSize="sm" color="gray.600">Reviewer: {review.reviewer}</Text>
                              {review.score && (
                                <Flex align="center" gap={1}>
                                  <Text>⭐</Text>
                                  <Text fontWeight="bold">{review.score}</Text>
                                </Flex>
                              )}
                            </Flex>
                            <Text fontSize="sm" color="gray.600">Due: {review.date}</Text>
                            <Button size="sm" colorScheme={review.status === "Completed" ? "gray" : "blue"} variant={review.status === "Completed" ? "outline" : "solid"} onClick={() => handleAction(`${review.status === "Completed" ? "View" : "Start"} ${review.type}`)}>
                              {review.status === "Completed" ? "View" : "Start"}
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>

              {/* Goals Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Heading size="lg">Goals & OKRs</Heading>
                    <Button colorScheme="blue" onClick={() => handleAction('Add New Goal')}>Add New Goal</Button>
                  </Flex>

                  <Table variant="simple" bg="white" rounded="md">
                    <Thead>
                      <Tr>
                        <Th>Goal</Th>
                        <Th>Type</Th>
                        <Th>Category</Th>
                        <Th>Progress</Th>
                        <Th>Status</Th>
                        <Th>Due Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {performanceData.goals.map((goal) => (
                        <Tr key={goal.id}>
                          <Td><Text fontWeight="medium">{goal.title}</Text></Td>
                          <Td><Badge colorScheme="blue" variant="outline">{goal.type}</Badge></Td>
                          <Td><Text fontSize="sm" color="gray.600">{goal.category}</Text></Td>
                          <Td>
                            <VStack align="stretch" spacing={1}>
                              <Progress value={goal.progress} colorScheme={goal.progress === 100 ? "green" : "blue"} size="sm" />
                              <Text fontSize="sm" color="gray.600">{goal.progress}%</Text>
                            </VStack>
                          </Td>
                          <Td><Badge colorScheme={getStatusColor(goal.status)}>{goal.status}</Badge></Td>
                          <Td><Text fontSize="sm" color="gray.600">{goal.dueDate}</Text></Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
              </TabPanel>

              {/* Performance Management Tab */}
              <TabPanel px={0}>
                <VStack spacing={8} align="stretch">
                  {/* Header with Priority Badge */}
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Heading size="lg">Performance Management 📈</Heading>
                      <Flex gap={2} mt={2} align="center">
                        <Badge colorScheme="orange" fontSize="sm">MEDIUM-HIGH Priority</Badge>
                        <Text fontSize="sm" color="gray.600">Comprehensive performance tracking and development</Text>
                      </Flex>
                    </Box>
                  </Flex>

                  {/* 360-Degree Feedback System */}
                  <Card>
                    <CardHeader>
                      <Heading size="md">360-Degree Feedback System</Heading>
                    </CardHeader>
                    <CardBody>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={4}>
                        <Button colorScheme="blue" size="sm" onClick={() => handleAction('Self-Assessment Form')}>Self-Assessment Form</Button>
                        <Button colorScheme="purple" size="sm" onClick={() => handleAction('Manager Review')}>Manager Review</Button>
                        <Button colorScheme="green" size="sm" onClick={() => handleAction('Peer Review')}>Peer Review</Button>
                        <Button colorScheme="orange" size="sm" onClick={() => handleAction('360° Dashboard')}>360° Dashboard</Button>
                      </SimpleGrid>
                      <Alert status="info" mt={4}>
                        <AlertIcon />
                        Complete all 360-degree assessments for comprehensive feedback
                      </Alert>
                    </CardBody>
                  </Card>

                  {/* Review Cycles and Scheduling */}
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">Review Cycles & Scheduling</Heading>
                        <Button colorScheme="blue" size="sm" onClick={() => handleAction('Create New Cycle')}>Create New Cycle</Button>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Review Cycle</Th>
                            <Th>Type</Th>
                            <Th>Period</Th>
                            <Th>Status</Th>
                            <Th>Participation</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {performanceData.reviewCycles.map((cycle) => (
                            <Tr key={cycle.id}>
                              <Td><Text fontWeight="medium">{cycle.name}</Text></Td>
                              <Td><Badge variant="outline">{cycle.type}</Badge></Td>
                              <Td><Text fontSize="sm">{cycle.startDate} - {cycle.endDate}</Text></Td>
                              <Td><Badge colorScheme={getStatusColor(cycle.status)}>{cycle.status}</Badge></Td>
                              <Td>
                                <Progress value={cycle.participation} size="sm" colorScheme={cycle.participation > 75 ? "green" : "orange"} />
                                <Text fontSize="xs" mt={1}>{cycle.participation}%</Text>
                              </Td>
                              <Td><Button size="xs" colorScheme="blue" onClick={() => handleAction(`Manage ${cycle.name}`)}>Manage</Button></Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </CardBody>
                  </Card>

                  {/* Performance Trend Analytics */}
                  <Card>
                    <CardHeader>
                      <Heading size="md">Performance Trend Analytics</Heading>
                    </CardHeader>
                    <CardBody>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        <Stat>
                          <StatLabel>Avg Performance Score</StatLabel>
                          <StatNumber color="blue.600">4.1/5.0</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            7.5% vs last quarter
                          </StatHelpText>
                        </Stat>
                        <Stat>
                          <StatLabel>Goal Completion Rate</StatLabel>
                          <StatNumber color="green.600">85%</StatNumber>
                          <StatHelpText>
                            <StatArrow type="increase" />
                            12% improvement
                          </StatHelpText>
                        </Stat>
                        <Stat>
                          <StatLabel>Reviews Completed</StatLabel>
                          <StatNumber color="purple.600">24/30</StatNumber>
                          <StatHelpText>80% completion rate</StatHelpText>
                        </Stat>
                      </SimpleGrid>
                      <Divider my={4} />
                      <Button colorScheme="blue" size="sm" variant="outline" width="full" onClick={() => handleAction('Detailed Analytics')}>
                        View Detailed Analytics →
                      </Button>
                    </CardBody>
                  </Card>

                  {/* One-on-One Meetings */}
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">One-on-One Meetings</Heading>
                        <Button colorScheme="blue" size="sm" onClick={() => handleAction('Schedule 1:1 Meeting')}>Schedule 1:1</Button>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        {performanceData.oneOnOnes.map((meeting) => (
                          <Card key={meeting.id} variant="outline" _hover={{ shadow: "md" }}>
                            <CardBody>
                              <Flex justify="space-between" align="start">
                                <VStack align="start" spacing={2} flex={1}>
                                  <Flex gap={2} align="center">
                                    <Badge colorScheme={meeting.status === "Completed" ? "green" : "blue"}>
                                      {meeting.status}
                                    </Badge>
                                    <Text fontWeight="medium">{meeting.with}</Text>
                                  </Flex>
                                  <Text fontSize="sm" color="gray.600">
                                    📅 {meeting.date} at {meeting.time}
                                  </Text>
                                  <Text fontSize="sm">
                                    ✓ {meeting.actionItems} Action Items
                                  </Text>
                                  {meeting.notes && (
                                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                      📝 {meeting.notes}
                                    </Text>
                                  )}
                                </VStack>
                                <VStack spacing={2}>
                                  <Button size="xs" colorScheme="blue" onClick={() => handleAction(`${meeting.status === "Completed" ? "View Notes" : "Join Meeting"} - ${meeting.with}`)}>
                                    {meeting.status === "Completed" ? "View Notes" : "Join"}
                                  </Button>
                                  <Button size="xs" variant="outline" onClick={() => handleAction(`Action Items - ${meeting.with}`)}>
                                    Action Items
                                  </Button>
                                </VStack>
                              </Flex>
                            </CardBody>
                          </Card>
                        ))}
                        <Button variant="link" colorScheme="blue" size="sm" onClick={() => handleAction('View All Meeting History')}>
                          View All Meeting History →
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Meeting Templates */}
                  <Card>
                    <CardHeader>
                      <Heading size="md">Meeting Templates</Heading>
                    </CardHeader>
                    <CardBody>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        <Card variant="outline" _hover={{ borderColor: "blue.500", shadow: "md" }} cursor="pointer" onClick={() => handleAction('Weekly Check-in Template')}>
                          <CardBody>
                            <Text fontWeight="medium" mb={2}>📋 Weekly Check-in</Text>
                            <Text fontSize="sm" color="gray.600">Standard weekly 1:1 template with agenda</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline" _hover={{ borderColor: "blue.500", shadow: "md" }} cursor="pointer" onClick={() => handleAction('Performance Review Template')}>
                          <CardBody>
                            <Text fontWeight="medium" mb={2}>🎯 Performance Review</Text>
                            <Text fontSize="sm" color="gray.600">Structured quarterly/annual review template</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline" _hover={{ borderColor: "blue.500", shadow: "md" }} cursor="pointer" onClick={() => handleAction('Career Development Template')}>
                          <CardBody>
                            <Text fontWeight="medium" mb={2}>🚀 Career Development</Text>
                            <Text fontSize="sm" color="gray.600">Focus on growth and career planning</Text>
                          </CardBody>
                        </Card>
                      </SimpleGrid>
                    </CardBody>
                  </Card>

                  {/* Performance Improvement Plans (PIPs) */}
                  <Card>
                    <CardHeader>
                      <Flex justify="space-between" align="center">
                        <Heading size="md">Performance Improvement Plans (PIPs)</Heading>
                        <Button colorScheme="orange" size="sm" onClick={() => handleAction('Create Performance Improvement Plan')}>Create PIP</Button>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      {performanceData.pips.length > 0 ? (
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Employee</Th>
                              <Th>Focus Areas</Th>
                              <Th>Start Date</Th>
                              <Th>End Date</Th>
                              <Th>Progress</Th>
                              <Th>Status</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {performanceData.pips.map((pip) => (
                              <Tr key={pip.id}>
                                <Td><Text fontWeight="medium">{pip.employee}</Text></Td>
                                <Td><Text fontSize="sm">{pip.areas}</Text></Td>
                                <Td><Text fontSize="sm">{pip.startDate}</Text></Td>
                                <Td><Text fontSize="sm">{pip.endDate}</Text></Td>
                                <Td>
                                  <VStack align="stretch" spacing={1}>
                                    <Progress value={pip.progress} size="sm" colorScheme={pip.progress === 100 ? "green" : "orange"} />
                                    <Text fontSize="xs">{pip.progress}%</Text>
                                  </VStack>
                                </Td>
                                <Td><Badge colorScheme={pip.status === "Completed" ? "green" : "orange"}>{pip.status}</Badge></Td>
                                <Td><Button size="xs" colorScheme="blue" onClick={() => handleAction(`Review PIP - ${pip.employee}`)}>Review</Button></Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Alert status="success">
                          <AlertIcon />
                          No active PIPs - All team members are meeting expectations
                        </Alert>
                      )}
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  )
}
