import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Avatar,
  Divider,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useToast,
  Menu,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { EllipsisVertical, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import {jwtDecode} from "jwt-decode";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    fetchData();
    updateViewCount();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const updateViewCount = async () => {
    try {
      await axios.put(
        `/api/blogs/views`,
        { blogId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(
        `/api/blogs/likes`,
        { blogId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(true);
      fetchData();
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCreateComment = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(
        "/api/blogs/comments",
        {
          blogId: id,
          message: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewComment("");
      toggleModal();
      fetchData();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/blogs/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Comment deleted.",
        description: "The comment has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "Failed to delete the comment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!blog) {
    return <Box>Loading...</Box>;
  }

  const decodedToken = jwtDecode(token);
  const currentId = decodedToken.userId;
  const { message, views, likes, user, comment_blog, comments } = blog;

  return (
    <Box p={12}>
      <Flex pb={4} align="center" gap={2}>
        <Avatar
          src={
            user.avatar
              ? `/uploads/user_avatar/${user.avatar}`
              : "/path/to/default/avatar.png"
          }
          name={`${user.firstname} ${user.lastname}`}
        />
        <Text fontWeight={600}>
          {user.firstname} {user.lastname}
        </Text>
      </Flex>
      <Text as="h1" size="xl" mb={4}>
        {message}
      </Text>

      <Flex gap={4} alignItems="center" pb={4}>
        <Flex gap={2}>
          <Eye /> {views}
        </Flex>
        <Flex gap={2} onClick={handleLike} style={{ cursor: "pointer" }}>
          <ThumbsUp color={liked ? "#B80000" : undefined} /> {likes}
        </Flex>
        <Flex gap={2}>
          <MessageCircle /> {comments}
        </Flex>
      </Flex>
      <Button onClick={toggleModal} mb={4} colorScheme="teal">
        Add Comment
      </Button>
      <Divider />
      <VStack spacing={4} align="start" mx={4}>
        {comment_blog.map((comment) => (
          <Box key={comment.id} p={2} borderWidth="1px" borderRadius="md" w="full">
            <Flex pb={4} justify="space-between" gap={2}>
              <Flex pb={4} align="center" gap={2}>
                <Avatar
                  src={
                    comment.user.avatar
                      ? `/uploads/user_avatar/${comment.user.avatar}`
                      : "/path/to/default/avatar.png"
                  }
                  name={`${comment.user.firstname} ${comment.user.lastname}`}
                />
                <Text fontWeight={600}>
                  {comment.user.firstname} {comment.user.lastname}
                </Text>
              </Flex>
              {currentId === comment.userId && (
                <Menu>
                  <MenuButton as={IconButton} variant="ghost" aria-label="Options">
                    <EllipsisVertical />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleDelete(comment.id)}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <Text pl={2}>{comment.message}</Text>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={showModal} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="md"
              resize="vertical"
              mb={4}
            />
            <Button onClick={handleCreateComment} colorScheme="teal">
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BlogDetail;
