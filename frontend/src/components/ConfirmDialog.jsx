import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

export function useConfirmDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [config, setConfig] = React.useState({
    title: 'Confirm Action',
    message: 'Are you sure?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
    colorScheme: 'red',
  })
  const cancelRef = React.useRef()

  const confirm = (customConfig) => {
    setConfig({ ...config, ...customConfig })
    onOpen()
  }

  const handleConfirm = () => {
    config.onConfirm()
    onClose()
  }

  const dialog = (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {config.title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {config.message}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {config.cancelText}
            </Button>
            <Button colorScheme={config.colorScheme} onClick={handleConfirm} ml={3}>
              {config.confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  return { confirm, dialog }
}

export default useConfirmDialog
