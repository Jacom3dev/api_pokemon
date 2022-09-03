import { Document } from "mongoose";


export interface IPokemon extends Document {
    id:string;
    name:string;
    no:number;
}