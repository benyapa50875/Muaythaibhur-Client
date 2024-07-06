import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';  // Make sure to import axios
import { Check } from "lucide-react";

function LessonCard({ lesson }) {
  const { id, lesson_name, lesson_types, excerpt, feature_img } = lesson;
  const [evaluate, setEvaluate] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEva();
  }, [id]);

  const fetchEva = async () => {
    try {
      const response = await axios.get(`/api/evaluation/byuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvaluate(response.data.length > 0 ? response.data[0] : null);
    } catch (error) {
      console.error("Error fetching evaluation:", error);
      setEvaluate(null); // Ensure evaluation state is reset on error
    }
  };

  return (
    <HStack mb={8} boxShadow="sm" p={4} bg="#DDDDDD" borderRadius="lg">
      {/* Lesson Details */}
      <Box flex="2" p={4}>
        <VStack align="start" spacing={4}>
          <Flex gap={4} alignItems='center'>
            <Text fontWeight="bold" fontSize="2xl">
              {lesson_name}{" "}
            </Text>
            <Badge bg="white" color="#B50000" px={4} py={2} borderRadius="42px">
              <Text>{lesson_types.type_name}</Text>
            </Badge>
          </Flex>

          <Text>{excerpt}</Text>
          {
            evaluate ?
          (
            <Button
            as={RouterLink}
            to={`/lessons/${id}`}
            borderRadius="42px"
            bg="green.600"
            color="white"
            leftIcon={<Check />}
          >
           Done
          </Button>
          ):(
            <Button
            as={RouterLink}
            to={`/lessons/${id}`}
            borderRadius="42px"
            bg="#B80000"
            color="white"
          >
           Learn
          </Button>
          )
          }

        </VStack>
      </Box>
      <Flex justify="end">
        <Image
          src={`/uploads/lessons/${feature_img}`}
          boxSize="50%"
          alt={lesson_name}
        />
      </Flex>
    </HStack>
  );
}

export default LessonCard;
