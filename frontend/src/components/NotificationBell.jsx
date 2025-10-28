import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'

export default function NotificationBell() {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Performance Review Due',
      message: 'Your quarterly review is due in 3 days',
      time: '2 hours ago',
      read: false,
      type: 'warning',
    },
    {
      id: 2,
      title: 'Goal Completed',
      message: 'You completed "Improve code quality" goal',
      time: '1 day ago',
      read: false,
      type: 'success',
    },
    {
      id: 3,
      title: '1:1 Meeting Scheduled',
      message: 'Meeting with manager on Friday at 2:00 PM',
      time: '2 days ago',
      read: true,
      type: 'info',
    },
  ])

  const bgColor = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const unreadCount = notifications.filter((n) => !n.read).length

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'green.500'
      case 'warning':
        return 'orange.500'
      case 'error':
        return 'red.500'
      default:
        return 'blue.500'
    }
  }

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          variant="ghost"
          size="sm"
          position="relative"
        >
          {unreadCount > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="0"
              right="0"
              fontSize="xs"
            >
              {unreadCount}
            </Badge>
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent w="350px">
        <PopoverArrow />
        <PopoverHeader fontWeight="bold">
          <HStack justify="space-between">
            <Text>Notifications</Text>
            {unreadCount > 0 && (
              <Badge colorScheme="blue">{unreadCount} new</Badge>
            )}
          </HStack>
        </PopoverHeader>
        <PopoverBody p={0}>
          <VStack spacing={0} align="stretch" maxH="400px" overflowY="auto">
            {notifications.length === 0 ? (
              <Box p={6} textAlign="center">
                <Text color="gray.500" fontSize="sm">
                  No notifications
                </Text>
              </Box>
            ) : (
              notifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={3}
                  _hover={{ bg: hoverBg }}
                  cursor="pointer"
                  bg={!notification.read ? useColorModeValue('blue.50', 'gray.700') : 'transparent'}
                  borderBottom="1px"
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                >
                  <HStack align="start" spacing={3}>
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg={getTypeColor(notification.type)}
                      mt={1}
                    />
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontWeight="bold" fontSize="sm">
                        {notification.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {notification.message}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {notification.time}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
          {notifications.length > 0 && (
            <>
              <Divider />
              <Box p={2}>
                <Button size="sm" variant="ghost" width="full">
                  View All Notifications
                </Button>
              </Box>
            </>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
