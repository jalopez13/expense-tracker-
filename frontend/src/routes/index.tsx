import { createFileRoute } from '@tanstack/react-router';
import CardComponent from '@/components/card';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <CardComponent />
    </div>
  );
}
