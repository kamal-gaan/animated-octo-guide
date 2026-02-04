// src/utils/jsonHelpers.ts
import type { Summary } from '../types';

export const getTypeClass = (typeString: string) => {
  if (typeString.includes('Array')) return 'badge-array';
  if (typeString === 'Object') return 'badge-object';
  if (typeString === 'number') return 'badge-number';
  if (typeString === 'string') return 'badge-string';
  if (typeString === 'boolean') return 'badge-boolean';
  if (typeString === 'null') return 'badge-null';
  return 'badge-default';
};

export const generateOverview = (data: unknown): Summary => {
  if (data === null) return { type: 'null', count: 0, preview: [] };

  if (Array.isArray(data)) {
    const preview = data.map((item, index) => {
      let valueType: string = typeof item;
      let isExpandable = false;

      if (Array.isArray(item)) {
        valueType = `Array (${item.length})`;
        isExpandable = item.length > 0;
      } else if (item === null) {
        valueType = 'null';
      } else if (typeof item === 'object') {
        valueType = 'Object';
        isExpandable = Object.keys(item as object).length > 0;
      }
      
      return { key: index.toString(), type: valueType, isExpandable };
    });

    return { type: 'Array', count: data.length, preview };
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data as object);
    const preview = keys.map((key) => {
      const value = (data as Record<string, unknown>)[key];
      let valueType: string = typeof value;
      let isExpandable = false;
      
      if (Array.isArray(value)) {
        valueType = `Array (${value.length})`;
        isExpandable = value.length > 0;
      } else if (value === null) {
        valueType = 'null';
      } else if (valueType === 'object') {
        valueType = 'Object';
        isExpandable = Object.keys(value as object).length > 0;
      }
      
      return { key, type: valueType, isExpandable };
    });

    return { type: 'Object', count: keys.length, preview };
  }

  return { type: typeof data, count: 1, preview: [] };
};