import { Box, Text, useColorModeValue } from "@chakra-ui/react";

interface SummaryCardProps {
  label: string;
  value: string | number;
}

export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
    >
      <Text fontSize="md" color="gray.500" mb={1}>
        {label}
      </Text>

      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
    </Box>
  );
}
