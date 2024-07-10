import express, { request } from 'express';
import { getAllResources,getResource} from '../controllers/resources.js';

const router = express.Router();

router.post('/', getAllResources);
router.get('/:resource_id', getResource);


export default router;