import express, { request } from 'express';
import { getAllLocks,getLock,closeLock,openLock,unlatchLock} from '../controllers/nuki_locks.js';

const router = express.Router();

router.get('/', getAllLocks);
router.get('/:lock_id', getLock);
router.post('/close/:lock_id', closeLock);
router.post('/open/:lock_id', openLock);
router.post('/unlatch/:lock_id', unlatchLock);

export default router;