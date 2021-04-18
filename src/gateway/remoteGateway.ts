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

    return json;
  };

  addList = async (list: List) => {
    const { _id, ...listToSubmit } = list;

    const res = await fetch(BACKED_HOST + '/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listToSubmit),
    });

    if (res.status === 500 || !res.ok) {
      console.error('could not save new list');
    } else {
      const json = await res.json();
      return json;
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
    const { _id, ...listToSubmit } = list;

    const res = await fetch(BACKED_HOST + `/list/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listToSubmit),
    });

    if (res.status === 500 || !res.ok) {
      console.error('could not update list');
    }
  };
}
