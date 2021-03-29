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

    const body = await res.json().then((data) =>
      data.forEach((list: any) => {
        list.items = [...JSON.parse(list.items as string)];
      }),
    );

    return body;
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
