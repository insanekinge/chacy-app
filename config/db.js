// Prefer a full DATABASE_URL if provided, otherwise construct from individual parts.
const schema = 'public';

function buildConnectionString() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim()) {
    return process.env.DATABASE_URL.trim();
  }

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_ENABLE_SSL } = process.env;

  // Basic validation to avoid passing undefined into pg connection parser
  const missing = [];
  if (!DB_HOST) missing.push('DB_HOST');
  if (!DB_USER) missing.push('DB_USER');
  if (!DB_PASSWORD) missing.push('DB_PASSWORD');
  if (!DB_NAME) missing.push('DB_NAME');

  if (missing.length) {
    throw new Error(`Database configuration missing: ${missing.join(', ')}. Provide either DATABASE_URL or all DB_* variables in .env`);
  }

  const hostWithPort = `${DB_HOST}${DB_PORT ? `:${DB_PORT}` : ''}`;
  let str = `postgres://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${hostWithPort}/${DB_NAME}`;
  if (DB_ENABLE_SSL) str += '?ssl=true';
  return str;
}

const connectionStr = buildConnectionString();

module.exports = {
  connectionStr,
  schema
};
