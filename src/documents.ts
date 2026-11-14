import { Document } from "@langchain/core/documents";

export type PolicyMetadata = {
  id: string;
  tenantId: string;
  active: boolean;
  allowedRoles: string[];
};

// All content is fictional. Metadata is controlled by the application,
// never extracted from instructions inside the document body.
export const documents: Document<PolicyMetadata>[] = [
  new Document({
    pageContent: "Employees receive 25 days of annual leave per calendar year.",
    metadata: { id: "Leave-Policy-2026", tenantId: "demo-company", active: true, allowedRoles: ["employee", "hr"] },
  }),
  new Document({
    pageContent: "Employees receive 20 days of annual leave per calendar year.",
    metadata: { id: "Leave-Policy-2025", tenantId: "demo-company", active: false, allowedRoles: ["employee", "hr"] },
  }),
  new Document({
    pageContent: "Employees may work remotely two days per week with manager approval.",
    metadata: { id: "Remote-Work-2026", tenantId: "demo-company", active: true, allowedRoles: ["employee", "hr"] },
  }),
  new Document({
    pageContent: "The fictional executive bonus budget is 900000 demo credits.",
    metadata: { id: "Confidential-HR-2026", tenantId: "demo-company", active: true, allowedRoles: ["hr"] },
  }),
];

export type DemoUser = { tenantId: string; roles: string[] };

// Local simulation only. A deployed app must derive this identity and its
// current permissions from authenticated server-side data, not user input.
export const demoEmployee: DemoUser = {
  tenantId: "demo-company",
  roles: ["employee"],
};

// Apply before retrieval or sending any document content to a model.
export function getEligibleDocuments(user: DemoUser) {
  return documents.filter(({ metadata }) =>
    metadata.tenantId === user.tenantId &&
    metadata.active &&
    metadata.allowedRoles.some((role) => user.roles.includes(role))
  );
}
