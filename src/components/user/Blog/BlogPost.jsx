import React, { useState } from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Alert, AlertIcon } from '@chakra-ui/react';

const CreateBlog = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token'); // Assuming you have a way to retrieve the token
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('/api/blogs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      onSuccess()
      setSuccess(response.data.message || 'Blog created successfully');
      setFormData({ message: '' }); // Clear form after successful submission
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create blog');
    }
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit}>
        <FormControl id="message" isRequired>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your blog post here..."
          />
        </FormControl>
        <Button type="submit" mt={4} w='full' colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateBlog;
