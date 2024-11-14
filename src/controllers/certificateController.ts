import { Request, Response } from 'express';
import Certificate from '../models/certificateModel';

// Crear certificado
export const createCertificate = async (req: Request, res: Response) => {
    try {
        // Console Req
        console.log(req.body);
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.status(201).json(certificate);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el certificado' });
    }
};

// Obtener certificados
export const getCertificates = async (req: Request, res: Response) => {
    try {
        const certificates = await Certificate.find();
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los certificados' });
    }
};

// Obtener certificado por ID
export const getCertificateById = async (req: Request, res: Response) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (certificate) {
            res.json(certificate);
        } else {
            res.status(404).json({ error: 'Certificado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el certificado' });
    }
};

// Obtener certificado por ID de pacient
export const getCertificateByPacientId = async (req: Request, res: Response) => {
    try {
        const certificate = await Certificate.findOne({ pacient_id: req.params.pacient_id });
        if (certificate) {
            res.json(certificate);
        } else {
            res.status(404).json({ error: 'Certificado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el certificado' });
    }
}

// Actualizar certificado
export const updateCertificate = async (req: Request, res: Response) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (certificate) {
            certificate.set(req.body);
            await certificate.save();
            res.json(certificate);
        } else {
            res.status(404).json({ error: 'Certificado no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el certificado' });
    }
}

// Eliminar certificado
export const deleteCertificate = async (req: Request, res: Response) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (certificate) {
            await Certificate.deleteOne({ _id: certificate._id });
            res.json({ message: 'Certificado eliminado' });
        } else {
            res.status(404).json({ error: 'Certificado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el certificado' });
    }
}
