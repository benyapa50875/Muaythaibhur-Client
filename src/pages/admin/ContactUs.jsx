// ContactUsPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, StackDivider, Heading } from '@chakra-ui/react';
import axios from 'axios';
import ContactUsUpdate from '../../components/admin/ContactUsUpdate'; // Adjust the path based on your project structure

const ContactUsPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/contactus');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching contact us entries:', error);
    }
  };

  const handleUpdate = () => {
    fetchData();
  };

  return (
    <Box p={4}>
      <Heading fontWeight={600}>Manage Contact Us Page</Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {entries.map(entry => (
          <Box key={entry.id} p={4} borderWidth="1px" borderRadius="lg">
            {/* Display current image */}
            <Box mb={2}>
              <img src={`/uploads/contact_us/${entry.img}`} alt="Contact Us" style={{ maxWidth: '100%' }} />
            </Box>
            <ContactUsUpdate contactUsId={entry.id} onUpdate={handleUpdate} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ContactUsPage;
