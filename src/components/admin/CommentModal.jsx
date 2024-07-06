import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';

const CommentModal = ({ isOpen, onClose, blogId }) => {
  const [comments, setComments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/blogs/comments/${blogId}/`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch comments.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      toast({
        title: 'Comment Deleted',
        description: 'Comment deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete comment.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {comments.length === 0 ? (
            <Text>No comments found.</Text>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <Text>{comment.content}</Text>
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
