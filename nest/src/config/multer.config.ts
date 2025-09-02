import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerConfig: MulterOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new Error('Только изображения разрешены!'), false);
    }
    callback(null, true);
  },
};

// Конфигурация для PDF файлов
export const multerPdfConfig: MulterOptions = {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB для PDF
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      return callback(new Error('Только PDF файлы разрешены!'), false);
    }
    callback(null, true);
  },
};

// Универсальная конфигурация для изображений и PDF
export const multerUniversalConfig: MulterOptions = {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf'
    ];
    
    if (!allowedMimes.includes(file.mimetype)) {
      return callback(new Error('Разрешены только изображения (JPG, PNG, GIF, WebP) и PDF файлы!'), false);
    }
    callback(null, true);
  },
};