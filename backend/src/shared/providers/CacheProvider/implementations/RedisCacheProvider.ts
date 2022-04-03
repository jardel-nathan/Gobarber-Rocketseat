import ICacheProvider from "../models/ICacheProvider";
import Redis from "ioredis"; // IoRedis is a fork of Redis that is compatible with Node.js and the browser.

import cacheConfig from "@config/cache";

export default class RedisCacheProvider implements ICacheProvider{

  private client: Redis; 

  constructor() {
   this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
   // redis set method is used to store the key value pair
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {

    const keys = await this.client.keys(`${prefix}:*`); // keys method returns an array of keys matching the given pattern.

    const pipeline = this.client.pipeline(); // pipeline method returns a pipeline object that can be used to queue multiple commands and execute them all at once.

    keys.forEach(key => {
      pipeline.del(key); // del method deletes the given key.
    });

    await pipeline.exec();
  }


}