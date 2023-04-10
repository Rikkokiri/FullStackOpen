import { useEffect, useState } from 'react';
import { DiaryEntry, StatusMessage } from './types';
import { getAllDiaryEntries } from './diaryService';
import { Entry } from './components/Entry';
import { AddEntryForm } from './components/AddEntryForm';
import { Notification } from './components/Notification';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
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

  return (
    <main>
      <h1>Flight Diary</h1>
      <Notification message={statusMessage} />
      <AddEntryForm
        entries={entries}
        setEntries={setEntries}
        showNotification={showNotification}
      />
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

export default App;
