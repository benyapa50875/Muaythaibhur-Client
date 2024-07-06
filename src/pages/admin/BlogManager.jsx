import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Alert,
  Heading,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import axios from 'axios';
import CommentModal from '../../components/admin/CommentModal';
import { EllipsisVertical, Eye, MessageCircle, ThumbsUp } from 'lucide-react';

const BlogManager = () => {
  const toast = useToast();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isCommentModalOpen, onOpen: onCommentModalOpen, onClose: onCloseCommentModal } = useDisclosure(); // State for comment modal
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching blogs.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBlogSelect = (blog) => {
    setSelectedBlog(blog);
    onEditOpen();
  };

  const handleBlogSubmit = () => {
    onCloseModals();
    fetchBlogs();
  };

  const handleBlogDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      toast({
        title: 'Blog Deleted',
        description: 'The blog has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the blog.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleOpenCommentModal = (blogId) => {
    setSelectedBlog(blogId);
    onCommentModalOpen();
  };

  const onCloseModals = () => {
    onEditClose();
    onDetailsClose();
    onCloseCommentModal(); // Close comment modal
    setSelectedBlog(null);
  };

  return (
    <Box p={4}>
      <Heading py={6}>Blog Management</Heading>
      <Box mt={4}>
        {blogs.length === 0 ? (
          <Alert>No blogs found.</Alert>
        ) : (
          blogs.map(blog => (
            <Box key={blog.id} p={4} mb={2} border="1px" borderRadius="md" borderColor="gray.200">
              <Flex pb={4} justify="space-between" gap={2}>
                <Flex pb={4} align="center" gap={2}>
                  <Avatar
                    src={
                      blog.user.avatar
                        ? `/uploads/user_avatar/${blog.user.avatar}`
                        : "/path/to/default/avatar.png"
                    }
                    name={`${blog.user.firstname} ${blog.user.lastname}`}
                  />
                  <Text fontWeight={600}>
                    {blog.user.firstname} {blog.user.lastname}
                  </Text>
                </Flex>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    variant='ghost'
                    aria-label="Options"
                  ><EllipsisVertical /></MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleBlogDelete(blog.id)}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>

              <Text pb={6}>{blog.message}</Text>
              <Flex justify="space-between" align="center">
                <Flex gap={4} alignItems="center">
                  <Flex gap={2}>
                    <Eye /> {blog.views}
                  </Flex>
                  <Flex gap={2}>
                    <ThumbsUp /> {blog.likes}
                  </Flex>
                  <Flex gap={2}>
                    <MessageCircle /> {blog.comments}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))
        )}
      </Box>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={onCloseCommentModal}
        blogId={selectedBlog}
      />
    </Box>
  );
};

export default BlogManager;
