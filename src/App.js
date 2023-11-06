import Home from './components/Home';
import NoteState from './contextApi/NoteState';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NoteList from './components/NoteList';
import EditNote from './components/EditNote';
import AddNote from './components/AddNote.js';
import Navbar from './components/Navbar.js';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <div className='mt-10 mx-auto'>
            <Home />
          </div>
        </div>
      ),
    },
    {
      path: "/home",
      element: (
        <div>
          <Navbar />
          <div className='mt-10 mx-auto'>
            <Home />
          </div>
        </div>
      )
    },
    {
      path: "/add-note",
      element: (
        <div>
          <Navbar />
          <div className='mt-10 mx-auto'>
            <AddNote />
          </div>
        </div>
      )
    },
    {
      path: "/manage-note",
      element: (
        <div>
          <Navbar />
          <div className='mt-10 mx-auto'>
            <NoteList />
          </div>
        </div>
      )
    },
    {
      path: "/edit-note",
      element: (
        <div>
          <Navbar />
          <div className='mt-10 mx-auto'>
            <EditNote />
          </div>
        </div>
      )
    },
  ]);

  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
