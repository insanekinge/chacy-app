const massive = require('massive');
const { connectionStr, schema } = require('../config/db');

module.exports = async () => {
  if (String(process.env.DISABLE_DB).toLowerCase() === 'true') {
    // Minimal in-memory stub to allow the app to run without a DB
    const memory = { users: [], posts: [], usersSeq: 1, postsSeq: 1 };

    const makeCollection = (key, seqKey) => ({
      insert: async (rows) => {
        const list = Array.isArray(rows) ? rows : [rows];
        const inserted = list.map((row) => {
          const withId = { ...row, id: memory[seqKey]++ };
          memory[key].push(withId);
          return withId;
        });
        return Array.isArray(rows) ? inserted : inserted[0];
      },
      save: async (row) => {
        if (row.id) {
          const idx = memory[key].findIndex((r) => r.id === Number(row.id));
          if (idx >= 0) {
            memory[key][idx] = { ...memory[key][idx], ...row };
            return memory[key][idx];
          }
        }
        const withId = { ...row, id: memory[seqKey]++ };
        memory[key].push(withId);
        return withId;
      },
      find: async () => [...memory[key]],
      findOne: async (where) => {
        const [[k, v]] = Object.entries(where);
        return memory[key].find((r) => r[k] === v) || null;
      },
      destroy: async (where) => {
        const [[k, v]] = Object.entries(where);
        const before = memory[key].length;
        memory[key] = memory[key].filter((r) => r[k] !== (typeof v === 'object' && v !== null ? v : v));
        return before - memory[key].length;
      }
    });

    const db = {
      users: makeCollection('users', 'usersSeq'),
      posts: makeCollection('posts', 'postsSeq'),
      query: async (sql, params, opts) => {
        const text = String(sql).toLowerCase();
        if (text.includes('from posts') && text.includes('left join users')) {
          const enrich = (p) => ({ ...p, author: (memory.users.find((u) => u.id === p.user_id) || {}).email });
          if (text.includes('where p.id=$1')) {
            const id = Number(params && params[0]);
            const p = memory.posts.find((r) => r.id === id);
            if (!p) return opts && opts.single ? null : [];
            return opts && opts.single ? enrich(p) : [enrich(p)];
          }
          return memory.posts.map(enrich);
        }
        // Default: return empty for unsupported ad-hoc queries
        return opts && opts.single ? null : [];
      },
      instance: { $pool: { end: async () => {} } }
    };

    return { db };
  }

  // connect to Massive and get the db instance
  const db = await massive(connectionStr, {
    // explicitly specify the used schemas
    allowedSchemas: [schema]
  });

  return { db };
};
