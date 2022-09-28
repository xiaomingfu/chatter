import { isBrowser } from "./browser";

class LocalStorageWrapper<T> {
  private key: string;
  private defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  get(): T {
    if (isBrowser()) {
      const s = localStorage.getItem(this.key);
      if (s) {
        return JSON.parse(s);
      }
    }
    return this.defaultValue;
  }

  set(value: T) {
    if (isBrowser()) {
      localStorage.setItem(this.key, JSON.stringify(value));
    }
  }
}

export default LocalStorageWrapper;
