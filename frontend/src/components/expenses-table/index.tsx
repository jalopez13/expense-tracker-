import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { api } from '@/lib/api.ts';
import { useQuery } from '@tanstack/react-query';
import ExpensesSkeleton from '@/components/skeleton';

async function getExpenses() {
  try {
    const response = await api.expenses.$get();
    if (!response.ok) throw new Error('Server error: Failed to get expenses');
    const expenses = await response.json();
    return expenses;
  } catch (error) {
    console.log(error);
  }
}

export default function ExpensesTable() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['get-expenses'],
    queryFn: getExpenses,
  });

  if (error) return `An error occurred : ${error.message}`;

  return (
    <Table>
      <TableCaption>A list of all of your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <ExpensesSkeleton />
                  </TableCell>
                  <TableCell>
                    <ExpensesSkeleton />
                  </TableCell>
                  <TableCell>
                    <ExpensesSkeleton />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map(({ id, title, amount }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
