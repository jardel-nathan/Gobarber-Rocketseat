import * as bcrypt from 'bcryptjs';
import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(payload, hashed);
  }
}
