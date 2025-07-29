import { useState } from 'react';
import './CreateNotePopup.css';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useApi } from '../ContextApi';

interface CreateNotePopupProps {
    onClose: () => void;
    onAdd: (note: string) => void;
}

const CreateNotePopup = ({ onClose, onAdd }: CreateNotePopupProps) => {
    const [note, setNote] = useState('');
    const { baseURL } = useApi();
    const [loading, setLoading] = useState(false)

    const handleAddNote = async () => {
        if (note.trim() === '') {
            alert("Empty note canot be added");
            return;
        }
        try {
            setLoading(true)
            console.log('inside handleAddNote')
            const res = await axios.post(`${baseURL}/add-note`, { note }, { withCredentials: true });
            if (res.data.success) {
                alert("Note added")
            }

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-icon" >
                    <IoClose size={24} onClick={onClose} />
                </button>
                <h2>Create Note</h2>
                <textarea
                    className="note-input"
                    placeholder="Enter your note..."
                    value={note}
                    onChange={(e) => { setNote(e.target.value) }}
                    rows={4}
                />
                <button disabled={loading}
                    style={{ background: `${loading ? 'gray' : '#007bff'}`,fontSize:15,fontWeight:700}}
                    className="add-button" onClick={() => { handleAddNote() }}>
                    {loading ? 'Adding..' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default CreateNotePopup;
