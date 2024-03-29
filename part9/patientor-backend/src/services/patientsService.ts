import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientEntry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientEntry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatient,
  getPatients,
  addPatient,
};
