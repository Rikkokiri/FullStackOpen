import { isNotNumber } from './utils';

interface BMIParams {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BMIParams => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    const parsedHeight = Number(args[2]);
    const parsedWeight = Number(args[3]);
    if (parsedHeight <= 0) {
      throw new Error('Height must be larger than 0');
    }
    if (parsedWeight < 0) {
      throw new Error('Weight cannot be a negative number');
    }
    return {
      height: parsedHeight,
      weight: parsedWeight,
    };
  } else {
    throw new Error('Provided values must be numbers');
  }
};

/**
 * Calculates BMI and returns a messsage based on the classification of that BMI.
 * @param height    given height in centimeters
 * @param weight    weight in kilograms
 *
 * For reference:
 * Underweight (Unhealthy) 	< 18.5
 * Normal range (Healthy) 	18.5 – 22.9
 * Overweight I (At risk) 	23.0 – 24.9
 * Overweight II (Moderately obese) 	25.0 – 29.9
 * Overweight III (Severely obese) 	≥ 30.0
 *
 * Source: https://en.wikipedia.org/wiki/Body_mass_index
 */

export function calculateBmi(height: number, weight: number): string {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi <= 22.9) {
    return 'Normal';
  } else {
    return 'Overweight';
  }
}

// Hard-coded input for ex. 9.1
// console.log(calculateBmi(180, 74)); // should print the following message: Normal (healthy weight)

// Ex. 9.3: Provided values via command line
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMsg = 'Something went wrong';
  if (error instanceof Error) {
    errorMsg += error.message ? `: ${error.message}` : '.';
  }
  console.log(errorMsg);
}
