export default function handler(req, res) {
  const tasks = [
    { id: 1, name: "AISF_Bot_Auto", status: "active" },
    { id: 2, name: "iphone-backup-engine-pro", status: "tested-working" },
    { id: 3, name: "new", status: "ready" },
    { id: 4, name: "PEOS_Test_01", status: "ready" },
    { id: 5, name: "PEOS_Winning_Project", status: "winning" },
    { id: 6, name: "project1", status: "ready" },
    { id: 7, name: "test", status: "ready" }
  ];
  res.status(200).json({ version: "v1.0.4-secure", count: tasks.length, tasks });
}
