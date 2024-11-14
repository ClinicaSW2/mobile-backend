import app from './app';
import './scheduler'; // Importa el cron job

const PORT = process.env.PORT || 3000;

// Console Fecha y Hora actual
const date = new Date();
console.log("Fecha y Hora actual: " + date);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
