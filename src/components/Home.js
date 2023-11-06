import React, { useContext, useEffect } from "react";
import { NoteContext } from "../contextApi/NoteContext";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./../StrictModeDroppable";

function Home() {
  const context = useContext(NoteContext);
  const {
    api,
    count,
    getAllNote,
    notes,
    setNote,
    setNotes,
    deleteNoteController,
  } = context;

  const handleData = (_id, title, description, tag) => {
    setNote({ id: _id, title: title, description: description, tag: tag });
  };

  const deleteNote = (id) => {
    deleteNoteController(id);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  useEffect(() => {
    getAllNote();
  }, []);

  return (
    <div>
      <h1 className="text-center text-green-700 text-4xl font-extrabold m-5">
        Todo Note List
      </h1>
      <h1 className="text-center text-red-700 text-2xl font-extrabold m-5">
        {!notes && "Loading..."}
      </h1>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todosList">
          {(provided) => (
            <ul
              // className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-2 lg:gap-4"
              className="max-w-xs mx-auto bg-zinc-400"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {notes?.map((note, index) => {
                const { title, description, tag, status, _id } = note;

                return (
                  <Draggable key={_id} draggableId={_id} index={index}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="m-2 p-3 transition-colors ease-in-out mb-5"
                        style={{
                          border: "1px solid black",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <div className="grid grid-cols-2 gap-4 m-3">
                          <h1 className="text-3xl">{title}</h1>
                          <button
                            className={
                              status === "Pending"
                                ? "bg-yellow-500 rounded-md px-3 py-1 "
                                : status === "Active"
                                ? "bg-green-500 rounded-md px-3 py-1 "
                                : "bg-red-500 rounded-md px-3 py-1 text-center "
                            }
                          >
                            {status}
                          </button>
                        </div>
                        <p>{description}</p>
                        <div className="grid grid-cols-3">
                          <button className="border-black p-2 m-3 bg-indigo-600 text-yellow-100 rounded">
                            {tag}
                          </button>

                          <button className="border-black  m-3 bg-yellow-500 text-black rounded">
                            {" "}
                            <Link
                              className="px-6"
                              to="/edit-note"
                              onClick={() =>
                                handleData(_id, title, description, tag)
                              }
                            >
                              Edit
                            </Link>
                          </button>

                          <button
                            className="border-black p-2 m-3 bg-red-600 text-yellow-100 rounded"
                            onClick={() => deleteNote(_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Home;
