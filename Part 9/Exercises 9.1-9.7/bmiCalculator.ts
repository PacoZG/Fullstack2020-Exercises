interface bmiResult {
  weight: number;
  height: number;
  BMI: number;
  description: string;
}

interface values {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): values => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const bmiCalculator = (height: number, weight: number): bmiResult => {
  const h_m = height / 100;
  const BMI = weight / (h_m * h_m);
  let description = '';

  if (BMI < 18.5) {
    description = 'Underweight';
  } else if (BMI > 18.5 && BMI < 24.9) {
    description = 'Normal weight';
  } else if (BMI >= 25 && BMI < 30) {
    description = 'Overweight';
  } else if (BMI >= 30) {
    description = 'Obese';
  }
  return { weight, height, BMI, description };
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(bmiCalculator(height, weight));
}
catch (error) {
  console.log('Error: ', error.message);
}

// example: http://localhost:3002/bmi?height=180&weight=72