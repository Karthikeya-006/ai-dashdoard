import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import API from "../../services/api";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // FETCH TASKS FROM BACKEND
  // =========================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      const grouped = {
        todo: [],
        inProgress: [],
        done: [],
      };

      res.data.forEach((task) => {
        grouped[task.status].push(task);
      });

      setTasks(grouped);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // =========================
  // CREATE TASK
  // =========================
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await API.post("/tasks", {
        title: newTaskTitle,
        status: "todo",
        priority: "Medium",
      });

      setNewTaskTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // =========================
  // DRAG AND DROP UPDATE
  // =========================
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;

    if (sourceCol === destCol) return;

    const task = tasks[sourceCol][result.source.index];

    try {
      await API.put(`/tasks/${task.id}`, {
        status: destCol,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-6">
      {/* ADD TASK INPUT */}
      <div className="flex gap-3 mb-6">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* KANBAN BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-xl p-4 min-h-[500px]"
                >
                  <h2 className="text-lg font-bold mb-4 capitalize">
                    {columnId}
                  </h2>

                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;