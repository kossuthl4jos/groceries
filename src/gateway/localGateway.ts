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
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList != null ? groceriesList : '{ lists: [] }');

    return lists;
  };

  addList = (list: List) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: Array<List> = [...(lists ?? []), list];

    saveLists(newLists);
  };

  deleteList = (listId: string) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: Array<List> = [...(lists ?? [])];

    saveLists(newLists.filter((list) => list.id !== listId));
  };

  updateList = (list: List) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: Array<List> = [...(lists.filter((l: List) => l.id !== list.id) ?? []), list];
    saveLists(newLists);
  };
}
