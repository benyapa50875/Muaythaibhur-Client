import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  StackDivider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Alert,
  IconButton,
  Flex,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import ContactFormEdit from '../../components/admin/ContactFormEdit'; // Adjust the import path as per your file structure
import { Link } from 'react-router-dom';
import { EllipsisVertical, Reply, X } from 'lucide-react';

const ContactFormList = () => {
  const [entries, setEntries] = useState([]);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/contactform');
      setEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact form entries:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contactform/${id}`);
      fetchData();
      toast({
        title: 'Entry deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting contact form entry:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to delete entry',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCloseModals = () => {
    onEditClose();
    onDetailsClose();
    setSelectedEntry(null);
  };

  const formatThaiDate = (dateString) => {
    const date = new Date(dateString);
    const thaiDateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return thaiDateFormatter.format(date);
  };

  if (isLoading) {
    return <Box p={4}>Loading...</Box>;
  }

  return (
    <Box p={4}>
      <Heading py={6}>Contact Form Entries</Heading>
      {entries.length === 0 ? (
        <Alert>No entries found.</Alert>
      ) : (
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {entries.map((entry) => (
            <Box key={entry.id} p={4} borderWidth="1px" borderRadius="lg">
              <Flex justify='space-between'>
                <Flex direction='column' gap={2} pb={6}>
                  <Text fontSize="lg" fontWeight={600}>From: {entry.sender}</Text>
                  <Text fontSize="sm" color='gray.500'>{formatThaiDate(entry.time_stamp)}</Text>
                </Flex>

                <Flex justify='flex-end'>
                  <IconButton as={Link} to={`mailto:${entry.email}`} variant='ghost'>
                    <Reply />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setEntryToDelete(entry);
                      onDeleteOpen();
                    }}
                    variant='ghost'
                  >
                    <X />
                  </IconButton>
                </Flex>
              </Flex>
              <Text>{entry.msg}</Text>
            </Box>
          ))}
        </VStack>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={handleCloseModals}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contact Form Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEntry && (
              <ContactFormEdit entry={selectedEntry} onClose={handleCloseModals} fetchData={fetchData} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={handleCloseModals}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Form Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEntry && (
              <Box>
                <Heading size="md">{selectedEntry.sender}</Heading>
                <Box mt={2}>
                  <strong>Email:</strong> {selectedEntry.email}
                </Box>
                <Box mt={2}>
                  <strong>Message:</strong> {selectedEntry.msg}
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModals}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this entry?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleDelete(entryToDelete.id)}>
              Delete
            </Button>
            <Button ml={3} onClick={onDeleteClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContactFormList;
