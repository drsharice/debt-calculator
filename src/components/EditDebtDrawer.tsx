import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { Debt } from "../types/DebtTypes";
import { calculateMonthsToPayoff, calculateInterestPaid } from "../utils/math";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  debt: Debt | null;
  onSave: (updatedDebt: Debt) => void;
}

export default function EditDebtDrawer({ isOpen, onClose, debt, onSave }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Credit");
  const [total, setTotal] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (debt) {
      setName(debt.name);
      setType(debt.type);
      setTotal(String(debt.total));
      setRate(String(debt.rate));
      setPayment(String(debt.payment));
      setNotes(debt.notes || "");
    }
  }, [debt]);

  const handleSave = () => {
    if (!debt) return;

    const totalNum = parseFloat(total);
    const rateMonthly = parseFloat(rate) / 100 / 12;
    const paymentNum = parseFloat(payment);

    const months = calculateMonthsToPayoff(totalNum, rateMonthly, paymentNum);
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + Math.round(months));

    const interestPaid = calculateInterestPaid(totalNum, paymentNum, Math.round(months));

    const updated: Debt = {
      ...debt,
      name,
      type,
      total: totalNum,
      rate: parseFloat(rate),
      payment: paymentNum,
      payoffDate: payoffDate.toLocaleDateString(),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      notes,
    };

    onSave(updated);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Debt</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} mt={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
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

            <FormControl>
              <FormLabel>Total Debt</FormLabel>
              <Input value={total} onChange={(e) => setTotal(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Interest Rate (%)</FormLabel>
              <Input value={rate} onChange={(e) => setRate(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Monthly Payment</FormLabel>
              <Input value={payment} onChange={(e) => setPayment(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </FormControl>

            <HStack justify="end" w="100%" pt={4}>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                Save Changes
              </Button>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
