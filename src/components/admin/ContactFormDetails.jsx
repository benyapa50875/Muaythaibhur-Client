import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

const ContactFormDetails = ({ match }) => {
  const [entry, setEntry] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/contactform/${id}`);
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching contact form entry:', error);
    }
  };

  if (!entry) {
    return (
      <Box p={4}>
        <Heading>Loading...</Heading>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading>{entry.sender}</Heading>
      <Text mt={2}>{entry.email}</Text>
      <Text mt={2}>{entry.msg}</Text>
    </Box>
  );
};

export default ContactFormDetails;
