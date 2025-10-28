// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../api/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create form data as required by OAuth2PasswordRequestForm
      const formData = new FormData();
      formData.append("username", email); // OAuth2 uses 'username' field
      formData.append("password", password);

      const response = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      // Fetch user details
      const userResponse = await api.get("/users/me");
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      toast({
        title: "Login Successful",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.detail || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth="1px" borderRadius="md" boxShadow="sm">
      <Heading size="md" mb={4} textAlign="center">
        CogniWork — Sign in
      </Heading>

      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button type="submit" width="full" colorScheme="blue" isLoading={loading}>
            Login
          </Button>

          <Link as={RouterLink} to="/signup" color="blue.500" fontSize="sm">
            Don't have an account? Sign up
          </Link>
        </VStack>
      </form>
    </Box>
  );
}
