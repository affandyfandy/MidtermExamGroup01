export interface Product {
  id: number;
  name: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdTime: Date;
  updatedTime: Date;
}

export interface AddProductReqeust {
  name: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
}
