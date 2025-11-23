import { useState } from "react";
import {
  Box,
  Input,
  Button,
  HStack,
  VStack,
  Heading,
  Select,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface Props {
  addDebt: (
    total: number,
    rate: number,
    payment: number,
    name: string,
    type: string,
    notes?: string
  ) => void;
}

export default function DebtForm({ addDebt }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Credit");
  const [total, setTotal] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name || !total || !rate || !payment) return;

    addDebt(
      parseFloat(total),
      parseFloat(rate),
      parseFloat(payment),
      name,
      type,
      notes
    );

    setName("");
    setType("Credit");
    setTotal("");
    setRate("");
    setPayment("");
    setNotes("");
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Heading size="md" mb={4}>Add New Debt</Heading>

      <VStack spacing={4} align="stretch">

        <FormControl>
          <FormLabel>Debt Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Chase Visa, Car Loan, Mortgage"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Type of Debt</FormLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Credit">Credit</option>
            <option value="Mortgage">Mortgage</option>
            <option value="Car">Car</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <HStack>
          <FormControl>
            <FormLabel>Total Debt</FormLabel>
            <Input
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="10000"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Interest Rate (%)</FormLabel>
            <Input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="7"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Monthly Payment</FormLabel>
            <Input
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              placeholder="300"
            />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Notes (Optional)</FormLabel>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any comments..."
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
}
