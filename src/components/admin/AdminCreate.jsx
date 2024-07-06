import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const CreateAdminModal = ({ refreshAdmins }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const token = localStorage.getItem('adminToken');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/admin', { email, password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: 'Admin created',
        description: 'Admin created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEmail('');
      setPassword('');
      refreshAdmins();
      onClose();
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: 'Error creating admin',
        description: 'There was an error creating the admin.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">Create Admin</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Admin</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Create
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAdminModal;
