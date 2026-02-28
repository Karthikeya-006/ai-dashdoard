import { useEffect, useState } from "react"
import axios from "axios"
import SeriesAnalytics from "../components/dashboard/SeriesAnalytics"

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  })

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [search, setSearch] = useState("")

  const token = localStorage.getItem("token")

  // 🔥 Fetch Tasks From Backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: 'Bearer ${token}',
        },
      })

      const allTasks = res.data

      setTasks({
        todo: allTasks.filter((t) => t.status === "todo"),
        inProgress: allTasks.filter((t) => t.status === "inProgress"),
        done: allTasks.filter((t) => t.status === "done"),
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // ✅ Add Task
  const addTask = async () => {
    if (!title) return alert("Title required")

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          status: "todo",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setTitle("")
      setDescription("")
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // ✅ Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // 🔍 Search Filter
  const filteredTasks = (list) =>
    list.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search task..."
        className="p-2 border rounded mb-6 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ➕ Add Task */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Task Title"
          className="p-2 border rounded w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="p-2 border rounded w-full mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* 📊 Analytics */}
      <SeriesAnalytics tasks={tasks} />

      {/* 📋 Task Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {["todo", "inProgress", "done"].map((status) => (
          <div key={status} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-4 capitalize">{status}</h2>

            {filteredTasks(tasks[status]).map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 p-3 rounded mb-3 flex justify-between"
              >
                <span>{task.title}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard