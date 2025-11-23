import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import type { Debt } from "../types/DebtTypes";

interface Props {
  debts: Debt[];
}

export default function InterestPieChart({ debts }: Props) {
  const totalPrincipal = debts.reduce((sum, d) => sum + d.total, 0);
  const totalInterest = debts.reduce((sum, d) => sum + d.interestPaid, 0);

  const data = [
    { name: "Principal", value: totalPrincipal },
    { name: "Interest", value: totalInterest },
  ];

  const COLORS = [
    useColorModeValue("#3182CE", "#63B3ED"), // blue
    useColorModeValue("#E53E3E", "#FC8181"), // red
  ];

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      mt={8}
      boxShadow="sm"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Heading size="md" mb={4}>
        Principal vs Interest Breakdown
      </Heading>

      <PieChart width={350} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </Box>
  );
}
