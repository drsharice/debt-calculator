import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import {
  TriangleUpIcon,
  TriangleDownIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import type { Debt } from "../types/DebtTypes";
import { useState } from "react";

interface Props {
  debts: Debt[];
  onEdit: (debt: Debt) => void;
  onDelete: (id: number) => void;
}

type SortColumn = keyof Debt | null;

export default function DebtTable({ debts, onEdit, onDelete }: Props) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedDebts = [...debts].sort((a, b) => {
    if (!sortColumn) return 0;

    const valA = a[sortColumn];
    const valB = b[sortColumn];

    // Safe date sort
    if (sortColumn === "payoffDate") {
      const dateA =
        typeof valA === "string" ? new Date(valA) : new Date(0);
      const dateB =
        typeof valB === "string" ? new Date(valB) : new Date(0);

      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    // Numeric sort
    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    // Text sort
    return sortDirection === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const icon = (column: SortColumn) =>
    sortColumn === column ? (
      sortDirection === "asc" ? (
        <TriangleUpIcon ml={1} />
      ) : (
        <TriangleDownIcon ml={1} />
      )
    ) : null;

  return (
    <TableContainer borderWidth="1px" borderRadius="lg">
      <Table variant="simple">
        <Thead bg="gray.100">
          <Tr>
            <Th onClick={() => handleSort("name")} cursor="pointer">
              Name {icon("name")}
            </Th>
            <Th onClick={() => handleSort("type")} cursor="pointer">
              Type {icon("type")}
            </Th>
            <Th>Total</Th>
            <Th>Rate</Th>
            <Th>Payment</Th>
            <Th onClick={() => handleSort("payoffDate")} cursor="pointer">
              Payoff Date {icon("payoffDate")}
            </Th>
            <Th onClick={() => handleSort("interestPaid")} cursor="pointer">
              Interest Paid {icon("interestPaid")}
            </Th>
            <Th>Notes</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>

        <Tbody>
          {sortedDebts.map((d) => (
            <Tr key={d.id}>
              <Td>{d.name}</Td>
              <Td>{d.type}</Td>
              <Td>${d.total}</Td>
              <Td>{d.rate}%</Td>
              <Td>${d.payment}</Td>
              <Td>{d.payoffDate}</Td>
              <Td>${d.interestPaid}</Td>
              <Td>{d.notes || ""}</Td>

              <Td>
                <IconButton
                  aria-label="edit"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => onEdit(d)}
                />
              </Td>

              <Td>
                <IconButton
                  aria-label="delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(d.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
