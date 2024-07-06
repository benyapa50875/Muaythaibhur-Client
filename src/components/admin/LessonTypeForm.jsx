import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';

function LessonTypeForm({ onSuccess, lessonType }) {
  const [typeName, setTypeName] = useState('');

  useEffect(() => {
    if (lessonType) {
      setTypeName(lessonType.type_name);
    } else {
      setTypeName('');
    }
  }, [lessonType]);

  const handleChange = (e) => {
    setTypeName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (lessonType) {
        response = await axios.put(`/api/lessontypes/${lessonType.id}`, { type_name: typeName });
      } else {
        response = await axios.post('/api/lessontypes', { type_name: typeName });
      }
      onSuccess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Type Name</FormLabel>
          <Input
            type="text"
            name="type_name"
            value={typeName}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          {lessonType ? 'Update' : 'Create'}
        </Button>
      </form>
    </Box>
  );
}

export default LessonTypeForm;
