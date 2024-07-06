import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select, Image, useToast } from '@chakra-ui/react';
import axios from 'axios';

function LessonForm({ lessonData: initialLessonData, onClose, onSave }) {
  const [lessonData, setLessonData] = useState({
    lesson_name: '',
    type_id: '',
    yt_url: '',
    excerpt: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    feature_img: null,
  });
  const [lessonTypes, setLessonTypes] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();


  useEffect(() => {
    const fetchLessonTypes = async () => {
      try {
        const response = await axios.get('/api/lessontypes');
        setLessonTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch lesson types:', error);
      }
    };

    fetchLessonTypes();
  }, []);

  useEffect(() => {
    if (initialLessonData) {
      const { lesson_name, type_id, excerpt, lesson_detail, feature_img } = initialLessonData;
      setLessonData({
        lesson_name,
        type_id: type_id.toString(), // Ensure type_id is a string for select input
        yt_url: lesson_detail[0]?.yt_url || '',
        excerpt,
        paragraph1: lesson_detail[0]?.paragraph1 || '',
        paragraph2: lesson_detail[0]?.paragraph2 || '',
        paragraph3: lesson_detail[0]?.paragraph3 || '',
        feature_img: feature_img || null,
      });

      // Set image preview for existing lesson data
      if (feature_img) {
        setImagePreview(`/uploads/lessons/${feature_img}`);
      }
    }
  }, [initialLessonData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLessonData({
      ...lessonData,
      feature_img: file,
    });

    // Create image preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('lesson_name', lessonData.lesson_name);
    formData.append('type_id', lessonData.type_id);
    formData.append('yt_url', lessonData.yt_url);
    formData.append('excerpt', lessonData.excerpt);
    formData.append('paragraph1', lessonData.paragraph1);
    formData.append('paragraph2', lessonData.paragraph2);
    formData.append('paragraph3', lessonData.paragraph3);
    if (lessonData.feature_img) {
      formData.append('feature_img', lessonData.feature_img);
    }

    try {
      if (initialLessonData && initialLessonData.id) {
        // Update existing lesson
        await axios.put(`/api/lessons/${initialLessonData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new lesson
        await axios.post('/api/lessons', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      onSave(); // Callback to refresh data in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Feature Image</FormLabel>
          <Input
            type="file"
            name="feature_img"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <Image src={imagePreview} alt="Lesson Feature" mt={2} maxH="200px" />
          )}
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Lesson Name</FormLabel>
          <Input
            type="text"
            name="lesson_name"
            value={lessonData.lesson_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Type</FormLabel>
          <Select
            name="type_id"
            value={lessonData.type_id}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            {lessonTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>YouTube URL</FormLabel>
          <Input
            type="text"
            name="yt_url"
            value={lessonData.yt_url}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Excerpt</FormLabel>
          <Textarea
            name="excerpt"
            value={lessonData.excerpt}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Paragraph 1</FormLabel>
          <Textarea
            name="paragraph1"
            value={lessonData.paragraph1}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Paragraph 2</FormLabel>
          <Textarea
            name="paragraph2"
            value={lessonData.paragraph2}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Paragraph 3</FormLabel>
          <Textarea
            name="paragraph3"
            value={lessonData.paragraph3}
            onChange={handleChange}
          />
        </FormControl>
       
        <Button type="submit" colorScheme="teal">
          {initialLessonData && initialLessonData.id ? 'Update' : 'Create'}
        </Button>
      </form>
    </Box>
  );
}

export default LessonForm;
