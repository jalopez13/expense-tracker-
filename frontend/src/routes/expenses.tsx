import { createFileRoute } from '@tanstack/react-router';
import ExpensesTable from '@/components/expenses-table';

export const Route = createFileRoute('/expenses')({
  component: Expenses,
});

function Expenses() {
  return (
    <div className="container py-6 mx-auto">
      <h1 className="mb-6 text-4xl font-semibold">Expenses</h1>
      <ExpensesTable />
    </div>
  );
}
