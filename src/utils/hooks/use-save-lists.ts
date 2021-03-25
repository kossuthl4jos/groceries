import { List } from '~/types';
import { useFetchLists } from './use-fetch-lists';

const TOKEN_KEY = 'groceries-lists';

export function useSaveLists(): { saveLists: (lists: Array<List>) => void } {
  const { reFetchLists } = useFetchLists();

  function saveLists(lists: Array<List>) {
    if (lists != null) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify({ lists }));
      reFetchLists();
    }
  }

  return { saveLists };
}
