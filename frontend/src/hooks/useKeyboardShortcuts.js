import { useEffect } from 'react'

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = event
      
      shortcuts.forEach((shortcut) => {
        const matchesKey = shortcut.key.toLowerCase() === key.toLowerCase()
        const matchesCtrl = shortcut.ctrl === (ctrlKey || metaKey)
        const matchesShift = shortcut.shift === shiftKey
        const matchesAlt = shortcut.alt === altKey
        
        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          event.preventDefault()
          shortcut.action()
        }
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [shortcuts])
}

export const defaultShortcuts = [
  {
    key: 'k',
    ctrl: true,
    shift: false,
    alt: false,
    description: 'Open search',
    action: () => {
      const searchInput = document.querySelector('input[placeholder*="Search"]')
      if (searchInput) searchInput.focus()
    },
  },
  {
    key: '/',
    ctrl: false,
    shift: false,
    alt: false,
    description: 'Focus search',
    action: () => {
      const searchInput = document.querySelector('input[placeholder*="Search"]')
      if (searchInput) searchInput.focus()
    },
  },
  {
    key: 'n',
    ctrl: true,
    shift: false,
    alt: false,
    description: 'New item',
    action: () => {
      const newButton = document.querySelector('a[href*="/new"], button:contains("New")')
      if (newButton) newButton.click()
    },
  },
  {
    key: 'h',
    ctrl: true,
    shift: false,
    alt: false,
    description: 'Go to dashboard',
    action: () => {
      window.location.href = '/'
    },
  },
]

export default useKeyboardShortcuts
