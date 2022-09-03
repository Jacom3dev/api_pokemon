import { IPokemon } from '../interfaces/pokemon.interface';

type pokemon = IPokemon | IPokemon[] | null;

export class PokemonResponseDto {
    statusCode: number;
    message: string;
    data: pokemon
    errors?: { [key: string]: any };
}
