// Export utilities for CSV and PDF

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.error('No data to export')
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header]
        // Handle cells with commas or quotes
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
          return `"${cell.replace(/"/g, '""')}"`
        }
        return cell
      }).join(',')
    )
  ].join('\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToPDF = (elementId, filename = 'export.pdf') => {
  // For now, use print functionality as a simple PDF export
  // In production, use jsPDF or html2pdf.js
  const printContent = document.getElementById(elementId)
  if (!printContent) {
    console.error('Element not found')
    return
  }

  const originalContents = document.body.innerHTML
  const printContents = printContent.innerHTML

  document.body.innerHTML = printContents
  window.print()
  document.body.innerHTML = originalContents
  window.location.reload() // Reload to restore state
}

export const exportTableToCSV = (tableId, filename = 'table-export.csv') => {
  const table = document.getElementById(tableId)
  if (!table) {
    console.error('Table not found')
    return
  }

  const rows = Array.from(table.querySelectorAll('tr'))
  const csvContent = rows.map(row => {
    const cells = Array.from(row.querySelectorAll('th, td'))
    return cells.map(cell => {
      let text = cell.textContent.trim()
      if (text.includes(',') || text.includes('"')) {
        text = `"${text.replace(/"/g, '""')}"`
      }
      return text
    }).join(',')
  }).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const formatDataForExport = (data, config = {}) => {
  // Transform data based on configuration
  return data.map(item => {
    const formattedItem = {}
    Object.keys(item).forEach(key => {
      const displayKey = config[key]?.label || key
      let value = item[key]
      
      // Format dates
      if (config[key]?.type === 'date' && value) {
        value = new Date(value).toLocaleDateString()
      }
      
      // Format numbers
      if (config[key]?.type === 'number' && typeof value === 'number') {
        value = value.toFixed(config[key]?.decimals || 2)
      }
      
      // Skip excluded fields
      if (!config[key]?.exclude) {
        formattedItem[displayKey] = value
      }
    })
    return formattedItem
  })
}
