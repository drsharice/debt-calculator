import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      maxW="900px"
      mx="auto"
      pt={10}
      px={6}
    >
      {children}
    </Box>
  );
}
