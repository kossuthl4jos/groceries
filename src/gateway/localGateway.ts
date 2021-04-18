import { List } from '~/types';

const TOKEN_KEY = 'groceries-lists';

function saveLists(lists: Array<List>) {
  if (lists != null) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ lists }));
  }
}

export class LocalGateWay {
  getLists = async () => {
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

    saveLists(newLists.filter((list) => list._id !== listId));
  };

  updateList = (list: List) => {
    const groceriesList = localStorage.getItem(TOKEN_KEY) ?? '{ lists: [] }';
    const { lists } = JSON.parse(groceriesList);

    const newLists: Array<List> = [...(lists.filter((l: List) => l._id !== list._id) ?? []), list];
    saveLists(newLists);
  };

  signupUser = async (user: { userName: string; password: string }) => {
    const { userName, password } = user;
    const userKey = `groceries-user-key-${String(Math.random()).substring(2, 11)}`;

    const data = JSON.stringify({ userName, password });
    localStorage.setItem(userKey, data);

    return userKey;
  };
}
