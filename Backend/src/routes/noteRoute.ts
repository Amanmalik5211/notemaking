import express from "express"
import {protectedRoute} from '../middlewares/authMiddleware.js'
import {addNote,fetchDetails,deleteNote} from '../controllers/noteController.js'

const router = express.Router()


router.get('/fetch-details',protectedRoute,fetchDetails);
router.post('/add-note',protectedRoute,addNote);
router.post('/delete-note',protectedRoute,deleteNote)



export default router;