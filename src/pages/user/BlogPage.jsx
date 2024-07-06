import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import BlogCard from "../../components/user/Blog/BlogCard";
import CreateBlog from "../../components/user/Blog/BlogPost";
import { Plus } from "lucide-react";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("latest");

  useEffect(() => {
    fetchData();
  }, [sortCriteria]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/blogs");
      let sortedBlogs = response.data;

      switch (sortCriteria) {
        case "latest":
          sortedBlogs = sortedBlogs.sort((a, b) => new Date(b.id) - new Date(a.id));
          break;
        case "top":
          sortedBlogs = sortedBlogs.sort((a, b) => b.comments - a.comments);
          break;
        case "hot":
          sortedBlogs = sortedBlogs.sort((a, b) => b.likes - a.likes);
          break;
        default:
          break;
      }

      setBlogs(sortedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCreateBlog = () => {
    setShowModal(false); // Close modal after submission (if desired)
    fetchData(); // Fetch updated blog list
  };

  const handleTabChange = (index) => {
    const criteria = ["latest", "top", "hot"][index];
    setSortCriteria(criteria);
  };

  return (
    <Box p={8}>
      <Button leftIcon={<Plus />} onClick={toggleModal} mb={4} colorScheme="blue">
        Post
      </Button>

      <Tabs onChange={handleTabChange} mb={4} variant='soft-rounded' colorScheme='red'>
        <TabList>
          <Tab>Latest</Tab>
          <Tab>Top</Tab>
          <Tab>Hot</Tab>
        </TabList>
      </Tabs>

      <VStack spacing={4} align="stretch">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} fetch={fetchData} />
        ))}
      </VStack>

      <Modal isOpen={showModal} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CreateBlog onSuccess={handleCreateBlog} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Blogs;
