import { DiaryEntry } from '../types';

export const Entry = ({ entry }: { entry: DiaryEntry }) => {
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
