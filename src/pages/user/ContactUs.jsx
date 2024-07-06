import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import ContactUsForm from "../../components/user/contactus/ContactUsForm";
import { Facebook, Instagram, Twitch, Twitter, X } from "lucide-react";
import { Link } from "react-router-dom";

function ContactUs() {
  const [entries, setEntries] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    fetchData();
    fetchContact();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/contactus");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching contact us entries:", error);
    }
  };

  const fetchContact = async () => {
    try {
      const response = await axios.get("/api/contactinfo");
      setContactInfo(response.data);
    } catch (error) {
      console.error("Error fetching contact information:", error);
    }
  };

  return (
    <Box p={10}>
      {entries.length > 0 &&
        entries.map((entry) => (
          <Flex
            key={entry.id}
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            mb={8}
          >
            {/* Hero Image */}
            <VStack alignItems="flex-start" w="full">
              <Image
                src={`/uploads/contact_us/${entry.img}`} // Ensure your entry has an `img` property
                boxSize={{ base: "100%", md: "100%" }}
                objectFit="cover"
                rounded={{ base: "none", md: "lg" }}
                mb={{ base: 4, md: 0 }}
              />
              <Flex gap={4}>
                {/* Social Media Links */}
                {contactInfo && (
                  <>
                    <IconButton
                      bg="#B80000"
                      color="white"
                      borderRadius={99}
                      as={Link}
                      to={contactInfo[0].facebook}
                      aria-label="Facebook"
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      bg="transparent"
                      color="#B80000"
                      borderRadius={99}
                      as={Link}
                      to={contactInfo[0].instagram}
                      aria-label="Instagram"
                    >
                      <Instagram />
                    </IconButton>
                    <IconButton
                      bg="transparent"
                      color="#B80000"
                      borderRadius={99}
                      as={Link}
                      to={contactInfo[0].x_twitter}
                      aria-label="Twitter"
                    >
                      <Twitter />
                    </IconButton>
                  </>
                )}
              </Flex>
            </VStack>

            {/* Text Content */}
            <VStack
              ml={{ base: 0, md: 8 }}
              mt={{ base: 4, md: 0 }}
              gap={12}
              alignItems="flex-start"
              w="full"
            >
              <Heading>
                Contact{" "}
                <Text as="span" color="#B80000">
                  Us
                </Text>
              </Heading>
              <ContactUsForm />
            </VStack>
          </Flex>
        ))}
      <Text fontSize="sm" pb={4}>
        License Agreement This software is a work developed by <Text as='span' fontWeight={600}>Ms.Benyapa
        Takhwankeaw</Text> and <Text as='span' fontWeight={600}>Ms.Chayanit Muneenam</Text> from <Text as='span' fontWeight={600}>Hatyaiwittayalai School</Text> under
        the provision of <Text as='span' fontWeight={600}>Mr.Pinyo Yonthanthum</Text> under <Text as='span' fontWeight={600} color='#B80000'>MuayThaiBhur :
        Web-application teaching media for postures in the art of Muay Thai,</Text> 
        which has been supported by the National Science and Technology
        Development Agency (NSTDA), in order to encourage pupils and students to
        learn and practice their skills in developing software. Therefore, the
        intellectual property of this software shall belong to the developer and
        the developer gives NSTDA a permission to distribute this software as an
        “as is” and non-modified software for a temporary and non-exclusive use
        without remuneration to anyone for his or her own purpose or academic
        purpose, which are not commercial purposes. In this connection, NSTDA
        shall not be responsible to the user for taking care, maintaining,
        training, or developing the efficiency of this software. Moreover, NSTDA
        shall not be liable for any error, software efficiency and damages in
        connection with or arising out of the use of the software.”
      </Text>
    </Box>
  );
}

export default ContactUs;
