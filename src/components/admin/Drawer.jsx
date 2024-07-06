import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Sidebar = () => {
  const { data: webInfo, error } = useSWR("/api/webinfo", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle loading state
  if (!webInfo && !error) {
    return (
      <IconButton colorScheme="blue" onClick={onOpen}>
        <ChevronRight />
      </IconButton>
    );
  }

  // Handle error state
  if (error) {
    console.error("Error fetching web info:", error);
    return (
      <IconButton colorScheme="blue" onClick={onOpen}>
        <ChevronRight />
      </IconButton>
    );
  }

  // Once data is loaded, render the Sidebar
  return (
    <>
      <IconButton colorScheme="gray" onClick={onOpen}>
        <ChevronRight />
      </IconButton>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex direction="column">
              <Text fontSize="xl" fontWeight={600}>
                {webInfo[0].web_name}
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4}>
              <Text fontWeight="bold" fontSize="md">
                Page Management
              </Text>
              <Text fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}} as={RouterLink} to="/admin/homepage">
                Homepage Management
              </Text>
              <Text fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}} as={RouterLink} to="/admin/contact_us">
                Contact Page Management
              </Text>

              <Text fontWeight="bold" fontSize="md" mt={2}>
                Lesson & Evaluation
              </Text>
              <Text as={RouterLink} to="/admin/evaluation" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Evaluation List
              </Text>
              <Text as={RouterLink} to="/admin/lesson" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Lesson List
              </Text>
              <Text as={RouterLink} to="/admin/lesson_types" fontSize='sm' color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}} ml={4}>
                Lesson Types
              </Text>

              <Text fontWeight="bold" fontSize="md" mt={2}>
                Settings
              </Text>
              <Text as={RouterLink} to="/admin/user" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                User List
              </Text>
              <Text as={RouterLink} to="/admin/admin_list" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Admin List
              </Text>
              <Text as={RouterLink} to="/admin/blog" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Blog Post
              </Text>
              <Text as={RouterLink} to="/admin/contact_form" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Contact Form Entries
              </Text>
              <Text as={RouterLink} to="/admin/contact_info" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Contact Info Setting
              </Text>
              <Text as={RouterLink} to="/admin/web_info" fontSize='sm' ml={4} color='gray.500' fontWeight={500} _hover={{color: '#000000', transition: 'all 0.5s ease'}}>
                Site Setting
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
