import { isNumber } from "./validators.ts";


export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height / 100, 2);

    if(bmi < 16.0)
    {
        return "Underweight (Severe thinness)";
    }
    else if(bmi < 17.0)
    {
        return "Underweight (Moderate thinness)";
    }
    else if(bmi < 18.5)
    {
        return "Underweight (Mild thinness)";
    }
    else if(bmi < 25.0)
    {
        return "Normal range";
    }
    else if(bmi < 30.0)
    {
        return "Overweight (Pre-obese)";
    }
    else if(bmi < 35.0)
    {
        return "Obese (Class I)";
    }
    else if(bmi < 40.0)
    {
        return "Obese (Class II)";
    }
    else
    {
        return "Obese (Class III)";
    }
};

interface Input {
    weight: number,
    height: number,
}

const processArgs = (): Input => {
    if(process.argv.length !== 4) throw new Error("Wrong amount of arguments");
    
    if(!isNumber(process.argv[2])) throw new Error("Argument 1 is not number");
    if(!isNumber(process.argv[3])) throw new Error("Argument 2 is not number");

    const weight: number = Number(process.argv[3]); 
    const height: number = Number(process.argv[2]);

    return {weight, height};
};


if(process.argv[1] === import.meta.filename){
    const input: Input = processArgs();

    console.log(calculateBmi(input.height, input.weight));
}