interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase{
  description: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}


interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;


const Header = ({courseName}: {courseName: string}) => {
  return (<h1>{courseName}</h1>);
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part: CoursePart}) => {
  switch (part.kind) {
    case "basic":
      return (<div>
        <h3>{part.name} {part.exerciseCount}</h3> <p><i>{part.description}</i></p>
      </div>);
    case "group":
      return (<div>
        <h3>{part.name} {part.exerciseCount}</h3> <p>project exercises: {part.groupProjectCount}</p>
      </div>);
    case "background":
      return (<div>
        <h3>{part.name} {part.exerciseCount}</h3> <p><i>{part.description}</i></p> <p>submit to {part.backgroundMaterial}</p>
      </div>);case "special":
      return (<div>
        <h3>{part.name} {part.exerciseCount}</h3> <p><i>{part.description}</i></p> <p>{part.requirements}</p>
      </div>);
    default:
      return assertNever(part);
  }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (<div>
    {courseParts.map(part => (<Part part={part}></Part>))}
  </div>);
}


const Total = ({totalExercises}: {totalExercises: number}) => {
  return (<p>
    Number of exercises {totalExercises}
  </p>);
}

const App = () => {
  const courseName = "Half Stack application development";

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
  },
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total totalExercises={totalExercises}></Total>
    </div>
  );
};

export default App;