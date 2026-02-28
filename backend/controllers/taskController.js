const db = require("../config/db");

exports.getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.createTask = (req, res) => {
  const { title, status, priority } = req.body;

  db.query(
    "INSERT INTO tasks (title, status, priority, user_id) VALUES (?, ?, ?, ?)",
    [title, status, priority, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task Created" });
    }
  );
};

exports.updateTask = (req, res) => {
  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [req.body.status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
};

exports.deleteTask = (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
};