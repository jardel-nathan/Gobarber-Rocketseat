import IStorageProvider from "../models/IStorageProvider";
import fs from "fs";
import path from "path";
import uploadConfig from "@config/upload";
import aws, { S3 } from "aws-sdk";

class S3StorageProvider implements IStorageProvider {

 private client: S3;

 constructor(){
  this.client = new aws.S3({
   region: "us-east-1",
   accessKeyId: process.env.AWS_ACCESS_KEY,
   secretAccessKey: process.env.AWS_SECRET_KEY
  });
 }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);

    this.client.putObject({
      Bucket:'gobarberjardev',
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType: "image/jpeg",
    }, (err) => {
      if(err){
        console.log(err);
      }
    });

    await fs.promises.unlink(originalPath);
    
    return file;

  }

  public async deleteFile(file: string): Promise<void> {

   this.client.deleteObject({
    Bucket: 'gobarberjardev',
    Key: file,
   }, (err) => {
    if(err){
     console.log(err);
    }
   }
   );


 }

}

export default S3StorageProvider;
