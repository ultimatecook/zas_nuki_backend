import express, { request } from 'express';
import { getMyBookings} from '../controllers/bookings.js';

const router = express.Router();

router.get('/:token', getMyBookings);


export default router;