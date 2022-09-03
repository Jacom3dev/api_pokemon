import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { IPokemon } from '../interfaces/pokemon.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(@InjectModel('Pokemon') private readonly pokemonModel:Model<IPokemon>){}

  async findByNameOrNo(name:string,no:number):Promise<IPokemon>{ 
    return await this.pokemonModel.findOne({$or:[{name},{no}]});
  }

  async create(body:CreatePokemonDto):Promise<IPokemon> {
    return await this.pokemonModel.create(body);
  }

  async findAll():Promise<IPokemon[]> {
    return await this.pokemonModel.find();
  }

  async findOne(no: number):Promise<IPokemon> {
    return await this.pokemonModel.findOne({no});
  }

  async update(no: number, body: UpdatePokemonDto):Promise<any> {
    return await this.pokemonModel.updateOne({no},body);
  }

  async remove(no: number):Promise<any> {
    return await this.pokemonModel.deleteOne({no});
  }
}
