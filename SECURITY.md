# 🔒 PEOS SECURITY RULES - CHAR DEWARI
Owner: Arif GM Sahib
Version: v1.0.4-secure
Rule: No AI agent can edit server.cjs, README.md, PROJECT_BOOK.md without owner consent.
1. Read AppContext.jsx top 20 lines first
2. Never expose .env keys
3. Never create nested peos/peos folders
4. All new projects ONLY in src/subprojects/
5. Before Vercel upload -> npm run build check must
