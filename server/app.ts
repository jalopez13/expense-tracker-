import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expenses';
import { serveStatic } from 'hono/bun';

// app init
const app = new Hono();

// middleware
app.use('*', logger());

// routes
app.route('/api/expenses', expensesRoute);

app.get('/', (c) => c.redirect('/api/expenses'));
app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
