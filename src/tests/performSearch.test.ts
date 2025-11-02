import performSearch from '@/lib/performSearch';
import { describe, expect, test } from 'vitest';

const movies = [
  { id: 1, title: 'Inception1', poster_path: null },
  { id: 2, title: 'Inception2', poster_path: null },
  { id: 3, title: 'inception3', poster_path: null },
];

describe('performSearch', () => {
  test('returns empty array for empty query', () => {
    const res = performSearch('', movies as any);
    expect(res).toEqual([]);
  });

  test('matches partial titles case-insensitively', () => {
    const res = performSearch('incep', movies as any);
    expect(res.map((m) => m.title)).toContain('inception3');
    expect(res.map((m) => m.title)).toContain('Inception1');
    expect(res.map((m) => m.title)).toContain('Inception2');
  });

  test('matches multiple titles', () => {
    const res = performSearch('Inception', movies as any);
    expect(res.map((m) => m.title)).toContain('Inception1');
    expect(res.map((m) => m.title)).toContain('Inception2');
  });

  test('returns empty array for no matches', () => {
    const res = performSearch('abc', movies as any);
    expect(res).toEqual([]);
  });

  test('trims whitespace in query', () => {
    const res = performSearch(' Inception ', movies as any);
    expect(res.map((m) => m.title)).toContain('Inception1');
    expect(res.map((m) => m.title)).toContain('Inception2');
  });
});
