import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

const UploadVideo = ({ lessonId, refetch }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  const toast = useToast();

  // Function to handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the file, e.g., save it to state
    setFile(acceptedFiles[0]);
  }, []);

  // Use react-dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No file selected.',
        description: 'Please select a file to upload.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('vdo', file);

    try {
      setUploading(true);
      await axios.post(`/api/evaluation/${lessonId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Upload successful.',
        description: 'Video uploaded successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFile(null); // Clear selected file
      refetch();
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: 'Upload failed.',
        description: 'Failed to upload video.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box p={6} boxShadow='md' borderRadius="md" my={6}>
      <form onSubmit={handleSubmit}>
        <Box {...getRootProps()} style={dropzoneStyle} p={6}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <UploadCloud />
              <p>Drag 'n' drop a file here, or click to select a file</p>
            </>
          ) : (
            <>
              <UploadCloud />
              <p>Drag 'n' drop a file here, or click to select a file</p>
            </>
          )}
        </Box>
        {file && (
          <Text mt={4} fontWeight="bold">Selected File: {file.name}</Text>
        )}
        <Button mt={4} w='full' colorScheme="red" type="submit" isLoading={uploading} loadingText="Uploading...">
          Send Video
        </Button>
      </form>
    </Box>
  );
};

const dropzoneStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  border: '2px solid #cccccc',
  borderRadius: '4px',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: '100%',
};

export default UploadVideo;
