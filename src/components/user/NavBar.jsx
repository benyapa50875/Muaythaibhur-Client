import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Button, Avatar } from '@chakra-ui/react';
import { NavLink, Link as RouterLink, useNavigate } from 'react-router-dom';

const fetcher = (url, token) => axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

function Navbar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Or any other method to get the token
    if (token) {
      fetcher('/api/user/me', token)
        .then(data => setUser(data))
        .catch(error => setError(error.response?.data?.message || 'Failed to fetch user'));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setUser(null); // Clear the user state
    navigate('/'); // Navigate to the home page or any other route after sign-out
  };

  return (
    <Box bg="white" px={10} py={6} boxShadow='xs'>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex gap={6} alignItems="center" justifyContent="space-between">
          <Text as={RouterLink} to='/' fontSize="2xl" fontWeight="bold">
            <span style={{ color: '#B80000' }}>MuayThai</span>
            <span style={{ color: '#000000' }}>Bhur</span>
          </Text>
          <Text as={RouterLink} color="black" fontWeight={600} to='/'>Home</Text>
          <Text as={RouterLink} color="black" fontWeight={600} to='/lessons'>Lessons</Text>
          <Text as={RouterLink} color="black" fontWeight={600} to='/community'>Community</Text>
          <Text as={RouterLink} color="black" fontWeight={600} to='/contact'>Contact us</Text>
        </Flex>
        <Flex gap={4} alignItems="center">
          {user ? (
            <>
              <Flex direction='column' alignItems='end'>
                <Text fontWeight={600}>{`${user.firstname} ${user.lastname}`}</Text>
                <Text color='#B80000' fontSize='sm' textDecoration='underline' cursor='pointer' onClick={handleSignOut}>Sign Out</Text>
              </Flex>
              <Avatar 
                src={user.avatar ? `/uploads/user_avatar/${user.avatar}` : '/path/to/default/avatar.png'} 
                name={`${user.firstname} ${user.lastname}`} 
              />
            </>
          ) : (
            <>
              <Button as={RouterLink} to='/signup' borderRadius="42px">Sign up</Button>
              <Button as={RouterLink} to='/signin' borderRadius="42px" bg="#B80000" color="white">Sign in</Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
