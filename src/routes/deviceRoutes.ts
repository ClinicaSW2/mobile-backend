import express from 'express';
import {
    createDevice,
    getDevices,
    deleteDevice,
    getDeviceById,
    updateDevice

} from '../controllers/deviceController';

const router = express.Router();

router.post('/', createDevice);
router.get('/', getDevices);
router.get('/:id', getDeviceById);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

export default router;
