interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface calculatorArgs {
  hours: Array<number>;
  target: number;
}

export const parseCalculatorArguments = (args: Array<string>): calculatorArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let target = 0;
  let hours: Array<number> = [];
  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i == 2) {
        target = Number(args[2]);
      } else {
        hours = hours.concat(Number(args[i]));
      }
    }
    else {
      throw new Error('One or more argument values were not numbers!');
    }
  }
  return { target, hours };
}

export const exerciseCalculator = (target: number, hours: Array<number>): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(d => d > 0).length;
  const average = hours.reduce((sum, value) => sum + value) / (1.0 * hours.length);
  const success = average > target;
  let rating = 0;
  let ratingDescription = '';

  if (average === 0) {
    rating = 0
    ratingDescription = 'Fail';
  } else if (average <= 1) {
    rating = 1;
    ratingDescription = 'Bad';
  } else if (average > 1 && average <= 1.99) {
    rating = 1;
    ratingDescription = 'not too bad but could be better';
  } else if (average > 2.99 && average <= 2.99) {
    rating = 2;
    ratingDescription = 'Quite OK!, Progress';
  } else if (average > 3.99 && average <= 3.99) {
    rating = 2;
    ratingDescription = 'Good!, keep it going';
  } else if (average > 2.99 && average <= 4.99) {
    rating = 2;
    ratingDescription = 'Very good!';
  } else if (average === 5) {
    rating = 3;
    ratingDescription = 'Perfect!';
  }
  //console.log('HOURS:', hours, 'TARGET: ', target);
  return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
}


try {
  const { hours, target } = parseCalculatorArguments(process.argv);
  console.log(exerciseCalculator(target, hours));
} catch (e) {
  console.log('Error', e.message);
}
