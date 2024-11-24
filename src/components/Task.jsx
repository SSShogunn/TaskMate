import { format, isPast } from "date-fns"

const Task = ({ id, title, description, date, completed, onToggle, onSelect, onEdit, onDelete }) => {
    const formattedDate = format(new Date(date), 'MMM d, yyyy');
    const isOverdue = isPast(new Date(date)) && !completed;

    return (
        <div className={`mb-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 
            ${completed
                ? "border-green-500"
                : isOverdue
                    ? "border-red-500"
                    : "border-yellow-500"
            } 
            ${completed
                ? 'line-through text-gray-500 bg-gray-200'
                : 'text-gray-900'}`
        }>
            <div className={`flex items-center space-x-4 `}>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1 truncate" onClick={() => onSelect()}>
                    <h3 className={`text-lg font-medium ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 truncate">{description}</p>
                    <p className="mt-2 text-xs text-gray-500">{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default Task;