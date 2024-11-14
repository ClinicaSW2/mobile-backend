import { Request, Response } from 'express';
import Device from '../models/deviceModel';

// Crear dispositivo
export const createDevice = async (req: Request, res: Response) => {
    try {
        const device = new Device(req.body);
        // Verificar si el token ya existe
        const tokenExists = await Device.findOne({ token: device.token });
        if (tokenExists) {
            // Si el token ya existe actualizar el person_id
            tokenExists.person_id = device.person_id;
            await tokenExists.save();
            console.log(tokenExists);
            res.json(tokenExists);
        } else {
            await device.save();
            console.log(device);
            res.status(201).json(device);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el dispositivo' });
    }
};

// Obtener dispositivos
export const getDevices = async (req: Request, res: Response) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los dispositivos' });
    }
};

// Obtener dispositivo por ID
export const getDeviceById = async (req: Request, res: Response) => {
    try {
        const device = await Device.findById(req.params.id);
        if (device) {
            res.json(device);
        } else {
            res.status(404).json({ error: 'Dispositivo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el dispositivo' });
    }
};

// Actualizar dispositivo
export const updateDevice = async (req: Request, res: Response) => {
    try {
        const device = await Device.findById(req.params.id);
        if (device) {
            device.set(req.body);
            await device.save();
            res.json(device);
        } else {
            res.status(404).json({ error: 'Dispositivo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el dispositivo' });
    }
};

// Eliminar dispositivo
export const deleteDevice = async (req: Request, res: Response) => {
    try {
        const device = await Device.findById(req.params.id);
        if (device) {
            await Device.deleteOne({ _id: req.params.id });
            res.json({ message: 'Dispositivo eliminado' });
        } else {
            res.status(404).json({ error: 'Dispositivo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el dispositivo' });
    }
};
