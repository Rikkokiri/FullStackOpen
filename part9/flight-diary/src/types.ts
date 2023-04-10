export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface NewDiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export interface StatusMessage {
  msg: string;
  error: boolean;
}
