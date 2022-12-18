import Joi from 'joi';

import { IJoiSchema } from '../../../interfaces/joi/joi-schemas.interface';
import { EPokemonsSortingOptions } from '../../../interfaces/pokemons/pokemons.interface';

import { JDefaultSchemaValidateOptions } from '../default/joi-default.schema';

const JPokemonsQueryParamsDefault: Joi.PartialSchemaMap = {
    query: Joi.string().min(1).max(35),
    sort: Joi.string().valid(EPokemonsSortingOptions.alphabetical, EPokemonsSortingOptions.length)
}

export const JPokemonsQueryParams: IJoiSchema = {
    schema: Joi.object(JPokemonsQueryParamsDefault),
    schemaValidateOptions: JDefaultSchemaValidateOptions
}

export const JPokemonsHighlightQueryParams: IJoiSchema = {
    schema: Joi.object(JPokemonsQueryParamsDefault),
    schemaValidateOptions: JDefaultSchemaValidateOptions
}