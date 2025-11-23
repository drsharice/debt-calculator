import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <Box
        minH="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={6} textAlign="center">
          <Heading size="2xl">Debt Calculator App</Heading>

          <Text fontSize="lg" maxW="600px">
            Track your loans, calculate interest, and visualize your payoff timeline.
          </Text>

          <Button colorScheme="blue" size="lg" as={Link} to="/login">
            Get Started
          </Button>
        </VStack>
      </Box>
    </PageLayout>
  );
}
