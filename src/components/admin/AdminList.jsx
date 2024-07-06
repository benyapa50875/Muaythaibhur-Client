import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Button,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import CreateAdminModal from './AdminCreate';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const token = localStorage.getItem('adminToken');
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('/api/admin',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
      toast({
        title: 'Admin deleted',
        description: 'Admin deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast({
        title: 'Error deleting admin',
        description: 'There was an error deleting the admin.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Flex justify='space-between' alignItems='center'>
         <Text fontSize="xl" fontWeight="bold" mb={4}>
        Admin List
      </Text>
      <CreateAdminModal refreshAdmins={fetchAdmins} />
      </Flex>
     
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={3}>
                <Flex justify="center">
                  <Skeleton height="20px" w="100%" />
                </Flex>
              </Td>
            </Tr>
          ) : (
            admins.map((admin) => (
              <Tr key={admin.id}>
                <Td>{admin.id}</Td>
                <Td>{admin.email}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDelete(admin.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      
    </Box>
  );
};

export default AdminList;
