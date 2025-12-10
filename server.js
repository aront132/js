import jsonServer from 'json-server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


const uploadDir = path.join(__dirname, 'src', 'assets', 'img', 'Producto');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

server.use(middlewares);


server.post('/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    res.json({ filename: req.file.originalname });
});


server.use(jsonServer.bodyParser);


server.use(router);

server.listen(3000, () => {
    console.log('🚀 Servidor CORREGIDO corriendo en http://localhost:3000');
    console.log(`📁 Guardando imágenes en: ${uploadDir}`);
});