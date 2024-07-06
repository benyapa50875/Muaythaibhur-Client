import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Image, Text, VStack, Button, Heading } from "@chakra-ui/react";
import LessonCard from "../../components/user/lessons/LessonCard";

function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/lessons");
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  return (
    <Box p={8}>
        <Heading pb={4}>Lessons</Heading>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </Box>
  );
}

export default Lessons;
