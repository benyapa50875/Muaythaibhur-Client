// ContactUsUpdate.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ContactUsUpdate = ({ contactUsId, onUpdate }) => {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('img', selectedFile);

      await axios.put(`/api/contactus/${contactUsId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Success',
        description: 'Contact Us entry updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onUpdate();
    } catch (error) {
      console.error('Error updating contact us entry:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while updating the contact us entry.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Update Image</FormLabel>
        <Input type="file" onChange={handleFileChange} />
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
};

export default ContactUsUpdate;
