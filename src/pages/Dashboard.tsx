import { Heading, VStack, HStack } from "@chakra-ui/react";
import { useDebts } from "../hooks/useDebts";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import DebtForm from "../components/DebtForm";
import DebtTable from "../components/DebtTable";
import PageLayout from "../components/PageLayout";
import EditDebtDrawer from "../components/EditDebtDrawer";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import InterestPieChart from "../components/InterestPieChart";
import PayoffTimelineChart from "../components/PayoffTimelineChart";
import SummaryCard from "../components/SummaryCard";
import { useState } from "react";
import type { Debt } from "../types/DebtTypes";

export default function Dashboard() {
  const { user } = useAuth();
  const { debts, setDebts, addDebt } = useDebts(user?.username);

  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [debtToDelete, setDebtToDelete] = useState<Debt | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;

  // ---- Editing ----
  const handleEditDebt = (debt: Debt) => {
    setEditingDebt(debt);
    setDrawerOpen(true);
  };

  const handleSaveDebt = (updated: Debt) => {
    const updatedList = debts.map((d) =>
      d.id === updated.id ? updated : d
    );
    setDebts(updatedList);
  };

  // ---- Deleting ----
  const requestDeleteDebt = (debt: Debt) => {
    setDebtToDelete(debt);
    setDeleteModalOpen(true);
  };

  const confirmDeleteDebt = () => {
    if (!debtToDelete) return;
    const updated = debts.filter((d) => d.id !== debtToDelete.id);
    setDebts(updated);
    setDebtToDelete(null);
    setDeleteModalOpen(false);
  };

  // ---- Summary Stats ----
  const totalDebt = debts.reduce((sum, d) => sum + d.total, 0);
  const totalMonthlyPayment = debts.reduce((sum, d) => sum + d.payment, 0);
  const totalInterest = debts.reduce((sum, d) => sum + d.interestPaid, 0);

  return (
    <PageLayout>
      <Heading mb={8}>Welcome, {user.username}</Heading>

      <VStack spacing={6} align="stretch">

        {/* Summary Cards */}
        <HStack spacing={4} flexWrap="wrap">
          <SummaryCard
            label="Total Debt"
            value={`$${totalDebt.toLocaleString()}`}
          />
          <SummaryCard
            label="Total Monthly Payments"
            value={`$${totalMonthlyPayment.toLocaleString()}`}
          />
          <SummaryCard
            label="Total Interest"
            value={`$${totalInterest.toLocaleString()}`}
          />
        </HStack>

        {/* Pie Chart */}
        <InterestPieChart debts={debts} />

        {/* Payoff Timeline */}
        <PayoffTimelineChart debts={debts} />

        {/* Form + Table */}
        <DebtForm addDebt={addDebt} />
        <DebtTable
          debts={debts}
          onEdit={handleEditDebt}
          onDelete={(id) => {
            const debt = debts.find((d) => d.id === id);
            if (debt) requestDeleteDebt(debt);
          }}
        />
      </VStack>

      {/* Drawer for Editing */}
      <EditDebtDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        debt={editingDebt}
        onSave={handleSaveDebt}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteDebt}
      />
    </PageLayout>
  );
}
