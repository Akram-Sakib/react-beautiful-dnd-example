import React, { useContext, useEffect } from "react";
import { NoteContext } from "../contextApi/NoteContext";
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Title",
  "Tag",
  "Data",
  "Status",
  "Submit Status",
  "Action",
];

function NoteList() {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const {
    api,
    count,
    notes,
    getAllNote,
    updateNoteStatusController,
    setNote,
    deleteNoteController,
    star,
    setStar,
  } = context;

  console.log(star);

  const handleStatus = (e, id) => {
    e.preventDefault();
    setStar({ status: e.target.value });
    if (star) {
      updateNoteStatusController(id, star);
    }

    if (api) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleData = (_id, title, description, tag) => {
    setNote({ id: _id, title: title, description: description, tag: tag });
  };

  useEffect(() => {
    getAllNote();
  }, [count]);
  return (
    <div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD?.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <p
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notes?.map((items, index) => {
            const isLast = index === notes?.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const { _id, title, description, tag, date, status } = items;
            return (
              <tr key={_id}>
                <td className={classes}>
                  <p color="blue-gray" className="font-normal">
                    {title}
                  </p>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <p color="blue-gray" className="font-normal">
                    {tag}
                  </p>
                </td>
                <td className={classes}>
                  <p color="blue-gray" className="font-normal">
                    {date}
                  </p>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <p color="blue-gray" className="font-medium">
                    {status}
                  </p>
                </td>

                <td className="d-flex justify-center items-center">
                  <button
                    value="Active"
                    className="bg-green-500 m-2 text-black py-2 px-5 rounded-md"
                    onClick={(e) => handleStatus(e, _id)}
                  >
                    Active
                  </button>
                  <button
                    value="Pending"
                    className="bg-yellow-500 m-2 text-black py-2 px-5 rounded-md"
                    onClick={(e) => handleStatus(e, _id)}
                  >
                    Pending
                  </button>
                  <button
                    value="Reject"
                    className="bg-red-500 m-2 text-black py-2 px-5 rounded-md"
                    onClick={(e) => handleStatus(e, _id)}
                  >
                    Reject
                  </button>
                </td>
                <td className="d-flex justify-center items-center">
                  <button className=" m-2 bg-orange-500 py-2 px-5 rounded-md">
                    {" "}
                    <Link
                      className="px-6"
                      to="/edit-note"
                      onClick={() => handleData(_id, title, description, tag)}
                    >
                      Edit
                    </Link>
                  </button>

                  <button
                    className=" m-2 bg-red-500 py-2 px-5 rounded-md"
                    onClick={() => deleteNoteController(_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default NoteList;
