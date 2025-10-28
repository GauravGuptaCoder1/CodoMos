import React from 'react'
import { Card, CardBody, Skeleton, SkeletonText, VStack, HStack } from '@chakra-ui/react'

export function SkeletonCard() {
  return (
    <Card>
      <CardBody>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Skeleton height="20px" width="150px" />
            <Skeleton height="20px" width="60px" />
          </HStack>
          <SkeletonText noOfLines={2} spacing={2} />
        </VStack>
      </CardBody>
    </Card>
  )
}

export function SkeletonTable({ rows = 3, columns = 5 }) {
  return (
    <VStack spacing={2} align="stretch">
      {/* Header */}
      <HStack spacing={4}>
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={i} height="20px" flex={1} />
        ))}
      </HStack>
      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <HStack key={rowIndex} spacing={4}>
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton key={colIndex} height="16px" flex={1} />
          ))}
        </HStack>
      ))}
    </VStack>
  )
}

export default SkeletonCard
