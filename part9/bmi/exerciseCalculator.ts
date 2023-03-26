import { parseNumberArray } from "./utils"

interface ExerciseParams {
  hours: number[]
  target: number
}

const parseExerciseParams = (args: string[]): ExerciseParams => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 1002) throw new Error('Exceeded maximum number of arguments')

  
  const inputs = args.slice(2)
  const parsedNumbers = parseNumberArray(inputs)
  
  if (parsedNumbers !== undefined) {
    const anyNegatives = parsedNumbers.some(num => num < 0)
    if (anyNegatives) throw new Error('Neither target nor daily hours can be less than 0')
    const [target, ...hours] = parsedNumbers
    return {
      hours: hours,
      target: target
    }
  } else {
    throw new Error('Provided values must be numbers');
  }
} 

interface IExerciseFeedback {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hours: number[],
  target: number,
): IExerciseFeedback => {
  const sum = hours.reduce((prev, current) => prev + current, 0);
  const average = hours.length ? sum / hours.length : 0;

  let rating = 1;
  let ratingDescription =
    'Maybe you should adjust your goals since you did not reach half of it.';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job! You reached your training goal!';
  } else if (average >= 0.5 * target) {
    rating = 2;
    ratingDescription =
      'You got over halfway to your goal! Good job - but you can do even better!';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((d) => d !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
}

// Hard-coded input for ex. 9.2
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
/* ...which should return:
{
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: "not too bad but could be better",
  target: 2,
  average: 1.9285714285714286,
};
 */

// Ex. 9.3: Provided values via command line
try {
  const { hours, target } = parseExerciseParams(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMsg = 'Something went wrong';
  if (error instanceof Error) {
    errorMsg += error.message ? `: ${error.message}` : '.';
  }
  console.log(errorMsg);
}
