import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createDiaryEntry = async (entry: NewDiaryEntry) => {
  const response = await axios.post(baseUrl, entry);
  return response.data;
};
