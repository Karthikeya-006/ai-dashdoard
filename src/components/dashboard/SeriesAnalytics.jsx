import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"
import { motion } from "framer-motion"

const COLORS = ["#6366F1", "#F59E0B", "#10B981"]

const SeriesAnalytics = ({ tasks }) => {

  // ✅ SAFE DEFAULT STRUCTURE
  const safeTasks = tasks || {
    todo: [],
    inProgress: [],
    done: []
  }

  const todo = safeTasks.todo?.length || 0
  const inProgress = safeTasks.inProgress?.length || 0
  const done = safeTasks.done?.length || 0

  const total = todo + inProgress + done
  const progress = total ? Math.round((done / total) * 100) : 0

  const pieData = [
    { name: "Todo", value: todo },
    { name: "In Progress", value: inProgress },
    { name: "Done", value: done },
  ]

  const weeklyData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: 6 },
    { day: "Fri", tasks: done },
  ]

  return (
    <div className="mt-12">

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl"
        >
          <h3 className="text-sm opacity-80">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2">{total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl text-white shadow-xl"
        >
          <h3 className="text-sm opacity-80">In Progress</h3>
          <p className="text-3xl font-bold mt-2">{inProgress}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-400 to-emerald-600 p-6 rounded-2xl text-white shadow-xl"
        >
          <h3 className="text-sm opacity-80">Completion</h3>
          <p className="text-3xl font-bold mt-2">{progress}%</p>
        </motion.div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* PIE */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-bold mb-4">Completion Rate</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div className="bg-white p-6 rounded-2xl shadow-xl col-span-2">
          <h2 className="text-lg font-bold mb-4">Weekly Productivity</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* BAR */}
      <div className="bg-white p-6 rounded-2xl shadow-xl mt-10">
        <h2 className="text-lg font-bold mb-4">Task Breakdown</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pieData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default SeriesAnalytics