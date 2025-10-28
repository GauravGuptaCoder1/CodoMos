import React from 'react'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons'
import { exportToCSV, formatDataForExport } from '../utils/export'

export default function ExportButton({ data, filename = 'export', config = {} }) {
  const toast = useToast()

  const handleExport = (format) => {
    try {
      if (!data || data.length === 0) {
        toast({
          title: 'No data to export',
          status: 'warning',
          duration: 2000,
        })
        return
      }

      const formattedData = config ? formatDataForExport(data, config) : data

      if (format === 'csv') {
        exportToCSV(formattedData, `${filename}.csv`)
      } else if (format === 'json') {
        const blob = new Blob([JSON.stringify(formattedData, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${filename}.json`
        link.click()
      }

      toast({
        title: `Exported as ${format.toUpperCase()}`,
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: 'Export failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<DownloadIcon />} size="sm">
        Export
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleExport('csv')}>Export as CSV</MenuItem>
        <MenuItem onClick={() => handleExport('json')}>Export as JSON</MenuItem>
      </MenuList>
    </Menu>
  )
}
