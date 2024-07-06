// HomepagePage.jsx

import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, StackDivider, Image } from '@chakra-ui/react';
import axios from 'axios';
import HomepageUpdate from '../../components/admin/HomePageUpdate';// Adjust the path based on your project structure

const HomepagePage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/homepage');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching homepage entries:', error);
    }
  };

  const handleUpdate = () => {
    fetchData();
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight={600}>Manage Homepage Entries</Text>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {entries.map(entry => (
          <Box key={1} p={4} borderWidth="1px" borderRadius="lg">
            {/* Display current header, image, and other relevant fields */}
            <Box mb={2} display='flex' justifyContent='center'>
              <Image src={`/uploads/homepage/${entry.hero_img}`} alt="Homepage" boxSize='sm' />
            </Box>
            <HomepageUpdate homepageId={1} onUpdate={handleUpdate} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default HomepagePage;
