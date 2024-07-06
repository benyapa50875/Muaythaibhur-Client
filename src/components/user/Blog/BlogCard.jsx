import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EllipsisVertical, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'

function BlogCard({ blog, fetch }) {
  const { id, message, views, likes, comments, user } = blog;
  const toast = useToast();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      toast({
        title: "Blog deleted.",
        description: "The blog post has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetch();
      // You might want to trigger a re-fetch of blogs after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isOwner = userId === user.id;

  return (
    <Box p={4} mb={4} boxShadow="sm" borderWidth="1px" borderRadius="md">
      <Flex pb={4} justify="space-between" gap={2}>
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
        <Menu>
            <MenuButton
              as={IconButton}
              variant='ghost'
              aria-label="Options"
            ><EllipsisVertical /></MenuButton>
            <MenuList>
            <MenuItem as={Link} to={`/community/${id}`}>Read more</MenuItem>
        {isOwner && (

              <MenuItem onClick={handleDelete}>Delete</MenuItem>
        )}
                    </MenuList>
                    </Menu>
      </Flex>
    
      <Text pb={6}>{message}</Text>
      <Flex justify="space-between" align="center">
        <Flex gap={4} alignItems="center">
          <Flex gap={2}>
            <Eye /> {views}
          </Flex>
          <Flex gap={2}>
            <ThumbsUp /> {likes}
          </Flex>
          <Flex gap={2}>
            <MessageCircle /> {comments}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BlogCard;
