import React, { useState, useEffect } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

const ContactFormEdit = ({ match, history }) => {
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const { id } = match.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/contactform/${id}`);
      const { sender, email, msg } = response.data;
      setSender(sender);
      setEmail(email);
      setMsg(msg);
    } catch (error) {
      console.error('Error fetching contact form entry:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/contactform/${id}`, { sender, email, msg });
      history.push('/');
    } catch (error) {
      console.error('Error updating contact form entry:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading>Edit Contact Form Entry</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="sender" mt={4}>
          <FormLabel>Sender</FormLabel>
          <Input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="email" mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="msg" mt={4}>
          <FormLabel>Message</FormLabel>
          <Input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default ContactFormEdit;
