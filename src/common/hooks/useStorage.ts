import { isWindowDefined } from "common/utils/browser";
import { SetStateAction, useCallback, useState } from "react";

const useStorage = (storageType: StorageType) => {
  const getItem = useCallback(
    (key: string): string =>
      isWindowDefined() ? window[storageType][key] : "",
    [storageType]
  );

  const setItem = useCallback(
    (key: string, value: string): boolean => {
      if (isWindowDefined()) {
        window[storageType].setItem(key, value);

        return true;
      }

      return false;
    },
    [storageType]
  );

  const removeItem = useCallback(
    (key: string): void => {
      window[storageType].removeItem(key);
    },
    [storageType]
  );

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export function useStorageItem<T>(
  storageType: StorageType,
  key: string,
  defaultValue?: T
): [T | undefined, (value: T | undefined) => void] {
  const storage = useStorage(storageType);

  const [value, setValue] = useState<T | undefined>(
    storage.getItem(key)
      ? (JSON.parse(storage.getItem(key)) as T)
      : defaultValue
  );

  const handleValueChange = useCallback(
    (newValue: SetStateAction<T | undefined>) => {
      if (newValue) {
        storage.setItem(key, JSON.stringify(newValue));
      } else {
        storage.removeItem(key);
      }
      setValue(newValue);
    },
    [key, storage]
  );

  return [value, handleValueChange];
}

export const useSessionStorageItem = <T>(key: string, defaultValue?: T) =>
  useStorageItem<T>(StorageType.SessionStorage, key, defaultValue);

export const useLocalStorageItem = <T>(key: string, defaultValue?: T) =>
  useStorageItem<T>(StorageType.LocalStorage, key, defaultValue);

export enum StorageType {
  SessionStorage = "sessionStorage",
  LocalStorage = "localStorage",
}
