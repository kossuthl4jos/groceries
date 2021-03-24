import { useState } from 'react';
import { List } from '~/types';

const TOKEN_KEY = 'groceries-lists';

export function useFetchLists(): {
  lists?: Array<List>;
} {
  const [lists, setLists] = useState([]);

  const groceriesList = localStorage.getItem(TOKEN_KEY);
  if (groceriesList != null) {
    const { lists } = JSON.parse(groceriesList);
    if (lists != null) {
      setLists(lists);
    }
  }

  return {
    lists,
  };
}
