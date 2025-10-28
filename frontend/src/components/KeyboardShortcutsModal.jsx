import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Kbd,
  HStack,
  useDisclosure,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'

const shortcuts = [
  { keys: ['Ctrl', 'K'], description: 'Open search' },
  { keys: ['/'], description: 'Focus search' },
  { keys: ['Ctrl', 'N'], description: 'Create new item' },
  { keys: ['Ctrl', 'H'], description: 'Go to dashboard' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['Esc'], description: 'Close dialogs' },
]

export default function KeyboardShortcutsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Tooltip label="Keyboard shortcuts (?)">
        <IconButton
          aria-label="Keyboard shortcuts"
          icon={<QuestionIcon />}
          onClick={onOpen}
          variant="ghost"
          size="sm"
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>⌨️ Keyboard Shortcuts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Shortcut</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {shortcuts.map((shortcut, index) => (
                  <Tr key={index}>
                    <Td>
                      <HStack spacing={1}>
                        {shortcut.keys.map((key, idx) => (
                          <Kbd key={idx}>{key}</Kbd>
                        ))}
                      </HStack>
                    </Td>
                    <Td>{shortcut.description}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
