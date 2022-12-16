import express from 'express';

import { validateRequestQueryParams } from "../../middlewares/validate-request-query-params.middleware";

import { JPokemonsQueryParams, JPokemonsHighlightQueryParams } from "../../schemas/joi/pokemons/pokemons-get.schema";

import pokemonsController from '../../controllers/pokemons.controller';

const router = express.Router();

router.get(
    "/",
    validateRequestQueryParams(JPokemonsQueryParams.schema, JPokemonsQueryParams.schemaValidateOptions),
    pokemonsController.getPokemons.bind(pokemonsController)
);

router.get(
    "/highlight",
    validateRequestQueryParams(JPokemonsHighlightQueryParams.schema, JPokemonsHighlightQueryParams.schemaValidateOptions),
    pokemonsController.getPokemonsHighlight.bind(pokemonsController)
);

export default router;