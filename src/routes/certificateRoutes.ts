import express from 'express';
import {
    createCertificate,
    getCertificates,
    getCertificateById,
    getCertificateByPacientId,
    updateCertificate
} from '../controllers/certificateController';

const router = express.Router();

router.post('/', createCertificate);
router.get('/', getCertificates);
router.get('/:id', getCertificateById);
router.get('/pacient/:pacient_id', getCertificateByPacientId);
router.put('/:id', updateCertificate);

export default router;
