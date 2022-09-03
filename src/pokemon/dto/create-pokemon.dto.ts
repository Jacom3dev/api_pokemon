import { IsString,IsNumber,IsPositive,Min,MinLength} from "class-validator";

export class CreatePokemonDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    no:number;
}
