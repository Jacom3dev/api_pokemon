import { IPokemon } from "./pokemon.interface";

type pokemon = IPokemon | IPokemon[] | null;

export interface IPokemonResponse {
    statusCode: number;
    message: string;
    data: pokemon
    errors?: { [key: string]: any };
}