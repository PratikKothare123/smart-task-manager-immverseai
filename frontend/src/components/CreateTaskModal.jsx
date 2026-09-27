import TaskForm from "./TaskForm";

const CreateTaskModal = ({ onClose, onSuccess }) => {
    const handleSuccess = () => {
        onSuccess();
    };

    return (
        <div className="modal-overlay">

            <div className="modal-container">

                <TaskForm
                    onSuccess={handleSuccess}
                    onCancel={onClose}
                />

            </div>

        </div>
    );
};

export default CreateTaskModal;