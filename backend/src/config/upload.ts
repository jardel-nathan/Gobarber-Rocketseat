/*

Multer -  upload de arquivos
neste arquivo será armazenado as configuraçoes de upload necessárias para que o multer possa realizar o upload dos arquivos
https://github.com/expressjs/multer
*/
import path from "path"; // para manipular caminhos
import crypto from "crypto"; // para gerar um hash aleatório
import multer from "multer"; // para manipular arquivos

//  cria um objeto que será usado para armazenar as configurações de upload
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: multer.DiskStorageOptions
  }

}

export default {

  driver: process.env.STORAGE_DRIVER,

  //  onde será armazenado os arquivos
  tmpFolder: tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  // upload de arquivos
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        //  gera um hash aleatório para o nome do arquivo
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },

    })
  }


} as IUploadConfig;
