import React, { useEffect, useState } from 'react'
import { Box, Flex, HStack, Link as ChakraLink, Button, Spacer, Text, Menu, MenuButton, MenuList, MenuItem, Avatar, MenuDivider, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import api from '../api/client'
import KeyboardShortcutsModal from './KeyboardShortcutsModal'
import NotificationBell from './NotificationBell'

export default function Navbar() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get('/auth/me')
      setCurrentUser(res.data)
    } catch (e) {
      console.error('Failed to fetch current user:', e)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} px={6} py={3} position="sticky" top={0} zIndex={100}>
      <Flex align="center">
        <Text fontWeight="bold" color="blue.500" fontSize="xl">CogniWork</Text>
        <HStack spacing={4} ml={8}>
          <ChakraLink as={Link} to="/">Dashboard</ChakraLink>
          <ChakraLink as={Link} to="/candidates">Candidates</ChakraLink>
          <ChakraLink as={Link} to="/roles">Roles</ChakraLink>
          <ChakraLink as={Link} to="/projects">Projects</ChakraLink>
          <ChakraLink as={Link} to="/insights">Insights</ChakraLink>
          <ChakraLink as={Link} to="/forms">Forms</ChakraLink>
          <ChakraLink as={Link} to="/analytics">Analytics</ChakraLink>
          <ChakraLink as={Link} to="/leaderboard">Leaderboard</ChakraLink>
          {currentUser?.role === 'admin' && (
            <ChakraLink as={Link} to="/users">Users</ChakraLink>
          )}
          {currentUser?.role === 'admin' && (
            <ChakraLink as={Link} to="/settings">Settings</ChakraLink>
          )}
        </HStack>
        <Spacer />
        <HStack spacing={2}>
          <NotificationBell />
          <KeyboardShortcutsModal />
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />
          <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm" variant="ghost">
            <HStack spacing={2}>
              <Avatar size="xs" name={currentUser?.name || currentUser?.email} />
              <Text>{currentUser?.name || currentUser?.email || 'User'}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/profile">My Profile</MenuItem>
            <MenuItem as={Link} to="/settings">Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={onLogout} color="red.500">Logout</MenuItem>
          </MenuList>
        </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}
