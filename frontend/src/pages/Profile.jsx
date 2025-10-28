import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Text,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  Divider,
} from '@chakra-ui/react'
import api from '../api/client'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: false,
    weeklyReports: true,
  })
  const toast = useToast()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/me')
      setUser(response.data)
      setFormData({
        name: response.data.name || '',
        email: response.data.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      toast({
        title: 'Error loading profile',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    setSaving(true)
    try {
      await api.patch('/users/me', {
        name: formData.name,
        email: formData.email,
      })
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
      })
      fetchUserProfile()
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: error.response?.data?.detail || 'Please try again',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters',
        status: 'error',
        duration: 3000,
      })
      return
    }

    setSaving(true)
    try {
      await api.post('/users/change-password', {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      })
      toast({
        title: 'Password changed successfully',
        status: 'success',
        duration: 3000,
      })
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast({
        title: 'Failed to change password',
        description: error.response?.data?.detail || 'Please check your current password',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container maxW="4xl" py={8}>
        <Heading>Loading...</Heading>
      </Container>
    )
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="4xl" py={8}>
        <VStack spacing={6} align="stretch">
          {/* Profile Header */}
          <Card>
            <CardBody>
              <HStack spacing={6}>
                <Avatar size="2xl" name={user?.name || user?.email} />
                <VStack align="start" spacing={1}>
                  <Heading size="lg">{user?.name || 'User'}</Heading>
                  <Text color="gray.600">{user?.email}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Role: <strong>{user?.role || 'employee'}</strong>
                  </Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          {/* Tabs for Settings */}
          <Tabs colorScheme="blue">
            <TabList>
              <Tab>Profile Information</Tab>
              <Tab>Security</Tab>
              <Tab>Preferences</Tab>
            </TabList>

            <TabPanels>
              {/* Profile Tab */}
              <TabPanel px={0}>
                <Card>
                  <CardHeader>
                    <Heading size="md">Personal Information</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                        />
                      </FormControl>

                      <Button
                        colorScheme="blue"
                        onClick={handleUpdateProfile}
                        isLoading={saving}
                        alignSelf="flex-start"
                      >
                        Save Changes
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel px={0}>
                <Card>
                  <CardHeader>
                    <Heading size="md">Change Password</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Current Password</FormLabel>
                        <Input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>New Password</FormLabel>
                        <Input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          placeholder="Enter new password"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                        />
                      </FormControl>

                      <Button
                        colorScheme="blue"
                        onClick={handleChangePassword}
                        isLoading={saving}
                        alignSelf="flex-start"
                      >
                        Update Password
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </TabPanel>

              {/* Preferences Tab */}
              <TabPanel px={0}>
                <Card>
                  <CardHeader>
                    <Heading size="md">Notification Preferences</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="medium">Email Notifications</Text>
                          <Text fontSize="sm" color="gray.600">
                            Receive email updates about your performance reviews
                          </Text>
                        </Box>
                        <Switch
                          isChecked={preferences.emailNotifications}
                          onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                        />
                      </HStack>

                      <Divider />

                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="medium">Weekly Reports</Text>
                          <Text fontSize="sm" color="gray.600">
                            Get weekly summary of your goals and achievements
                          </Text>
                        </Box>
                        <Switch
                          isChecked={preferences.weeklyReports}
                          onChange={(e) => setPreferences({ ...preferences, weeklyReports: e.target.checked })}
                        />
                      </HStack>

                      <Divider />

                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="medium">Dark Mode</Text>
                          <Text fontSize="sm" color="gray.600">
                            Enable dark theme (coming soon)
                          </Text>
                        </Box>
                        <Switch
                          isChecked={preferences.darkMode}
                          onChange={(e) => setPreferences({ ...preferences, darkMode: e.target.checked })}
                          isDisabled
                        />
                      </HStack>

                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          toast({
                            title: 'Preferences saved',
                            status: 'success',
                            duration: 2000,
                          })
                        }}
                        alignSelf="flex-start"
                      >
                        Save Preferences
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  )
}
