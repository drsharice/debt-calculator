import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Debt } from "../types/DebtTypes";

interface Props {
  debts: Debt[];
}

export default function PayoffTimelineChart({ debts }: Props) {
  const data = debts.map((d) => ({
    name: d.name,
    payoff: new Date(d.payoffDate).getTime(),
    displayDate: d.payoffDate,
  }));

  // Sort debts by payoff date
  data.sort((a, b) => a.payoff - b.payoff);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      mt={8}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
    >
      <Heading size="md" mb={4}>
        Payoff Timeline
      </Heading>

      {data.length === 0 ? (
        <Box>No debts to display.</Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip formatter={(val) => new Date(val as number).toLocaleDateString()} />
            <Bar dataKey="payoff" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
