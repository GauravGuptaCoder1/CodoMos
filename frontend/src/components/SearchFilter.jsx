import React, { useState } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Badge,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon, FilterIcon } from '@chakra-ui/icons'

export default function SearchFilter({
  onSearch,
  onFilter,
  filters = {},
  placeholder = 'Search...',
  filterOptions = [],
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const bgColor = useColorModeValue('white', 'gray.800')

  const handleSearch = (value) => {
    setSearchQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value }
    setActiveFilters(newFilters)
    if (onFilter) {
      onFilter(newFilters)
    }
  }

  const clearFilters = () => {
    setActiveFilters({})
    setSearchQuery('')
    if (onFilter) {
      onFilter({})
    }
    if (onSearch) {
      onSearch('')
    }
  }

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key] && activeFilters[key].length > 0
  ).length

  return (
    <Box>
      <HStack spacing={3}>
        {/* Search Input */}
        <InputGroup flex={1} bg={bgColor}>
          <InputLeftElement>
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>

        {/* Filter Popover */}
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              leftIcon={<FilterIcon />}
              variant="outline"
              position="relative"
            >
              Filters
              {activeFilterCount > 0 && (
                <Badge
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  colorScheme="blue"
                  borderRadius="full"
                  fontSize="xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent w="300px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack spacing={4} align="stretch" mt={4}>
                {filterOptions.map((filter) => (
                  <FormControl key={filter.key}>
                    <FormLabel fontSize="sm" fontWeight="bold">
                      {filter.label}
                    </FormLabel>
                    {filter.type === 'select' && (
                      <Select
                        placeholder={`Select ${filter.label}`}
                        value={activeFilters[filter.key] || ''}
                        onChange={(e) =>
                          handleFilterChange(filter.key, e.target.value)
                        }
                        size="sm"
                      >
                        {filter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    )}
                    {filter.type === 'checkbox' && (
                      <CheckboxGroup
                        value={activeFilters[filter.key] || []}
                        onChange={(values) =>
                          handleFilterChange(filter.key, values)
                        }
                      >
                        <Stack spacing={2}>
                          {filter.options.map((option) => (
                            <Checkbox key={option.value} value={option.value}>
                              {option.label}
                            </Checkbox>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                    )}
                  </FormControl>
                ))}
                {activeFilterCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<CloseIcon />}
                    onClick={clearFilters}
                    colorScheme="red"
                  >
                    Clear All Filters
                  </Button>
                )}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* Clear Button */}
        {(searchQuery || activeFilterCount > 0) && (
          <IconButton
            aria-label="Clear"
            icon={<CloseIcon />}
            onClick={clearFilters}
            size="sm"
            variant="ghost"
          />
        )}
      </HStack>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <HStack spacing={2} mt={3} flexWrap="wrap">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null
            const filter = filterOptions.find((f) => f.key === key)
            const displayValue = Array.isArray(value)
              ? value.join(', ')
              : filter?.options.find((o) => o.value === value)?.label || value
            return (
              <Badge
                key={key}
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="full"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Text fontSize="xs">
                  {filter?.label}: {displayValue}
                </Text>
                <CloseIcon
                  boxSize={2}
                  cursor="pointer"
                  onClick={() => handleFilterChange(key, null)}
                />
              </Badge>
            )
          })}
        </HStack>
      )}
    </Box>
  )
}
