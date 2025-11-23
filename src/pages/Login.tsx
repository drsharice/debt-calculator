import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const result = login(username, password);
    if (!result.success) return setError(result.message || "Login failed.");
    navigate("/dashboard");
  };

  const handleRegister = () => {
    const result = register(username, password);
    if (!result.success) return setError(result.message || "Registration failed.");
    navigate("/dashboard");
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={4} p={8} borderWidth="1px" borderRadius="lg" width="350px">
        <Heading>Login</Heading>

        {error && <Text color="red.500">{error}</Text>}

        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button colorScheme="blue" width="100%" onClick={handleLogin}>
          Login
        </Button>

        <Button colorScheme="green" width="100%" onClick={handleRegister}>
          Create User
        </Button>
      </VStack>
    </Box>
  );
}
