import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p key={part.name} >{part.name} {part.exerciseCount} {part.description}</p>
    case "Using props to pass data":
      return <p key={part.name}>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
    case "Deeper type usage":
      return <p key={part.name}>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
    default:
      return assertNever(part);
  }
}

export default Part;