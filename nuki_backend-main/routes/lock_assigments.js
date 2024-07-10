import express, { request } from 'express';
import { getAllAssignments,getAssignment,createAssignment,updateAssignment,deleteAssignment} from '../controllers/lock_assigments.js';

const router = express.Router();

router.get('/', getAllAssignments);
router.get('/:resource_id', getAssignment);
router.post('/:resource_id', createAssignment);
router.put('/:resource_id', updateAssignment);
router.delete('/:resource_id', deleteAssignment);

export default router;