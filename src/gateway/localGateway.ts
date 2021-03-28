import { useEffect, useState } from 'react';
import { List } from '~/types';
import { IGateway } from './gateway';

const TOKEN_KEY = 'groceries-lists';

function saveLists(lists: Array<List>) {
  if (lists != null) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ lists }));
  }
}

export class LocalGateWay implements IGateway {
  getLists = () => {
    const [lists, setLists] = useState<Array<List>>([]);

    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';

    useEffect(() => {
      const { lists } = JSON.parse(groceriesList != null ? groceriesList : '{ lists: [] }');
      setLists(lists);
    }, [groceriesList]);

    return lists;
  };

  addList = (list: List) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: Array<List> = [...(lists ?? []), list];
    saveLists(newLists);
  };
}
