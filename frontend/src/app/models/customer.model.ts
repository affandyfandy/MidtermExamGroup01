export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdTime: Date;
  updatedTime: Date;
}
