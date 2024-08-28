import { Status } from './status';

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  status: Status;
  createdTime: Date;
  updatedTime: Date;
}
