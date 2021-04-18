import { List } from '~/types';
import { LocalGateWay } from './localGateway';
import { RemoteGateWay } from './remoteGateway';

const backendMode = process.env.BACKEND;
const backendService = backendMode === 'local' ? new LocalGateWay() : new RemoteGateWay();

export async function getLists(): Promise<Array<List>> {
  return await backendService.getLists();
}

export async function addList(list: List): Promise<List> {
  return await backendService.addList(list);
}

export async function deleteList(listId: string): Promise<void> {
  await backendService.deleteList(listId);
}

export async function updateList(list: List): Promise<void> {
  await backendService.updateList(list);
}

export async function loginUser(user: { userName: string; password: string }): Promise<any> {
  return await backendService.loginUser(user);
}

export async function signupUser(user: { userName: string; password: string }): Promise<any> {
  return await backendService.signupUser(user);
}
