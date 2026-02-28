const TaskCard = ({ task, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Priority: {task.priority}
      </p>
    </div>
  );
};

export default TaskCard;