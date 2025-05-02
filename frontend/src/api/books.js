import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books/';

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

export const addBook = async (bookData) => {
  const response = await axios.post(API_URL, bookData);
  return response.data;
};



export const buyBook = async (id, token) => {
  const response = await axios.post(
    `${API_URL}/${id}/buy`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};