import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Skeleton,
  Avatar,
} from "@chakra-ui/react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box p={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        User List
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Avatar</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Verified</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={6}>
                <Flex justify="center">
                  <Skeleton height="20px" w="100%" />
                </Flex>
              </Td>
            </Tr>
          ) : (
            users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>
                  {user.avatar ? (
                 <Avatar 
                 src={user.avatar ? `/uploads/user_avatar/${user.avatar}` : '/path/to/default/avatar.png'} 
                 name={`${user.firstname} ${user.lastname}`} 
               />
                  ) : (
                    "N/A"
                  )}
                </Td>
                <Td>{user.firstname}{' '}{user.lastname}</Td>
                <Td>{user.email}</Td>
                <Td>{user.isVerify === 1 ? "No" : "Yes"}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserList;
