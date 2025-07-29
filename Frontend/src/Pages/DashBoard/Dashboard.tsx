import './Dashboard.css';
import DashboardHeader from '../../Components/DashboardHeader/DashboardHeader';
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import CreateNotePopup from '../../Components/CreateNotePopup/CreateNotePopup';
import axios from 'axios';
import { useApi } from '../../Components/ContextApi';

type Note = {
  _id: string;
  text: string;
};

const Dashboard = () => {
  const { baseURL } = useApi();
  const [createNoteActive, setCreateNoteActive] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);


  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${baseURL}/fetch-details`, { withCredentials: true });
      const { name, email, notes } = res.data.data;
      setName(name);
      setEmail(email);
      setNotes(notes);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDeleteNote = async (noteId: string) => {
    try {
      const res = await axios.post(`${baseURL}/delete-note`, { noteId }, { withCredentials: true });
      if (res.data.success) {
        alert(res.data.message)
        fetchDetails();
      }
    } catch (error: any) {
      alert(error.res?.data?.message || "Something went wrong while deleting the note.");
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className='dashboarsh-body'>
        <div className='dashboard-box'>
          <h2>Welcome, {name}!</h2>
          <p>Email: {email}</p>
        </div>

        {createNoteActive && (
          <CreateNotePopup
            onClose={() => {
              setCreateNoteActive(false);
              fetchDetails();
            }}
            onAdd={() => setCreateNoteActive(false)}
          />
        )}

        <button className='create-note-btn' onClick={() => setCreateNoteActive(true)}>
          Create Note
        </button>

        <h3 className="notes-heading">Notes</h3>

        
        <div className='scroll-wrapper'>
         {notes.length<=0?(<p className='note-text'>No Notes available</p>):( <div className='notes-list'>
            {notes.map((note) => (
              <div className='note-item' key={note._id}>
                <p className='note-text'>{note.text}</p>
                <MdDelete style={{cursor:"pointer"}} size={25} onClick={() => { handleDeleteNote(note._id) }} />
              </div>
            ))}
          </div>)}
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
