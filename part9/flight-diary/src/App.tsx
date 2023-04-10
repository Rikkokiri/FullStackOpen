import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry, StatusMessage } from './types';
import { createDiaryEntry, getAllDiaryEntries } from './diaryService';
import axios from 'axios';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>();
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<StatusMessage | undefined>(
    undefined,
  );

  useEffect(() => {
    getAllDiaryEntries().then((data: DiaryEntry[]) => setEntries(data));
  }, []);

  const showNotification = (message: string, error = false, delay = 5000) => {
    setStatusMessage({
      msg: message,
      error: error,
    });
    setTimeout(() => {
      setStatusMessage(undefined);
    }, delay);
  };

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
    <main>
      <h1>Flight Diary</h1>
      {statusMessage && (
        <div>
          <p className={statusMessage.error ? 'error-toast' : 'success-toast'}>
            {statusMessage.msg}
          </p>
        </div>
      )}
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
        <div className="input-wrapper">
          <label htmlFor="visibility">Visibility</label>
          <input
            id="visibility"
            type="text"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          ></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="weather">Weather</label>
          <input
            id="weather"
            type="text"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          ></input>
        </div>
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
      <section>
        <h2>Diary entries</h2>
        <ul className="entry-list">
          {entries?.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </ul>
      </section>
    </main>
  );
};

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <li className="diary-entry" key={entry.id}>
      <h3>{entry.date}</h3>
      <div>
        <p>Visibility: {entry.visibility}</p>
        <p>Weather: {entry.weather}</p>
      </div>
    </li>
  );
};

export default App;
