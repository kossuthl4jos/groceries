import { List } from '~/types';
import { LocalGateWay } from './localGateway';
import { RemoteGateWay } from './remoteGateway';

// export interface IGateway {
//   getLists: () => Array<List>;
//   addList: (list: List) => void;
//   deleteList: (listId: string) => void;
//   updateList: (list: List) => void;
// }

const backendMode = process.env.BACKEND;
const backendService = backendMode === 'local' ? new LocalGateWay() : new RemoteGateWay();

export async function getLists(): Promise<Array<List>> {
  return backendService.getLists();
}

export function addList(list: List): void {
  backendService.addList(list);
}

export function deleteList(listId: string): void {
  backendService.deleteList(listId);
}

export function updateList(list: List): void {
  backendService.updateList(list);
}
