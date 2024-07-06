import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Heading, Progress, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import UploadVideo from "../../components/user/evaluation/EvaluationDropzone";

function Evaluation() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [evaluate, setEvaluate] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
    fetchEva();
    
    const interval = setInterval(() => {
      fetchEva();
    }, 60000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/lessons/${id}`);
      setLesson(response.data);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      setLesson(null); // Ensure lesson state is reset on error
    }
  };

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

  if (!lesson) {
    return (
      <VStack p={8} spacing={4} align="center">
        <Heading size="lg">Loading...</Heading>
      </VStack>
    );
  }

  const { lesson_name } = lesson;
  const shouldUpload = !evaluate || !evaluate.vdo;

  return (
    <VStack p={8} spacing={4}>
      <Heading size="lg">
        <Text as="span" color="#B80000">
          {shouldUpload ? "Upload" : "View"}
        </Text>{" "}
        Your Practice Video to Begin Checking Your Postures
      </Heading>
      {shouldUpload ? (
        <>
          <UploadVideo lessonId={id} refetch={fetchEva} />
          <Heading>
            <Text as="span" color="#B80000">
              Lesson:{" "}
            </Text>{" "}
            {lesson_name}
          </Heading>
          <Text>
            Upload your training video and let our{" "}
            <Text as="span" color="#B80000" fontWeight={600}>
              modern assistant analyze
            </Text>{" "}
            the results and give you a score out of 10 with suggestions for
            improving your skills
          </Text>
        </>
      ) : (
        <VStack>
          <video controls style={{ maxWidth: "100%" }}>
            <source
              src={`/uploads/evaluation/${evaluate.vdo}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {evaluate.score !== null ? (
            <Flex direction="column" gap={4} py={4}>
              <Text fontWeight={600} py={4} textAlign="center" fontSize="2xl">
                <Text as="span" color="##B80000">
                  Accuracy{" "}
                </Text>
                Percentage
              </Text>

              <Text fontSize="3xl" fontWeight={600} textAlign="center">
                {evaluate.score} %
              </Text>
              <Progress
                colorScheme="red"
                height="32px"
                value={evaluate.score}
                mb={4}
              />
              <Text fontWeight={600}>Suggestion</Text>
              <Text>{evaluate.suggestion}</Text>
            </Flex>
          ) : (
            <Box py={4}>
              <Text textAlign="center" py={4} color="gray.500">
                Result processing...
              </Text>
              <Progress size="xs" isIndeterminate />
            </Box>
          )}
        </VStack>
      )}
    </VStack>
  );
}

export default Evaluation;
