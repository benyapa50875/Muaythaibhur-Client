import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  useToast,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  ModalFooter,
} from '@chakra-ui/react';
import { Edit2, Plus, X, Search, AlertCircle } from 'lucide-react'; // Assuming lucid-react components
import useSWR from 'swr';
import axios from 'axios';
import LessonForm from '../../components/admin/LessonForm';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const LessonTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lessons, setLessons] = useState([]); // State to store lessons data locally
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const toast = useToast();

  // Fetch lessons data initially
  const { data: fetchedData, error } = useSWR('/api/lessons', fetcher);

  // Update local state with fetched data
  useEffect(() => {
    if (fetchedData) {
      setLessons(fetchedData);
    }
  }, [fetchedData]);

  // Calculate pagination
  const lessonsPerPage = 10; // Number of lessons per page
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/lessons/${id}`);
      toast({
        title: 'Lesson deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Remove deleted lesson from local state
      setLessons(lessons.filter((lesson) => lesson.id !== id));
      setIsDeleteModalOpen(false); // Close delete modal after deletion
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Failed to delete lesson',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setLessons(fetchedData); // Reset to original data if search term is empty
    } else {
      // Filter lessons based on search term
      const filteredLessons = fetchedData.filter(
        (lesson) =>
          lesson.lesson_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.lesson_types.type_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLessons(filteredLessons);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddClick = () => {
    setSelectedLesson(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      // Refresh data after saving
      const response = await axios.get('/api/lessons');
      setLessons(response.data);
      toast({
        title: selectedLesson ? 'Lesson updated successfully' : 'Lesson added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleModalClose(); // Close the modal after save
    } catch (error) {
      console.error('Error saving lesson:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to save lesson',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (error) return <div>Error loading data...</div>;
  if (!fetchedData) return <div>Loading...</div>;

  // Calculate total number of pages
  const totalPages = Math.ceil(lessons.length / lessonsPerPage);

  return (
    <Box p="4">
      <Flex justify="space-between" alignItems="center">
        <Text align="center" fontSize="3xl" fontWeight={600} py={6}>
          Lessons Management
        </Text>
        <Flex alignItems="center">
          <InputGroup mr={4} maxW="300px">
            <InputLeftElement pointerEvents="none">
              <Search />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button leftIcon={<Plus />} colorScheme="green" variant="outline" onClick={handleAddClick}>
            Add
          </Button>
        </Flex>
      </Flex>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Feature Image</Th>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th colSpan={3}>Action</Th>
          </Tr>
        </Thead>
        {currentLessons.length === 0 ? (
          <Tbody>
            <Tr>
              <Td colSpan={7}>
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                >
                  <AlertCircle />
                  No data found
                </Alert>
              </Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>
            {currentLessons.map((lesson) => (
              <Tr key={lesson.id}>
                <Td>{lesson.id}</Td>
                <Td>
                  <Image src={`/uploads/lessons/${lesson.feature_img}`} height='159px' />
                </Td>
                <Td>{lesson.lesson_name}</Td>
                <Td>{lesson.lesson_types.type_name}</Td>
                <Td>
                  <IconButton size='sm' colorScheme="gray" onClick={() => handleEditClick(lesson)}>
                  <Edit2 />
                  </IconButton>
                </Td>
                <Td>
                  <IconButton
                    icon={<X />}
                    colorScheme="red"
                    size='sm'
                    aria-label="Delete lesson"
                    onClick={() => {
                      setLessonToDelete(lesson);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Flex justify="center" mt={4}>
          <Button
            mr={2}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              mx={1}
              variant={currentPage === index + 1 ? 'solid' : 'outline'}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button ml={2} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Flex>
      )}

      {/* Modal for LessonForm */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedLesson ? 'Edit Lesson' : 'Add Lesson'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LessonForm
              lessonData={selectedLesson}
              onClose={handleModalClose}
              onSave={handleSave}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal for Deleting Lesson */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this lesson? Evaluation data that related to this lesson will be delete.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleDelete(lessonToDelete.id)}>
              Delete
            </Button>
            <Button ml={3} onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LessonTable;
