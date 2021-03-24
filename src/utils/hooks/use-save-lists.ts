import { List } from '~/types';

const TOKEN_KEY = 'groceries-lists';

export function useSaveLists(): { saveLists: (lists: Array<List>) => void } {
  function saveLists(lists: Array<List>) {
    if (lists != null) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify({ lists }));
    }
  }

  return { saveLists };
}
