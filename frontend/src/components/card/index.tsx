import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { api } from '@/lib/api.ts';
import { useQuery } from '@tanstack/react-query';

async function getTotalSpent() {
  try {
    const response = await api.expenses['total-spent'].$get();
    if (!response.ok)
      throw new Error('Server error: Failed to get total spent');
    const totalSpent = await response.json();
    return totalSpent;
  } catch (error) {
    console.log(error);
  }
}

export default function CardComponent() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  });

  if (isLoading) return 'Loading...';
  if (error) return `An error occurred : ${error.message}`;

  return (
    <Card className="max-w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{data?.total}</CardContent>
    </Card>
  );
}
