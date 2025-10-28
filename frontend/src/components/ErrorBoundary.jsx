import React from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxW="2xl" py={20}>
          <Box textAlign="center">
            <VStack spacing={6}>
              <Heading size="2xl" color="red.500">😕 Oops!</Heading>
              <Heading size="lg">Something went wrong</Heading>
              <Text color="gray.600">
                We're sorry for the inconvenience. The error has been logged and we'll fix it soon.
              </Text>
              <Text fontSize="sm" color="gray.500" fontFamily="mono" bg="gray.100" p={4} borderRadius="md" maxW="full" overflowX="auto">
                {this.state.error?.message || 'Unknown error'}
              </Text>
              <Button 
                colorScheme="blue" 
                onClick={() => window.location.href = '/'}
              >
                Go to Dashboard
              </Button>
            </VStack>
          </Box>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
