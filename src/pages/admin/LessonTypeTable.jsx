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
} from '@chakra-ui/react';
import { Edit2, List, Plus, X, Search, AlertCircle } from 'lucide-react'; // Assuming lucid-react components
import useSWR from 'swr';
import axios from 'axios';
import LessonTypeForm from '../../components/admin/LessonTypeForm';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const LessonTypesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lessons, setLessons] = useState([]); // State to store lessons data locally
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [selectedLessonType, setSelectedLessonType] = useState(null); // State for selected lesson type
  const toast = useToast();

  // Fetch lessons data initially
  const { data: fetchedData, error } = useSWR('/api/lessontypes', fetcher);

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
      await axios.delete(`/api/lessontypes/${id}`);
      toast({
        title: 'Lesson type deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Remove deleted lesson from local state
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Failed to delete lesson type',
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
          lesson.type_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLessons(filteredLessons);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAdd = () => {
    setSelectedLessonType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lessonType) => {
    setSelectedLessonType(lessonType);
    setIsModalOpen(true);
  };

  if (error) return <div>Error loading data...</div>;
  if (!fetchedData) return <div>Loading...</div>;

  // Calculate total number of pages
  const totalPages = Math.ceil(lessons.length / lessonsPerPage);

  return (
    <Box p="4">
      <Flex justify="space-between" alignItems="center">
        <Text align="center" fontSize="3xl" fontWeight={600} py={6}>
          Lesson Types Management
        </Text>
        <Flex alignItems="center">
          <InputGroup mr={4} maxW="300px">
            <InputLeftElement pointerEvents="none">
              <Search />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search lesson types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button leftIcon={<Plus />} colorScheme="green" variant="outline" onClick={handleAdd}>
            Add
          </Button>
        </Flex>
      </Flex>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type Name</Th>
            <Th colSpan={2}>Action</Th>
          </Tr>
        </Thead>
        {currentLessons.length === 0 ? (
          <Tbody>
            <Tr>
              <Td colSpan={7}>
                <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
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
                <Td>{lesson.type_name}</Td>
                <Td>
                  <IconButton size='sm' icon={<Edit2 />} colorScheme="gray" onClick={() => handleEdit(lesson)} />
                </Td>
                <Td>
                  <IconButton
                    icon={<X />}
                    colorScheme="red"
                  
                    aria-label="Delete lesson type"
                    size='sm'
                    onClick={() => handleDelete(lesson.id)}
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

      {/* Modal for adding/updating lesson type */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedLessonType ? 'Update Type' : 'Create Type'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LessonTypeForm
              lessonType={selectedLessonType}
              onSuccess={(newLessonType) => {
                if (selectedLessonType) {
                  setLessons(lessons.map((lesson) => (lesson.id === newLessonType.id ? newLessonType : lesson)));
                } else {
                  setLessons([...lessons, newLessonType]);
                }
                setIsModalOpen(false);
                toast({
                  title: `Lesson type ${selectedLessonType ? 'updated' : 'created'} successfully`,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LessonTypesTable;
