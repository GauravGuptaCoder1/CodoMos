import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons'

const routeNames = {
  '': 'Dashboard',
  'dashboard': 'Dashboard',
  'candidates': 'Candidates',
  'roles': 'Roles',
  'projects': 'Projects',
  'forms': 'Forms',
  'insights': 'Repository Insights',
  'settings': 'Settings',
  'users': 'Users',
  'leaderboard': 'Leaderboard',
  'new': 'New',
  'edit': 'Edit',
  'responses': 'Responses',
  'public': 'Public',
  'profile': 'Profile',
}

export default function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (pathnames.length === 0) {
    return null
  }

  return (
    <Breadcrumb 
      spacing="8px" 
      separator={<ChevronRightIcon color="gray.500" />}
      mb={4}
      fontSize="sm"
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/" color="blue.500">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const displayName = routeNames[name] || name.charAt(0).toUpperCase() + name.slice(1)

        return (
          <BreadcrumbItem key={routeTo} isCurrentPage={isLast}>
            <BreadcrumbLink
              as={isLast ? 'span' : Link}
              to={routeTo}
              color={isLast ? 'gray.600' : 'blue.500'}
              fontWeight={isLast ? 'semibold' : 'normal'}
            >
              {displayName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
