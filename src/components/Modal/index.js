import { memo, useState } from "react";
import notify from "../../assets/js/toast";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useDispatch } from "react-redux";
import { add } from "../../redux/features";
function Modal({ onState, onCancel }) {
    const [todoInput, setTodoInput] = useState("");
    const [checked, setChecked] = useState();
    const dispatch = useDispatch();
    const options = [
        {
            id: 0,
            name: "TODO",
        },
        {
            id: 1,
            name: "IN PROGRESS",
        },
        {
            id: 2,
            name: "DONE",
        },
    ];

    function AddNewTodo(e) {
        let data = {
            id: uuidv4(),
            title: todoInput,
            createAt: moment().format("LLL"),
            option: checked,
        };

        if (data.title && data.option?.toString()) {
            notify(true, "Add new success");
            setTodoInput("");
            setChecked();
            dispatch(add(data));
            onCancel();
        } else {
            notify(false, "Please enter all fields");
        }
    }

    return (
        <div
            className={`bg-overlay ${
                onState ? "hidden-overlay" : "show-overlay"
            }`}
        >
            <div className="modal-content">
                <div className="title">CREATE NEW TASK</div>

                <div className="choose-column-task">
                    {options.map((option) => (
                        <div className="choose-column" key={option.id}>
                            <input
                                type="radio"
                                checked={checked === option.id}
                                onChange={() => setChecked(option.id)}
                                id={option.id}
                            />
                            <label htmlFor={option.id}>{option.name}</label>
                        </div>
                    ))}
                </div>
                <input
                    type="search"
                    placeholder="Enter your task..."
                    className="input-data"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                />
                <div className="modal-btn">
                    <button className="btn" onClick={AddNewTodo}>
                        Save
                    </button>
                    <button className="btn btn-outline" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
export default memo(Modal);
