import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { createDiaryEntry, getAllDiaryEntries } from './diaryService';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>();
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    getAllDiaryEntries().then((data: DiaryEntry[]) => setEntries(data));
  }, []);

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };

    createDiaryEntry(newEntry).then((data: DiaryEntry) => {
      setEntries(entries?.concat(data));
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <main>
      <h1>Flight Diary</h1>
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
