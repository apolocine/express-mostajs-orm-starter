/**
 * Express + @mostajs/orm — blog starter.
 * Boots with no native binary via the sqljs (SQLite WASM) dialect.
 * @author Dr Hamid MADANI <drmdh@msn.com>
 */
import express from 'express';
import { getRepos } from './orm/repositories.js';
import { postDetailPage, postListPage } from './view.js';

const app = express();
app.use(express.json());

// --- HTML pages ---
app.get('/', async (_req, res) => {
  const { posts } = await getRepos();
  const list = await posts.findWithRelations({ published: true }, ['author', 'comments'], { sort: { createdAt: -1 }, limit: 20 });
  res.type('html').send(postListPage('Express', list as never));
});

app.get('/posts/:id', async (req, res) => {
  const { posts } = await getRepos();
  const post = await posts.findByIdWithRelations(req.params.id, ['author', 'comments']);
  if (!post) { res.status(404).type('html').send(postListPage('Express', [])); return; }
  res.type('html').send(postDetailPage('Express', post as never));
});

// --- JSON API ---
app.get('/api/posts', async (_req, res) => {
  const { posts } = await getRepos();
  res.json(await posts.findAll({ published: true }, { sort: { createdAt: -1 }, limit: 50 }));
});

app.get('/api/posts/:id', async (req, res) => {
  const { posts } = await getRepos();
  const post = await posts.findByIdWithRelations(req.params.id, ['author', 'comments']);
  if (!post) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(post);
});

app.post('/api/posts', async (req, res) => {
  const { posts } = await getRepos();
  const created = await posts.create({
    title: req.body.title, slug: req.body.slug, content: req.body.content,
    published: req.body.published ?? false, author: req.body.authorId,
  });
  res.status(201).json(created);
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`▲ Express + @mostajs/orm — http://localhost:${port}`));
