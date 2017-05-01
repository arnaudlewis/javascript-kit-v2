import { ILRUCache, MakeLRUCache } from './lru';

export interface IApiCache {
  isExpired: (key: String) => boolean;
  get: (key: string, cb: (entry ?: any) => any) => void;
  set: (key: string, value: any, ttl: number, cb: () => any) => void;
  remove: (key: string, cb: () => any) => void;
  clear: (cb: () => any) => void;
}

export class ApiCache implements IApiCache {
  lru: ILRUCache;

  constructor(limit ?: number) {
    this.lru = MakeLRUCache(limit);
  }

  isExpired(key: string): boolean {
    const entryValue = this.lru.get(key, false);
    if(entryValue) {
      return entryValue.expiredIn !== 0 && entryValue.expiredIn < Date.now();
    } else {
      return false;
    }
  }

  get(key: string, cb: (entry ?: any) => any): void {
    const entryValue = this.lru.get(key, false);
    if(entryValue && !this.isExpired(key)) {
      cb(entryValue.data);
    }
    cb();
  }

  set(key: string, value: any, ttl: number, cb: () => any): void {
    this.lru.remove(key);
    this.lru.put(key, {
      data: value,
      expiredIn: ttl ? (Date.now() + (ttl * 1000)) : 0
    })
  }

  remove(key: string, cb: () => any): void {
    this.lru.remove(key);
    cb();
  }
  clear(cb: () => any): void {
    this.lru.removeAll();
    cb();
  }
}
