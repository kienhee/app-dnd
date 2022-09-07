import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { edit, dltData } from "../../redux/features";
import notify from "../../assets/js/toast";
const Card = ({ id, option, title, createAt, onDelete }) => {
    const [dataEdit, setDataEdit] = useState(title);
    const [handleShowEdit, setHandleShowEdit] = useState(false);
    function handleEdit() {
        setHandleShowEdit(!handleShowEdit);
    }
    const dispatch = useDispatch();
    function Save() {
        let data = {
            id,
            option,
            title: dataEdit,
        };
        if (dataEdit) {
            dispatch(edit(data));
            handleEdit();
            notify(true, "Update task success");
        } else {
            notify(false, "Please enter your task");
        }
    }
    function deleteData() {
        if (window.confirm("Do you want to delele this todo?") == true) {
            const deleteTodo = {
                id,
                option,
            };
            dispatch(dltData(deleteTodo));
            notify(true, "Delete task success");
        } else {
            notify(false, "Delete faild");
        }

        // console.log(deleteTodo);
    }
    return (
        <>
            {" "}
            <div className="todo-item">
                <div className="todo-createAt">
                    <i className="fa-solid fa-calendar-days"></i>
                    <p>{createAt}</p>
                </div>
                <div
                    className={`todo-content ${
                        handleShowEdit ? "hidden-edit" : "show-edit"
                    }`}
                >
                    <p>{title}</p>
                </div>
                <div
                    className={`todo-edit ${
                        handleShowEdit ? "show-edit" : "hidden-edit"
                    }`}
                >
                    <input
                        type="text"
                        value={dataEdit}
                        className="input-data"
                        onChange={(e) => setDataEdit(e.target.value)}
                    />
                    <i
                        className="done fa-solid fa-check"
                        onClick={(id, option) => Save(id, option)}
                    ></i>
                    <i
                        className="cancel fa-solid fa-ban"
                        onClick={() => setDataEdit("")}
                    ></i>
                </div>
                <div className="todo-actions">
                    <i
                        className=" fa-solid fa-pen-to-square"
                        onClick={handleEdit}
                    ></i>
                    <i
                        className=" fa-solid fa-trash-can"
                        onClick={deleteData}
                    ></i>
                </div>
            </div>
        </>
    );
};

export default React.memo(Card);
