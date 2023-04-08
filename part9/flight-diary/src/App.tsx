import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './diaryService';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>();
  useEffect(() => {
    getAllDiaryEntries().then((data: DiaryEntry[]) => setEntries(data));
  }, []);

  return (
    <main>
      <h1>Flight Diary</h1>
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
