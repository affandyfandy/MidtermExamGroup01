export interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdTime: Date;
  updatedTime: Date;
}
