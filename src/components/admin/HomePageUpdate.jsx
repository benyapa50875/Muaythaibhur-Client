import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const HomepageUpdate = ({ homepageId, onUpdate }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    header1: '',
    paragraph1: '',
    button1_1: '',
    button1_2: '',
    header2: '',
    subheader2: '',
    icon1: null,
    icon2: null,
    list1: '',
    list1_detail: '',
    list2: '',
    list2_detail: '',
    hero_img: null,
  });

  useEffect(() => {
    if (homepageId) {
      fetchHomepageData();
    }
  }, [homepageId]);

  const fetchHomepageData = async () => {
    try {
      const response = await axios.get(`/api/homepage/${homepageId}`);
      const responseData = response.data[0]; // Assuming response is an array with one object
      const {
        header1,
        paragraph1,
        button1_1,
        button1_2,
        header2,
        subheader2,
        icon1,
        icon2,
        list1,
        list1_detail,
        list2,
        list2_detail,
        hero_img,
      } = responseData;
      setFormData({
        header1: header1.trim(), // Remove any leading/trailing whitespace
        paragraph1: paragraph1.trim(),
        button1_1: button1_1.trim(),
        button1_2: button1_2.trim(),
        header2: header2.trim(),
        subheader2: subheader2.trim(),
        icon1: null,
        icon2: null,
        list1: list1.trim(),
        list1_detail: list1_detail.trim(),
        list2: list2.trim(),
        list2_detail: list2_detail.trim(),
        hero_img: null, // Since hero_img should not be set as an initial value here
      });
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch homepage data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async () => {
    try {
      const { hero_img, icon1, icon2, ...data } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append('hero_img', hero_img);
      formDataToSend.append('icon1', icon1);
      formDataToSend.append('icon2', icon2);
      Object.keys(data).forEach((key) => {
        formDataToSend.append(key, data[key]);
      });

      await axios.put(`/api/homepage/${homepageId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Success',
        description: 'Homepage entry updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onUpdate();
    } catch (error) {
      console.error('Error updating homepage entry:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while updating the homepage entry.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
       <FormControl>
        <FormLabel>Hero Image</FormLabel>
        <Input
          type="file"
          name="hero_img"
          onChange={handleFileChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Header 1</FormLabel>
        <Input
          type="text"
          name="header1"
          value={formData.header1}
          onChange={handleInputChange}
          placeholder="Enter Header 1"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Paragraph 1</FormLabel>
        <Textarea
          name="paragraph1"
          value={formData.paragraph1}
          onChange={handleInputChange}
          placeholder="Enter Paragraph 1"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Button 1 Text</FormLabel>
        <Input
          type="text"
          name="button1_1"
          value={formData.button1_1}
          onChange={handleInputChange}
          placeholder="Enter Button 1 Text"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Button 2 Text</FormLabel>
        <Input
          type="text"
          name="button1_2"
          value={formData.button1_2}
          onChange={handleInputChange}
          placeholder="Enter Button 2 Text"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Header 2</FormLabel>
        <Input
          type="text"
          name="header2"
          value={formData.header2}
          onChange={handleInputChange}
          placeholder="Enter Header 2"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Subheader 2</FormLabel>
        <Input
          type="text"
          name="subheader2"
          value={formData.subheader2}
          onChange={handleInputChange}
          placeholder="Enter Subheader 2"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Icon 1</FormLabel>
        <Input
          type="file"
          name="icon1"
          onChange={handleFileChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Icon 2</FormLabel>
        <Input
          type="file"
          name="icon2"
          onChange={handleFileChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>List 1</FormLabel>
        <Input
          type="text"
          name="list1"
          value={formData.list1}
          onChange={handleInputChange}
          placeholder="Enter List 1"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>List 1 Detail</FormLabel>
        <Textarea
          name="list1_detail"
          value={formData.list1_detail}
          onChange={handleInputChange}
          placeholder="Enter List 1 Detail"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>List 2</FormLabel>
        <Input
          type="text"
          name="list2"
          value={formData.list2}
          onChange={handleInputChange}
          placeholder="Enter List 2"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>List 2 Detail</FormLabel>
        <Textarea
          name="list2_detail"
          value={formData.list2_detail}
          onChange={handleInputChange}
          placeholder="Enter List 2 Detail"
        />
      </FormControl>

     

      <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
};

export default HomepageUpdate;
