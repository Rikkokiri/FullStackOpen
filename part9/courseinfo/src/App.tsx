import React from 'react';

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
  switch (part.type) {
    case 'normal':
      return (
        <p className="course-part">
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
        </p>
      );
    case 'groupProject':
      return (
        <p className="course-part">
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          Project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p className="course-part">
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          Submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p className="course-part">
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
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
    <p>
      Number of exercises{' '}
      {parts.reduce((total, part) => total + part.exerciseCount, 0)}
    </p>
  );
};

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface PartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends PartWithDescription {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends PartWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends PartWithDescription {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const App = () => {
  const courseName = 'Half Stack application development';
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
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
