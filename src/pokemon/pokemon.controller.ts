import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './services/pokemon.service';
import { CreatePokemonDto,UpdatePokemonDto,PokemonResponseDto} from './dto';
import { IPokemonResponse } from './interfaces/pokemon-response.interface';


@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  async create(@Body() body: CreatePokemonDto): Promise<PokemonResponseDto> {
    const {name,no} = body;
    let result: IPokemonResponse;

    const pokemonByNameOrNo = await this.pokemonService.findByNameOrNo(name,no);

    if (pokemonByNameOrNo) {
      result = {
        statusCode: HttpStatus.CONFLICT,
        message: "could not create the pokemon",
        data: null,
        errors:  {
          message: `name '${name}' or no '${no}' already exists`
        }
      }
    } else {
      try {
        const pokemon = await this.pokemonService.create(body)
        result = {
          statusCode: HttpStatus.CREATED,
          message: "pokemon created successfully",
          data: pokemon
        }
      } catch (e) {
        result = {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: "Precondition failed",
          data: null,
          errors: e
        }
      }
    }

    return result;
  }

  @Get()
  async findAll():Promise<PokemonResponseDto> {
    let result: IPokemonResponse;
    try {
      const pokemons = await this.pokemonService.findAll();
      result = {
        statusCode: HttpStatus.OK,
        message: "pokemons list success",
        data : pokemons
      }
    } catch (e) {
      result = {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: "pokemons list errors",
        data : null,
        errors: e
      }
    }
    return result;
  }

  @Get(':no')
  async findOne(@Param('no',ParseIntPipe) no: number):Promise<PokemonResponseDto> {
    let result: IPokemonResponse;
    try {
      const pokemon = await this.pokemonService.findOne(no);
      if (pokemon) {
        result = {
          statusCode: HttpStatus.OK,
          message:"pokemon success",
          data : pokemon
        }
      } else {
        result = {
          statusCode: HttpStatus.NOT_FOUND,
          message: "pokemon does not exist",
          data : pokemon
        }
      }
     
    } catch (e) {
      result = {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: "pokemon errors",
        data : null,
        errors: e
      }
    }
    return result;
  }

  @Patch(':no')
  async update(@Param('no',ParseIntPipe) no: number, @Body() body: UpdatePokemonDto):Promise<PokemonResponseDto> {
    let result: IPokemonResponse;
    const pokemon = await this.pokemonService.findOne(no);

    if (!pokemon) {
      result = {
        statusCode: HttpStatus.CONFLICT,
        message: "could not update the pokemon",
        data: null,
        errors:  {
          message: `pokemon does not exist`
        }
      }
    } else {
      try {
        if (no === body.no) {
          await this.pokemonService.update(no,body)
          result = {
            statusCode: HttpStatus.OK,
            message: "pokemon update successfully",
            data: null
          }
        }else{
          let pokemonByNo = await this.pokemonService.findOne(body.no);
          if (pokemonByNo) {
            result = {
              statusCode: HttpStatus.CONFLICT,
              message: "could not update the pokemon",
              data: null,
              errors:  {
                message: `${no}' already exists`
              }
            }
          }else {
            await this.pokemonService.update(no,body)
            result = {
              statusCode: HttpStatus.OK,
              message: "pokemon update successfully",
              data: null
            }
          }
        }
        
      } catch (e) {
        result = {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: "Precondition failed",
          data: null,
          errors: e
        }
      }
    }

    return result;
  }

  @Delete(':no')
  async remove(@Param('no',ParseIntPipe) no: number):Promise<PokemonResponseDto> {
    let result: IPokemonResponse;

    const pokemon = await this.pokemonService.findOne(no);

    if (!pokemon) {
      result = {
        statusCode: HttpStatus.CONFLICT,
        message: "could not delete the pokemon",
        data: null,
        errors:  {
          message: `pokemon does not exist`
        }
      }
    } else {
      try {
        await this.pokemonService.remove(no)
        result = {
          statusCode: HttpStatus.OK,
          message: "pokemon delete successfully",
          data: null
        }
      } catch (e) {
        result = {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: "Precondition failed",
          data: null,
          errors: e
        }
      }
    }

    return result;
  }
}
