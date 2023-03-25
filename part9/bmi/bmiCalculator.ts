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
    return 'Underweight (unhealthy weight)';
  } else if (bmi <= 22.9) {
    return 'Normal (healthy weight)';
  } else {
    return 'Overweight (unhealthy weight)';
  }
}

console.log(calculateBmi(180, 74)); // should print the following message: Normal (healthy weight)

// Read command line paramters:
// const h: number = Number(process.argv[2]);
// const w: number = Number(process.argv[2]);
