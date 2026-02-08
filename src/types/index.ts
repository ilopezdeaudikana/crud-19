export interface Item {
  id: number;
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}