import { Link } from '@tanstack/react-router';

export default function Navigation() {
  return (
    <nav className="container flex p-6 mx-auto space-x-4">
      <Link
        to="/"
        className="[&.active]:font-bold"
      >
        Home
      </Link>{' '}
      <Link
        to="/about"
        className="[&.active]:font-bold"
      >
        About
      </Link>
      <Link
        to="/expenses"
        className="[&.active]:font-bold"
      >
        Expenses
      </Link>
      <Link
        to="/create-expense"
        className="[&.active]:font-bold"
      >
        Create
      </Link>
    </nav>
  );
}
