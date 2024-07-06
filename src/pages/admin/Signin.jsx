import React, { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Alert, AlertIcon, Heading, IconButton } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/admin/login", formData);
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/homepage"); // Redirect to the home page or another protected route
    } catch (error) {
      setError(error.response?.data.message || "Login failed");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box py={8} px={20}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Heading>Admin Sign In</Heading>
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
        <Button type="submit" bg="#B50000" color="white" w='full'>
          Sign In
        </Button>
      </VStack>
    </Box>
  );
}

export default AdminSignIn;
