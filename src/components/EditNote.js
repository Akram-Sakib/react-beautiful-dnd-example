import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoteContext } from '../contextApi/NoteContext'


function EditNote() {
    const navigate = useNavigate()
    const context = useContext(NoteContext)
    const { updateNoteController, note, setNote, api } = context;

    const handleUpdate = (e) => {
        e.preventDefault()
        const { id, description, title, tag } = note;
        updateNoteController(id, title, description, tag)
        if (api) {
            setTimeout(() => {
                navigate("/home", { replace: true })
            }, 1500)
        }
    }

    return (
        <div className='mt-10 lg:mx-96'>
            <form onSubmit={handleUpdate} >
                <div>
                    <input className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' type="text" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                </div>

                <div>
                    <textarea cols="20" rows="10" className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' type="text" value={note.description} onChange={(e) => setNote({ ...note, description: e.target.value })} />
                </div>

                <div>
                    <input className='py-2 rounded-lg border m-1  text-black w-96 hover:bg-rose-500 hover:border-emerald-500' type="text" value={note.tag} onChange={(e) => setNote({ ...note, tag: e.target.value })} />
                </div>
                <div>
                    <button className='bg-green-500 py-3 px-6 rounded-lg' type='submit' >Update</button>
                </div>
            </form>
        </div>
    );
}

export default EditNote;