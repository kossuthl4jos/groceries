import { List } from '~/types';
import { LocalGateWay } from './localGateway';

export interface IGateway {
  getLists: () => Array<List>;
  addList: (list: List) => void;
  deleteList: (listId: string) => void;
  updateList: (list: List) => void;
}

const backend = process.env.BACKEND;

export class Gateway {
  gatewayService: IGateway;

  constructor() {
    this.gatewayService = backend === 'local' ? new LocalGateWay() : new LocalGateWay();
  }
}
