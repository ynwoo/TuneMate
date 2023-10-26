import axios from 'axios';
import { Todo } from '@/types/todo';

const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(
    'https://jsonplaceholder.typicode.com/todos',
  );
  return response.data;
};

export { getTodos };
