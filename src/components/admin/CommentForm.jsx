// CommentForm.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

const CommentForm = ({ comment, blogId, onSubmit }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    userId: '',
    message: '',
  });

  useEffect(() => {
    if (comment) {
      setFormData({
        userId: comment.userId,
        message: comment.message,
      });
    }
  }, [comment]);

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
      if (comment) {
        await axios.put(`/api/blogs/comments/${comment.id}`, formData);
        toast({
          title: 'Comment Updated',
          description: 'Your comment has been successfully updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.post('/api/blogs/comments', { ...formData, blogId });
        toast({
          title: 'Comment Created',
          description: 'Your comment has been successfully created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving comment:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while saving the comment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} mt={4} border="1px" borderRadius="md" borderColor="gray.200">
      <form onSubmit={handleSubmit}>
        <FormControl id="userId" isRequired mb={2}>
          <FormLabel>User ID</FormLabel>
          <Input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter User ID"
          />
        </FormControl>
        <FormControl id="message" isRequired mb={2}>
          <FormLabel>Message</FormLabel>
          <Input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter Comment Message"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={2}>
          {comment ? 'Update Comment' : 'Add Comment'}
        </Button>
      </form>
    </Box>
  );
};

export default CommentForm;
