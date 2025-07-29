import './Dashboard.css';
import DashboardHeader from '../../Components/DashboardHeader/DashboardHeader';
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import CreateNotePopup from '../../Components/CreateNotePopup/CreateNotePopup';
import axios from 'axios';
import { useApi } from '../../Components/ContextApi';

const Dashboard = () => {
  const {baseURL} = useApi();
  const [createNoteActive, setCreateNoteActive] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(['']);

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


  return (
    <div>
      <DashboardHeader />
      <div className='dashboarsh-body'>
        <div className='dashboard-box'>
          <h2>Welcome, {name}!</h2>
          <p>Email: {email}</p>
        </div>

        {createNoteActive &&
          <CreateNotePopup
            onClose={() => setCreateNoteActive(false)}
            onAdd={() => {


              setCreateNoteActive(false);
            }}
          />}
        <button className='create-note-btn' onClick={() => setCreateNoteActive(true)}>
          Create Note
        </button>

        <h3 className="notes-heading">Notes</h3>

        <div className='notes-list'>
          {notes.map((note, index) => (
            <div className='note-item' key={index}>
              <p className='note-text'>{note}</p>
              <MdDelete size={25} />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
