# MSD AI interview practice

Small TypeScript + LangChain + Gemini RAG project, built interactively.
All documents are fictional and are not MSD policies.

## Current stage

The prototype implements permission-filtered embedding retrieval and LangChain
Gemini answer generation, with response shape and citation-ID validation.
It uses gemini-embedding-001 for vectors and gemini-3.1-flash-lite for answers.
The service rejected gemini-2.5-flash for this new user. Its recommended model,
gemini-3.8-flash, timed out. A direct request to gemini-3.1-flash-lite succeeded.
Documents are already small chunks; vectors are computed in memory on each run.
No vector database, answer cache, production authentication, or tools are included.

Run `npm install`, then `npm run typecheck` and `npm start` from this folder.

For a fresh setup, create `.env` from `.env.example` and add a Gemini API key
locally. Do not share the key in chat. Never commit `.env`.

## Remaining work

1. Walk through and explain the implementation independently.
2. Return to Question 64 and six deferred cases: retrieval, missing information,
   old version, injection, citations, permission denial.
3. Finish the no-hints AI mock interview.

The local demo identity is not production authentication. Model instructions alone
do not guarantee resistance to prompt injection. A valid citation ID alone does
not prove that an answer is supported by its source.

Conceptual coverage remains approximately 88%; this is not a hands-on score.
Target: finish AI preparation November 15, before the November 20 interview.

Integration reference: https://docs.langchain.com/oss/javascript/integrations/chat/google

Retrieval reference: https://ai.google.dev/gemini-api/docs/embeddings

Use `npm start -- "Your question"` for a manual run. Each run calls the provider.
A top-ranked document is not necessarily relevant; the model must abstain when
the retrieved facts do not answer the question. The six evaluation cases remain deferred.

## Verified run — November 14, 2026

`npm run typecheck` passed. `npm start` completed with exit code 0.
The real embedding calls ranked Leave-Policy-2026 (0.790) before
Remote-Work-2026 (0.632). LangChain + Gemini returned:

```json
{"answer":"Employees receive 25 days of annual leave per calendar year.","sources":["Leave-Policy-2026"]}
```

This is one successful manual end-to-end run, not proof that all cases pass.
No automated tests or no-hints mock interview have been completed.
