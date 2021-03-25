import { useEffect, useState } from 'react';
import { List } from '~/types';

const TOKEN_KEY = 'groceries-lists';

export function useFetchLists(): {
  lists: Array<List>;
  reFetchLists: VoidFunction;
} {
  const [lists, setLists] = useState<Array<List>>([]);

  const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';

  const fetchLists = () => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList);
    setLists(lists);
  };

  useEffect(() => {
    const { lists } = JSON.parse(groceriesList != null ? groceriesList : '{ lists: [] }');
    setLists(lists);
  }, [groceriesList]);

  return { lists, reFetchLists: fetchLists };
}
