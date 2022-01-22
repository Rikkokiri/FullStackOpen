interface IExerciseFeedback {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  hours: number[],
  target: number,
): IExerciseFeedback {
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
      'You got over halfway to your goal! Good job but you can do better!';
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

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
