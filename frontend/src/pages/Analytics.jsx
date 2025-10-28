import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  VStack,
  Select,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months')
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  // Mock data for performance trends
  const performanceTrend = [
    { month: 'Jan', score: 3.8, goals: 75, reviews: 85 },
    { month: 'Feb', score: 4.0, goals: 80, reviews: 88 },
    { month: 'Mar', score: 4.1, goals: 82, reviews: 90 },
    { month: 'Apr', score: 3.9, goals: 78, reviews: 87 },
    { month: 'May', score: 4.2, goals: 85, reviews: 92 },
    { month: 'Jun', score: 4.3, goals: 88, reviews: 94 },
  ]

  // Goal completion by category
  const goalsByCategory = [
    { name: 'Technical', value: 45, color: '#3182CE' },
    { name: 'Leadership', value: 30, color: '#805AD5' },
    { name: 'Learning', value: 15, color: '#DD6B20' },
    { name: 'Team', value: 10, color: '#38A169' },
  ]

  // Team performance comparison
  const teamComparison = [
    { name: 'You', performance: 4.3, goals: 88, reviews: 94, collaboration: 90 },
    { name: 'Team Avg', performance: 3.9, goals: 75, reviews: 80, collaboration: 82 },
  ]

  // Review scores breakdown
  const reviewScores = [
    { category: 'Technical Skills', score: 4.5 },
    { category: 'Communication', score: 4.2 },
    { category: 'Teamwork', score: 4.4 },
    { category: 'Leadership', score: 3.9 },
    { category: 'Innovation', score: 4.1 },
    { category: 'Problem Solving', score: 4.3 },
  ]

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="7xl" py={8}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="2xl" mb={2}>Performance Analytics</Heading>
            <Text color={textColor}>Comprehensive insights into your performance and growth</Text>
          </Box>

          {/* Time Range Selector */}
          <Box>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              maxW="200px"
              bg={bgColor}
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
              <option value="all">All Time</option>
            </Select>
          </Box>

          {/* Key Metrics */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Overall Score</StatLabel>
                  <StatNumber fontSize="3xl" color="blue.500">4.3</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12% from last period
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Goals Completed</StatLabel>
                  <StatNumber fontSize="3xl" color="green.500">88%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    8% improvement
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Review Average</StatLabel>
                  <StatNumber fontSize="3xl" color="purple.500">4.2</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    0.3 points up
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Team Rank</StatLabel>
                  <StatNumber fontSize="3xl" color="orange.500">#3</StatNumber>
                  <StatHelpText>Top 10%</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Performance Trend Chart */}
          <Card bg={bgColor}>
            <CardHeader>
              <Heading size="md">Performance Trend</Heading>
              <Text fontSize="sm" color={textColor}>Your performance scores over time</Text>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3182CE" strokeWidth={3} name="Performance Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Goals Progress */}
            <Card bg={bgColor}>
              <CardHeader>
                <Heading size="md">Goals & Reviews Progress</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="goals" fill="#48BB78" name="Goals %" />
                    <Bar dataKey="reviews" fill="#805AD5" name="Reviews %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Goals by Category */}
            <Card bg={bgColor}>
              <CardHeader>
                <Heading size="md">Goals by Category</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={goalsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {goalsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Skills Radar Chart */}
            <Card bg={bgColor}>
              <CardHeader>
                <Heading size="md">Skills Assessment</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={reviewScores}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 5]} />
                    <Radar name="Your Score" dataKey="score" stroke="#3182CE" fill="#3182CE" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Team Comparison */}
            <Card bg={bgColor}>
              <CardHeader>
                <Heading size="md">Team Comparison</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={reviewScores.map((item, idx) => ({
                    category: item.category,
                    you: item.score,
                    teamAvg: item.score - 0.3 - (Math.random() * 0.4)
                  }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 5]} />
                    <Radar name="You" dataKey="you" stroke="#3182CE" fill="#3182CE" fillOpacity={0.6} />
                    <Radar name="Team Average" dataKey="teamAvg" stroke="#805AD5" fill="#805AD5" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
