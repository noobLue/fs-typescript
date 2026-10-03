import { isNumber } from "./validators.ts";


interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: "super bad" | "average result" | "super good!",
}

const calculateExercises = (hours: number[], target_p: number): Result => {
    if(hours.length == 0) throw new Error("array length is 0");

    const periodLength = hours.length;
    const trainingDays = hours.reduce((acc, v) => { return acc + (v > 0 ? 1 : 0); }, 0);
    const target = target_p;
    const average = hours.reduce((acc, v) => acc + v) / periodLength;

    const success = average > target;
    let rating: Result["rating"];
    let ratingDescription: Result["ratingDescription"];

    if(average >= target * 1.5)
    {
        rating = 3;
        ratingDescription = "super good!";
    }
    else if (average >= target) 
    {
        rating = 2;
        ratingDescription = "average result";
    }
    else 
    {
        rating = 1;
        ratingDescription = "super bad";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

interface Input {
    arr: number[],
    target: number
}

const processArgs = (): Input => {
    if(process.argv.length < 4) throw new Error("Missing arguments");
    if(!isNumber(process.argv[2])) throw new Error("Target was not a number");
    const target = Number(process.argv[2]);

    const arr: number[] = [];
    for(let i: number = 3; i < process.argv.length; i++)
    {
        if(!isNumber(process.argv[i])) throw new Error(`Param ${i - 2} was not a number`);
        arr.push(Number(process.argv[i]));
    }

    return {target, arr};
};


const input: Input = processArgs();
console.log(calculateExercises(input.arr, input.target));
