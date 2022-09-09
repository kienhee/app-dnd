import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { dndSave, infinity } from "./redux/features";
import { useSelector, useDispatch } from "react-redux";
import Card from "./components/Card";
import moment from "moment";
function App() {
    const data = useSelector((state) => state.features.data);
    const dispatch = useDispatch();
    const [showHiddenModal, setShowHiddenModal] = useState(true);
    const handleShowHiddenModal = useCallback(() => {
        setShowHiddenModal(!showHiddenModal);
    }, [showHiddenModal]);
    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;
        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(
                (e) => e.id === source.droppableId
            );
            const destinationColIndex = data.findIndex(
                (e) => e.id === destination.droppableId
            );
            const sourceCol = data[sourceColIndex];
            const destinationCol = data[destinationColIndex];
            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];
            const [removed] = sourceTask.splice(source.index, 1);
            destinationTask.splice(destination.index, 0, removed);

            const onChange = {
                sourceColIndex,
                destinationColIndex,
                sourceTask,
                destinationTask,
            };

            dispatch(dndSave(onChange));
        }
    };

    function handleSearchTodo() {
        let inputSearch = document
            .getElementById("inputSearch")
            .value.toLowerCase();
        let cardItem = document.querySelectorAll(".todo-item");
        for (let i = 0; i < cardItem.length; i++) {
            let currentItem = cardItem[i].textContent.toLowerCase();
            // console.log("currentItem", currentItem);
            if (currentItem.includes(inputSearch)) {
                cardItem[i].style.display = "block";
            } else {
                cardItem[i].style.display = "none";
            }
        }
    }
    function handleSearchDate() {
        let inputDate = document.getElementById("inputDate").value;
        let fomrmatDate = moment(inputDate).format("L");
        console.log(inputDate, fomrmatDate);
        let cardItem = document.querySelectorAll(".todo-item");

        for (let i = 0; i < cardItem.length; i++) {
            let currentItem = cardItem[i].textContent;
            // console.log("currentItem", currentItem.includes(fomrmatDate));
            if (currentItem.includes(fomrmatDate)) {
                cardItem[i].style.display = "block";
            } else {
                cardItem[i].style.display = "none";
            }
        }
    }
    useEffect(() => {
        let col = document.querySelectorAll(".column");
        col.forEach((item, index) =>
            item.addEventListener("scroll", (event) => {
                const { scrollTop, offsetHeight, scrollHeight } =
                    event.currentTarget;
                if (offsetHeight + scrollTop > scrollHeight) {
                    dispatch(infinity(index));
                }
            })
        );
    }, []);
    return (
        <div className="App">
            <h1 className="heading">TO DO LIST</h1>
            <div className="search container">
                <input
                    type="date"
                    onChange={handleSearchDate}
                    id="inputDate"
                />
                <input
                    type="search"
                    // value={searchData}
                    onChange={handleSearchTodo}
                    placeholder="Search your todo...."
                    id="inputSearch"
                />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="body-app container">
                    {data?.map((column, index) => (
                        <Droppable key={column.id} droppableId={column.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="column"
                                >
                                    <div className="column-ref">
                                        <div className="task-bar">
                                            <div className="title-count">
                                                <span className="count">
                                                    {column.tasks?.length}
                                                </span>
                                                <div className="title">
                                                    {column.title}
                                                </div>
                                            </div>
                                            <button
                                                className="btn"
                                                onClick={handleShowHiddenModal}
                                            >
                                                <i className="fa-solid fa-plus"></i>{" "}
                                                New task
                                            </button>
                                        </div>
                                        <div className="task-body">
                                            {column.tasks?.map(
                                                (task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Card
                                                                    id={task.id}
                                                                    option={
                                                                        task.option
                                                                    }
                                                                    title={
                                                                        task.title
                                                                    }
                                                                    createAt={
                                                                        task.createAt
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <Modal onState={showHiddenModal} onCancel={handleShowHiddenModal} />
        </div>
    );
}

export default App;
