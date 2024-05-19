import { Hono } from 'hono';
import { fakeExpenses } from './fake-expenses';
import { createPostSchema } from '../../schemas/expenses';
import { zValidator } from '@hono/zod-validator';

export const expensesRoute = new Hono()
  // GET
  .get('/', (c) => c.json({ expenses: fakeExpenses }))
  .get('/:id{[0-9+]}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  })
  .get('/total-spent', (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );
    return c.json({ total });
  })

  // POST
  .post('/', zValidator('json', createPostSchema), async (c) => {
    const expense = c.req.valid('json');
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })

  // PUT
  .put('/:id{[0-9+]}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  })

  // DELETE
  .delete('/:id{[0-9+]}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const expense = fakeExpenses.splice(index, 1)[0];

    return c.json({ expense });
  });
