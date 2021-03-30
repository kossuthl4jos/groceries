import { List } from '~/types';

const BACKED_HOST = process.env.REMOTE_BACKEND_HOST;

export class RemoteGateWay {
  getLists = async () => {
    const res = await fetch(BACKED_HOST + '/list', {
      method: 'GET',
    });

    if (res.status === 500 || !res.ok) {
      return;
    }

    const json = await res.json();

    const result = json.map((list: any) => {
      return { ...list, items: [...JSON.parse(list.items)] };
    });

    return result;
  };

  addList = async (list: List) => {
    console.log('adding: ', list);
  };

  deleteList = async (listId: string) => {
    console.log('deleting: ', listId);
  };

  updateList = async (list: List) => {
    console.log('updating: ', list);
  };
}
