const PriorityFilter = ({ value, onChange }) => {
    return (
        <div className="priority-filter">
            <label htmlFor="priority-filter">
                Priority
            </label>

            <select
                id="priority-filter"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    );
};

export default PriorityFilter;