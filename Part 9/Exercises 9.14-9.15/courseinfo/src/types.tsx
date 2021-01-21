interface CoursePartsBase {
  name: string,
  exerciseCount: number
}

interface CoursePartOne extends CoursePartsBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartsBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartsBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;