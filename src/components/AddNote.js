import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoteContext } from '../contextApi/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNoteController, note, setNote, api } = context;
    const navigate = useNavigate()

    const handleAddAdmin = (e) => {
        e.preventDefault()

        const { title, description } = note;

        if (!title && !description) {
            alert("Please provide todo data!")
        } else {
            addNoteController(note)
            if (api) {
                setTimeout(() => {
                    navigate("/home", { replace: true })
                }, 1500)
            }
        }
    }

    return (
        <div className="my-10 lg:mx-96">
            <form onSubmit={handleAddAdmin}>
                <div className='m-3'>
                    <label htmlFor='title' className='text-start'>Todo Title</label><br />
                    <input id="title" className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' placeholder='Enter todo title' type="text" onChange={(e) => setNote({ ...note, title: e.target.value })} />
                </div>

                <div className='m-3'>
                    <label htmlFor='description' className='text-start'>Description</label><br />
                    <textarea cols="20" rows="5" id="description" className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' placeholder='Add description' type="text"  onChange={(e) => setNote({ ...note, description: e.target.value })} />
                </div>
                <div className='m-3'>
                    <label htmlFor='tag' className='text-start'>Tag Line</label><br />
                    <input id="tag" className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' placeholder='Enter Your Tag Line' type="text" onChange={(e) => setNote({ ...note, tag: e.target.value })} />
                </div>
                <div>
                    <button className='bg-green-500 py-3 px-6 rounded-lg' type='submit' >Add Todo</button>
                </div>
            </form>

        </div>
    )
}

export default AddNote;