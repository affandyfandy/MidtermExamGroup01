export interface Customer {
  id: number;
  name: string;
  phone_number: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_time: Date;
  updated_time: Date;
}
