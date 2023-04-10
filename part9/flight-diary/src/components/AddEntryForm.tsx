import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
import { createDiaryEntry } from '../diaryService';
import axios from 'axios';
import { RadioGroup } from './RadioGroup';

interface IAddEntryFormProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  showNotification: (message: string, error?: boolean, delay?: number) => void;
}

export const AddEntryForm = ({
  entries,
  setEntries,
  showNotification,
}: IAddEntryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };

    createDiaryEntry(newEntry)
      .then((data: DiaryEntry) => {
        setEntries(entries?.concat(data));
        showNotification('Successfully added a new entry!', false);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.error(error.response?.data);
          showNotification(error.response?.data ?? 'An error occurred', true);
        } else {
          console.error(error);
          showNotification('An error occurred', true);
        }
      });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={createEntry}>
      <h2>Add new entry</h2>
      <div className="input-wrapper">
        <label htmlFor="entry-date">Date</label>
        <input
          id="entry-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
      </div>
      <RadioGroup
        name="visibility"
        legendText="Visibility"
        options={Object.values(Visibility)}
        value={visibility}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <RadioGroup
        name="weather"
        legendText="Weather"
        options={Object.values(Weather)}
        value={weather}
        onChange={(event) => setWeather(event.target.value)}
      />
      <div className="input-wrapper">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
