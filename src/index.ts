import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { demoEmployee } from './documents.js';
import { answerQuestion } from './rag.js';
config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });
process.env.LANGSMITH_TRACING = 'false';
process.env.LANGCHAIN_TRACING_V2 = 'false';
const question = process.argv.slice(2).join(' ') || 'How many annual leave days do employees receive?';
try {
  console.log('Question:', question);
  console.log(JSON.stringify(await answerQuestion(question, demoEmployee), null, 2));
} catch (error) {
  // Never dump provider errors, which may include request data or credentials.
  const message = error instanceof Error ? error.message : '';
  const safe = /^(Embedding request failed: HTTP \d+|Missing GOOGLE_API_KEY|Invalid embedding response|Embedding dimensions differ|Question must contain 1–2000 characters|Invalid answer structure|Invalid answer fields|Document access or version changed; retry|Unrecognized citation; answer rejected)$/.test(message);
  const timedOut = /abort|timeout|timed out/i.test(message) || (error instanceof Error && /Abort|Timeout/.test(error.name));
  console.error(timedOut ? 'Gemini request timed out; no answer generated.' : safe ? message : 'Request failed. Check model availability, quota, connectivity, or response format. Provider error details withheld.');
  process.exitCode = 1;
}
