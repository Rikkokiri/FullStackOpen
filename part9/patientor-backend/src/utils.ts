import { Gender, NewPatient } from './types';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields) => {
  const newPatient: NewPatient = {
    name: parseStringProperty(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringProperty(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringProperty(occupation, 'occupation'),
    entries: [],
  };

  return newPatient;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const parseStringProperty = (param: unknown, fieldname: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${fieldname}: ${param}`);
  }
  return param;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// const parseStringProperty

// const parseDate
