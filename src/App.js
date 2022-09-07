import { useState, useCallback } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { dnd } from "./redux/features";
import { useSelector, useDispatch } from "react-redux";
import Card from "./components/Card";
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
            // console.log(sourceColIndex, destinationColIndex);
            const sourceCol = data[sourceColIndex];
            const destinationCol = data[destinationColIndex];
            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];
            const [removed] = sourceTask.splice(source.index, 1);
            console.log(removed);
            destinationTask.splice(destination.index, 0, removed);
            data[sourceColIndex].tasks = sourceTask;
            data[destinationColIndex].tasks = destinationTask;
            // dnd(data);
        }
    };

    return (
        <div className="App">
            <h1 className="heading">TO DO LIST</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="body-app container">
                    {data?.map((column) => (
                        <Droppable key={column.id} droppableId={column.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="column"
                                >
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
                                        {column.tasks?.map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            id={task.id}
                                                            option={task.option}
                                                            title={task.title}
                                                            createAt={
                                                                task.createAt
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
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
