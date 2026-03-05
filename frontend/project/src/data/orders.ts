export interface Order {
  id: string;
  subjectId: string;
  subjectTitle: string;
  purchaseDate: string;
  amount: number;
}

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    subjectId: '1',
    subjectTitle: 'Data Structures & Algorithms',
    purchaseDate: '2024-02-15',
    amount: 49,
  },
  {
    id: 'order-2',
    subjectId: '3',
    subjectTitle: 'Operating Systems',
    purchaseDate: '2024-02-20',
    amount: 49,
  },
];
