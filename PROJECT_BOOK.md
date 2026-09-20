\# PEOS v3.2 - PROJECT BOOK (FINAL)

\# Last Updated: Sep 2026 | Status: STABLE



\## 1. PROJECT KYA HAI?

PEOS = Project Execution Operating System

Kaam: AI se project ka folder banana, open karna, auto-heal aur auto-build.



\## 2. CORE KAHAN HAI? (File ka Maqsad)

| File / Folder | Maqsad Kya Hai? | Important? |

| :--- | :--- | :--- |

| \*\*server.cjs\*\* | \*\*MAIN ENGINE / DIL HAI.\*\* Backend API. Sab security (helmet, cors, rate-limit, isSafePath) isi me hai. Port 3001 pe chalta hai. | YES - CORE |

| \*\*src/App.jsx\*\* | Frontend UI. Dashboard, Add Project button, Projects list. | YES |

| \*\*src/subprojects/\*\* | Jahan AI ke projects bante hain. Har project = 1 folder. | DATA FOLDER |

| \*\*package.json\*\* | Dependencies (express, cors, helmet, etc) | CONFIG |

| \*\*vite.config.js\*\* | Frontend ko backend se jorne ke liye proxy | CONFIG |



\## 3. TASK MANAGER - Progress Kya Hai?

\- \[x] Project banana (Add Project) - DONE

\- \[x] Project delete karna - DONE

\- \[x] Project VS Code me kholna - DONE

\- \[x] Auto-Heal (README fix) - DONE

\- \[x] Auto-Build (index.js fix) - DONE

\- \[ ] Task Manager (todo/in-progress/done) - \*\*ABHI BAKI HAI\*\* -> Iske liye `tasks.json` banana padega

\- \[ ] AI AUTO feature - BAKI HAI



\## 4. PEOS KE MAIN FEATURES (Juda Juda)

1\. SECURE MODE: isSafePath() -> koi../ se bahar nahi ja sakta

2\. RATE LIMIT: 100 req / 15 min -> hacking se bachao

3\. AUTO-HEAL: Agar README kharab ho to dubara bana deta hai

4\. AUTO-BUILD: Agar index.js na ho to default code bana deta hai



\## 5. DUPLICATE FILES KA MASLA

HAAN mess tha! `server.cjs` me apne 2 dafa likha tha:

\- `/api/auto-heal` 2 dafa tha

\- `/api/auto-build` 2 dafa tha

Neeche wala insecure tha. \*\*Solution: Sirf mera diya hua FINAL server.cjs rakho, baqi delete.\*\*



\## 6. OPTIMIZATION \& SPACE KE LIYE

1\. `exec` command Windows ka hai, Vercel (Linux) pe fail hoga. Is liye Vercel pe Offline dikhata hai.

2\. `fs.writeFileSync` ki jagah `fs.promises.writeFile` use karo -> tez hoga.

3\. `src/subprojects` me purane test projects (TEST-001, etc) delete karo -> space khali hoga.

4\. Backend ko Render.com pe deploy karo, phir Vercel wala Online ho jayega.



\## 7. RUN KARNE KA TARIQA (KAM TAM)

Backend ON karna:

`node server.cjs`



Frontend ON karna (dusri terminal me):

`npm run dev`



Check karna:

\- Backend: http://localhost:3001/api/health -> {"status":"ok"}

\- Frontend: http://localhost:5173 -> AI Engine Online



\## 8. AGLE STEP KYA HAIN?

1\. PROJECT\_BOOK.md ko save karo

2\. Task Manager ke liye mujhe bolo, me `tasks.json` wala code de dunga

3\. Vercel ka link abhi use mat karo, localhost wala use karo

