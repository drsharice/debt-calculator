import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={6}
      py={3}
      boxShadow="sm"
      mb={6}
    >
      <Flex justifyContent="space-between" alignItems="center">
        {/* Left Side */}
        <HStack spacing={4}>
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
          />

          <Button
            as={RouterLink}
            to="/dashboard"
            variant="link"
            fontWeight="bold"
            fontSize="lg"
          >
            Debt Calculator
          </Button>
        </HStack>

        {/* Desktop Navigation */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Text fontWeight="semibold">Hello, {user?.username}</Text>

          <IconButton
            aria-label="Toggle theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />

          <Button colorScheme="red" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <Button
                as={RouterLink}
                to="/dashboard"
                variant="ghost"
                onClick={onClose}
              >
                Dashboard
              </Button>

              <Button
                leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
              >
                {colorMode === "light" ? "Dark Mode" : "Light Mode"}
              </Button>

              <Button colorScheme="red" variant="solid" onClick={handleLogout}>
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
