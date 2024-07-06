import React from 'react';
import { Flex, Button, Text, Box, IconButton } from '@chakra-ui/react';
import Sidebar from './Drawer';
import useSWR from 'swr';
import axios from 'axios';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fetcher = (url) => axios.get(url).then(res => res.data);

const TopBar = () => {
  // Fetch data using useSWR
  const { data: webInfo, error } = useSWR('/api/webinfo', fetcher);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('adminToken'); // Remove the token from local storage
    navigate('/admin/signin'); // Navigate to the home page or any other route after sign-out
  };
  // Handle loading state
  if (!webInfo && !error) {
    return (
      <Flex p="4" align="center" justify="space-between" boxShadow="md" bg="red.700">
        <Sidebar />
        <Text fontSize='xl' fontWeight={600}>Loading...</Text>
        <IconButton><LogOut /></IconButton>
      </Flex>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Flex p="4" align="center" justify="space-between" boxShadow="md" bg="red.700">
        <Sidebar />
        <Text fontSize='xl' fontWeight={600}>Error loading web info</Text>
        <IconButton onClick={handleSignOut}><LogOut /></IconButton>
      </Flex>
    );
  }

  // Once data is loaded, render the top bar with webInfo
  return (
    <Flex p="4" align="center" justify="space-between" boxShadow="md" bg="red.700">
      <Sidebar />
      <Box align='center' color='white' >
        <Text fontSize='xl' fontWeight={600}>{webInfo[0].web_name}</Text>
      <Text fontSize='sm' fontWeight={600}>Back office</Text>
      </Box>
      
      <IconButton onClick={handleSignOut}><LogOut /></IconButton>
    </Flex>
  );
};

export default TopBar;
