import * as mongoose from 'mongoose';
import { IPokemon } from '../interfaces/pokemon.interface';

function transformValue(doc, ret: { [Key: string]: any }) {
    delete ret._id;
}

export const PokemonSchema = new mongoose.Schema<IPokemon>(
    {
        name: {
            type: String,
            unique: true,
            maxlength: 20,
            required: [true, 'name can not be empty'],
        },
        no: {
            type: Number,
            unique: true,
            required: [true, 'No can not be empty'],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: transformValue,
        },
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: transformValue,
        },
    },
);
