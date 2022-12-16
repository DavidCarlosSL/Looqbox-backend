import { Request, Response } from "express";

import { EPokemonsSortingOptions, IGetPokemonsQueryParams, IPokemon, IPokemonHighlight } from "../interfaces/pokemons/pokemons.interface";

import pokemonsService, { IPokemonsService } from "../services/pokemons.service";

import commonMessages from "../utils/messages/common/common.messages.json";

class PokemonsController {

    constructor(private pokemonsService: IPokemonsService) {}

    public async getPokemons(req: Request, res: Response) {
        try{
            const { query } = req.query as IGetPokemonsQueryParams;
            let { sort } = req.query as IGetPokemonsQueryParams;
            
            const requestPokemonsResponse = await this.pokemonsService.requestPokemons();
            let requestPokemonsResponseResults = requestPokemonsResponse.results;

            if(query)
                requestPokemonsResponseResults = this.pokemonsService.filterPokemonsByPartialName(query, requestPokemonsResponseResults);

            let result = requestPokemonsResponseResults.map((pokemon: IPokemon) => pokemon.name);

            sort = sort || EPokemonsSortingOptions.alphabetical;

            if(sort === EPokemonsSortingOptions.alphabetical)
                result = this.pokemonsService.sortPokemonsByAlphabetical(result);
            else if(sort === EPokemonsSortingOptions.length)
                result = this.pokemonsService.sortPokemonsByLength(result);

            res.status(200).send({ result });
        }catch(error){
            res.status(500).send(commonMessages.something_wrong_try_again_later);
        }
    }

    public async getPokemonsHighlight(req: Request, res: Response) {
        try{
            const { query } = req.query as IGetPokemonsQueryParams;
            let { sort } = req.query as IGetPokemonsQueryParams;

            let highlightPokemons: boolean = false;

            const requestPokemonsResponse = await this.pokemonsService.requestPokemons();
            let requestPokemonsResponseResults = requestPokemonsResponse.results;

            if(query){
                requestPokemonsResponseResults = this.pokemonsService.filterPokemonsByPartialName(query, requestPokemonsResponseResults);
                highlightPokemons = true;
            }

            let result: string[] | IPokemonHighlight[] = requestPokemonsResponseResults.map((pokemon: IPokemon) => pokemon.name);

            sort = sort || EPokemonsSortingOptions.alphabetical;

            if(sort === EPokemonsSortingOptions.alphabetical)
                result = this.pokemonsService.sortPokemonsByAlphabetical(result);
            else if(sort === EPokemonsSortingOptions.length)
                result = this.pokemonsService.sortPokemonsByLength(result);


            if(highlightPokemons === true)
                result = this.pokemonsService.highlightPokemonsName(query!, result);
            
            res.status(200).send({ result });
        }catch(error){
            res.status(500).send(commonMessages.something_wrong_try_again_later);
        }
    }
}

const pokemonsController = new PokemonsController(pokemonsService);

export default pokemonsController;