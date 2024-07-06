import React, { useState, useEffect } from 'react';
import { Flex, FormControl, FormLabel, Input, Button, Text, Box, useToast } from '@chakra-ui/react';
import axios from 'axios';

const ContactInfoForm = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    phone: '',
    facebook: '',
    instagram: '',
    x_twitter: '', // Assuming this is intended to be "Twitter"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/contactinfo/1`);
        const { phone, facebook, instagram, x_twitter } = response.data;
        setFormData({ phone, facebook, instagram, x_twitter });
      } catch (error) {
        console.error('Error fetching contact info:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchData(); // Fetch data immediately on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/contactinfo/1`, formData);
      console.log('Update Response:', response); // Log the response for debugging
  
      // Show success toast
      toast({
        title: 'Contact Info Updated',
        description: 'Your contact information has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      
      // Show error toast
      toast({
        title: 'Error',
        description: 'An error occurred while updating contact information.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box p={4}>
      <Text fontSize='xl' fontWeight={600}>Update Contact Info</Text>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" p={4}>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </FormControl>

          <FormControl id="facebook">
            <FormLabel>Facebook</FormLabel>
            <Input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Enter Facebook URL"
            />
          </FormControl>

          <FormControl id="instagram">
            <FormLabel>Instagram</FormLabel>
            <Input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Enter Instagram handle"
            />
          </FormControl>

          <FormControl id="x_twitter">
            <FormLabel>Twitter</FormLabel>
            <Input
              type="text"
              name="x_twitter"
              value={formData.x_twitter}
              onChange={handleChange}
              placeholder="Enter Twitter handle"
            />
          </FormControl>

          <Button type="submit" mt={4} colorScheme="blue">
            Save
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ContactInfoForm;
