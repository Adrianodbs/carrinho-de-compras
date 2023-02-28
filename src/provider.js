import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://crudcrud.com/api/c0916af573fb4f1791199faa19b508f6',
  timeout: 1000
})
