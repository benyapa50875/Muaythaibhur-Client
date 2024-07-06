import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  VStack,
  Textarea,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { Edit2, Eye, X } from "lucide-react";

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Evaluation Playback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <video controls style={{ width: "100%" }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
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

const EditEvaluationModal = ({
  isOpen,
  onClose,
  evaluation,
  onSave,
  newScore,
  setNewScore,
  suggestion,
  setSuggestion,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Evaluation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="flex-start" spacing={4}>
            <Text fontWeight={600}>Score</Text>
            <Input
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
            />
            <Text fontWeight={600}>Suggestion</Text>
            <Textarea
              rows={5}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            Save Changes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DeleteEvaluationModal = ({
  isOpen,
  onClose,
  onDelete,
  evaluation,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Evaluation
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this evaluation? This action cannot
            be undone.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const EvaluationList = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const toast = useToast();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get("/api/evaluation");
      setEvaluations(response.data);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch evaluations.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateScore = async () => {
    try {
      await axios.put(`/api/evaluation/${selectedEvaluation.id}`, {
        score: newScore,
        suggestion,
      });
      toast({
        title: "Score Updated",
        description: "Evaluation score updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchEvaluations();
      onCloseEditModal();
    } catch (error) {
      console.error("Error updating score:", error);
      toast({
        title: "Error",
        description: "Failed to update score.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteEvaluation = async () => {
    try {
      await axios.delete(`/api/evaluation/${selectedEvaluation.id}`);
      toast({
        title: "Evaluation Deleted",
        description: "Evaluation deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchEvaluations();
      onCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting evaluation:", error);
      toast({
        title: "Error",
        description: "Failed to delete evaluation.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenVideoModal = (videoUrl) => {
    setVideoUrl(videoUrl);
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoUrl("");
    setVideoModalOpen(false);
  };

  const handleOpenEditModal = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setNewScore(evaluation.score ? evaluation.score.toString() : "");
    setSuggestion(evaluation.suggestion ? evaluation.suggestion.toString() : "");
    onOpenEditModal();
  };

  const handleOpenDeleteModal = (evaluation) => {
    setSelectedEvaluation(evaluation);
    onOpenDeleteModal();
  };

  const handleCloseEditModal = () => {
    setSelectedEvaluation(null);
    onCloseEditModal();
  };

  const handleCloseDeleteModal = () => {
    setSelectedEvaluation(null);
    onCloseDeleteModal();
  };

  return (
    <Box p={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Manage Evaluations
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>User</Th>
            <Th>Lesson</Th>
            <Th>Score</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {evaluations.map((evaluation) => (
            <Tr key={evaluation.id}>
              <Td>{evaluation.id}</Td>
              <Td>
                {evaluation.user.firstname} {evaluation.user.lastname}
              </Td>
              <Td>{evaluation.lessons.lesson_name}</Td>
              <Td>{evaluation.score}</Td>
              <Td>
                <IconButton
                  variant="outline"
                  size="sm"
                  colorScheme="blue"
                  mr={2}
                  onClick={() => handleOpenVideoModal(`/uploads/evaluation/${evaluation.vdo}`)}
                >
                  <Eye />
                </IconButton>
                <IconButton
                  variant="outline"
                  size="sm"
                  mr={2}
                  onClick={() => handleOpenEditModal(evaluation)}
                >
                  <Edit2 />
                </IconButton>
                <IconButton
                  variant="outline"
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleOpenDeleteModal(evaluation)}
                >
                  <X />
                </IconButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit Evaluation Modal */}
      <EditEvaluationModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        evaluation={selectedEvaluation}
        onSave={handleUpdateScore}
        newScore={newScore}
        setNewScore={setNewScore}
        suggestion={suggestion}
        setSuggestion={setSuggestion}
      />

      {/* Delete Evaluation Modal */}
      <DeleteEvaluationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        evaluation={selectedEvaluation}
        onDelete={handleDeleteEvaluation}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        videoUrl={videoUrl}
      />
    </Box>
  );
};

export default EvaluationList;
