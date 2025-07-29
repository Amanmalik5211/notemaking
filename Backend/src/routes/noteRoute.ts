import express from "express"
import {protectedRoute} from '../middlewares/authMiddleware.js'
import {addNote,fetchDetails} from '../controllers/noteController.js'

const router = express.Router()


router.get('/fetch-details',protectedRoute,fetchDetails);
router.post('/add-note',protectedRoute,addNote);



export default router;