import { List } from '~/types';

const BACKED_HOST = process.env.REMOTE_BACKEND_HOST;

export class RemoteGateWay {
  getLists = async () => {
    const res = await fetch(BACKED_HOST + '/list', {
      method: 'GET',
    });

    if (res.status === 500 || !res.ok) {
      console.error('could not fetch lists');
    }

    const json = await res.json();

    const result = json.map((list: any) => {
      if (list.items != null) {
        return { ...list, items: [...JSON.parse(list.items)] };
      } else {
        return { ...list, items: [] };
      }
    });

    return result;
  };

  addList = async (list: List) => {
    const { _id, items, ...listToSubmit } = list;

    const res = await fetch(BACKED_HOST + '/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listToSubmit),
    });

    if (res.status === 500 || !res.ok) {
      console.error('could not save new list');
    }
  };

  deleteList = async (listId: string) => {
    const res = await fetch(BACKED_HOST + `/list/${listId}`, {
      method: 'DELETE',
    });

    if (res.status === 500 || !res.ok) {
      console.error('could not delete slist');
    }
  };

  updateList = async (list: List) => {
    console.log('updating: ', list);
  };
}
