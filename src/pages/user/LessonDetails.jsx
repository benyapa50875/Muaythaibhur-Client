import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";

function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/lessons/${id}`);
      setLesson(response.data);
    } catch (error) {
      console.error("Error fetching lesson:", error);
    }
  };

  if (!lesson) {
    return <Box>Loading...</Box>;
  }

  const { lesson_name, lesson_detail, lesson_types } = lesson;
  const { yt_url, paragraph1, paragraph2, paragraph3 } = lesson_detail[0];
  const { type_name } = lesson_types;

  // Options for the YouTube player
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <Box p={12}>
      <Box py={4}>
              <Heading as="h1" size="xl" mb={4}>
        {lesson_name}
      </Heading>
      <Badge bg="#B50000" color="white" px={4} py={2} borderRadius="42px">
        {type_name}
      </Badge>
      </Box>

      <YouTube videoId={getYoutubeId(yt_url)} opts={opts} />
      <VStack align="start" spacing={4} py={4}>
        <Text>{paragraph1}</Text>
        <Text>{paragraph2}</Text>
        <Text>{paragraph3}</Text>
      </VStack>
      <Flex justify='center'>
      <Button as={Link} to={`/lessons/evaluation/${id}`} borderRadius="42px" bg="#B50000" color="white" my={4}>Try</Button>
      </Flex>
    </Box>
  );
}

// Function to extract YouTube video ID from URL
function getYoutubeId(url) {
  // Extract video ID from URL
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\n\s]{11})$/;
  const match = url.match(regExp);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export default LessonDetail;
