import ICacheProvider from "../models/ICacheProvider";

interface ICacheData {
 [key: string]: any;
}


export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = value;
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    return data as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`), // startsWith method returns true if the string starts with the given string.
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}