import React from 'react';
import { CoursePart } from './types';

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div className="course-part">
          <p className="part-name">
            {part.name} {part.exerciseCount}
          </p>
          <p className="part-desc">{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div className="course-part">
          <p className="part-name">
            {part.name} {part.exerciseCount}
          </p>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div className="course-part">
          <p className="part-name">
            {part.name} {part.exerciseCount}
          </p>
          <p className="part-desc">{part.description}</p>
          <p>Backgroubd material {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div className="course-part">
          <p className="part-name">
            {part.name} {part.exerciseCount}
          </p>
          <p className="part-desc">{part.description}</p>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p className="total">
      Number of exercises{' '}
      {parts.reduce((total, part) => total + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
