import { useEffect, useState } from 'react';
import { List } from '~/types';

const TOKEN_KEY = 'groceries-lists';

export function useFetchLists(): {
  lists: Array<List>;
} {
  const [lists, setLists] = useState<Array<List>>([]);

  useEffect(() => {
    const groceriesList = localStorage.getItem(TOKEN_KEY);
    const { lists } = JSON.parse(groceriesList != null ? groceriesList : '{ lists: [] }');
    setLists(lists);
  }, []);

  return { lists };
}
