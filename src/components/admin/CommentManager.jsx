// CommentManager.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import CommentForm from './CommentForm';

const CommentManager = ({ blogId }) => {
  const toast = useToast();
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/blogs/comments');
      setComments(response.data.filter(comment => comment.blogId === blogId));
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching comments.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCommentSelect = (comment) => {
    setSelectedComment(comment);
    setIsEditing(true);
  };

  const handleCommentSubmit = () => {
    setIsEditing(false);
    setSelectedComment(null);
    fetchComments();
  };

  const handleCommentDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/comments/${id}`);
      toast({
        title: 'Comment Deleted',
        description: 'The comment has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the comment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={4}>
      <Text fontSize="lg" fontWeight={600}>Comments</Text>
      <Button colorScheme="blue" onClick={() => setIsEditing(true)}>Add Comment</Button>
      {isEditing && (
        <CommentForm
          comment={selectedComment}
          blogId={blogId}
          onSubmit={handleCommentSubmit}
        />
      )}
      <Box mt={4}>
        {comments.map(comment => (
          <Box key={comment.id} p={4} mb={2} border="1px" borderRadius="md" borderColor="gray.200">
            <Text>{comment.message}</Text>
            <Button colorScheme="green" onClick={() => handleCommentSelect(comment)}>Edit</Button>
            <Button colorScheme="red" onClick={() => handleCommentDelete(comment.id)}>Delete</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommentManager;
