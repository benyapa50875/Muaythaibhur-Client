import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import * as Yup from "yup";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const WebSetting = () => {
  const { data: webInfo, error, mutate } = useSWR("/api/webinfo", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValues, setFormValues] = useState({
    web_name: "",
    meta_description: "",
    favicon: null,
    feature_img: null,
  });

  const [errors, setErrors] = useState({
    web_name: "",
    meta_description: "",
  });

  const [selectedInfo, setSelectedInfo] = useState(null); // State to hold currently selected info for editing

  useEffect(() => {
    if (selectedInfo) {
      setFormValues({
        web_name: selectedInfo.web_name || "",
        meta_description: selectedInfo.meta_description || "",
        favicon: selectedInfo.favicon || null,
        feature_img: selectedInfo.feature_img || null,
      });
    }
  }, [selectedInfo]);

  const validationSchema = Yup.object().shape({
    web_name: Yup.string().required("Web Name is required"),
    meta_description: Yup.string().required("Meta Description is required"),
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormValues({
        ...formValues,
        [name]: files[0], // Handle file inputs
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("web_name", formValues.web_name);
      formData.append("meta_description", formValues.meta_description);
  
      // Check if new favicon is uploaded
      if (formValues.favicon) {
        formData.append("favicon", formValues.favicon);
      } else {
        formData.append("favicon", selectedInfo.favicon); // Use existing favicon
      }
  
      // Check if new feature_img is uploaded
      if (formValues.feature_img) {
        formData.append("feature_img", formValues.feature_img);
      } else {
        formData.append("feature_img", selectedInfo.feature_img); // Use existing feature_img
      }
  
      await axios.put(`/api/webinfo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      mutate(); // Refresh data after update
      onClose();
    } catch (error) {
      console.error("Error updating web info:", error);
    }
  };

  if (error) return <div>Error loading data</div>;
  if (!webInfo) return <Spinner size="xl" />; // Show spinner while data is loading

  return (
    <Box p="4">
      <Text align="center" fontSize="3xl" fontWeight={600} py={6}>
        Site Setting
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Feature Image</Th>
            <Th>Favicon</Th>
            <Th>Web Name</Th>
            <Th>Meta Description</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {webInfo.map((info) => (
            <Tr key={info.id}>
              <Td>
                <Image src={`/uploads/web_info/${info.feature_img}`} boxSize="sm" />
              </Td>
              <Td>
                <Image src={`/uploads/web_info/${info.favicon}`} />
              </Td>
              <Td>{info.web_name}</Td>
              <Td>{info.meta_description}</Td>
              <Td>
                <IconButton
                  colorScheme="gray"
                  size='sm'
                  onClick={() => {
                    setSelectedInfo(info);
                    onOpen();
                  }}
                ><Edit /></IconButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Web Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl
                isInvalid={errors.web_name && errors.web_name.length > 0}
              >
                <FormLabel htmlFor="web_name">Web Name</FormLabel>
                <Input
                  id="web_name"
                  name="web_name"
                  value={formValues.web_name}
                  onChange={handleChange}
                  placeholder="Web Name"
                />
                <Text color="red.500" fontSize="sm">
                  {errors.web_name}
                </Text>
              </FormControl>

              <FormControl
                mt={4}
                isInvalid={
                  errors.meta_description && errors.meta_description.length > 0
                }
              >
                <FormLabel htmlFor="meta_description">Meta Description</FormLabel>
                <Textarea
                  id="meta_description"
                  name="meta_description"
                  value={formValues.meta_description}
                  onChange={handleChange}
                  placeholder="Meta Description"
                />
                <Text color="red.500" fontSize="sm">
                  {errors.meta_description}
                </Text>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="favicon">Favicon</FormLabel>
                <Input
                  id="favicon"
                  name="favicon"
                  type="file"
                  onChange={handleChange}
                />
                {formValues.favicon && (
                  <div>
                    <Text>Current Favicon:</Text>
                    <Image
                      src={`/uploads/web_info/${formValues.favicon}`}
                      alt="Current Favicon"
                      boxSize="50px"
                      mt="2"
                    />
                  </div>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="feature_img">Feature Image</FormLabel>
                <Input
                  id="feature_img"
                  name="feature_img"
                  type="file"
                  onChange={handleChange}
                />
                {formValues.feature_img && (
                  <div>
                    <Text>Current Feature Image:</Text>
                    <Image
                      src={`/uploads/web_info/${formValues.feature_img}`}
                      alt="Current Feature Image"
                      boxSize="50px"
                      mt="2"
                    />
                  </div>
                )}
              </FormControl>

              <Button
                mt={4}
                colorScheme="blue"
                isLoading={false} // Handle loading state manually
                type="submit"
              >
                Save Changes
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WebSetting;
