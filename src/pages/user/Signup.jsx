import React, { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Alert, AlertIcon, Image, useToast, Heading, IconButton } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    avatar: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post("/api/auth/register", form);
      toast({
        title: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      setError(error.response?.data.message || "Registration failed");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box p={8}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
      <Heading>Sign Up</Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton variant='ghost' size="sm" onClick={toggleShowPassword}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton variant='ghost' size="sm" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="firstname" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input type="text" name="firstname" onChange={handleChange} />
        </FormControl>
        <FormControl id="lastname" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name="lastname" onChange={handleChange} />
        </FormControl>
        <FormControl id="avatar">
          <FormLabel>Avatar</FormLabel>
          <Input type="file" name="avatar" onChange={handleFileChange} />
        </FormControl>
        {avatarPreview && <Image src={avatarPreview} alt="Avatar Preview" boxSize="100px" />}
        <Button type="submit" bg="#B50000" color="white" w='full'>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}

export default SignUp;
