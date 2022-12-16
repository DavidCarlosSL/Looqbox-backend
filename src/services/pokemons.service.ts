import axios from "axios";

import { IPokeAPIResponseBody, IPokemon, IPokemonHighlight } from "../interfaces/pokemons/pokemons.interface";

export interface IPokemonsService {
    requestPokemons(): Promise<IPokeAPIResponseBody>;
    filterPokemonsByPartialName(partialName: string, pokemonsToFilter: IPokemon[]): IPokemon[];
    highlightPokemonsName(partialName: string, pokemonsToHighlight: string[]): IPokemonHighlight[];
    sortPokemonsByAlphabetical(pokemonsToSort: string[]): string[];
    sortPokemonsByLength(pokemonsToSort: string[]): string[];
}

class PokemonsService implements IPokemonsService {

    constructor() {}

    public async requestPokemons(): Promise<IPokeAPIResponseBody>{
        try{
            const limit = 1154;
            const offset = 0;

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
                { headers: { 'Accept-Encoding': 'application/json' } }
            );

            if(response.status !== 200) throw new Error();

            const responseBody = response.data as IPokeAPIResponseBody;

            return responseBody;
        }catch(error){
            throw error;
        }
    }

    public filterPokemonsByPartialName(partialName: string, pokemonsToFilter: IPokemon[]): IPokemon[] {
        let filteredPokemons = pokemonsToFilter;

        partialName = partialName.toLowerCase();

        filteredPokemons = filteredPokemons.filter((pokemon) => {
            return pokemon.name.includes(partialName);
        });

        return filteredPokemons;
    }

    public highlightPokemonsName(partialName: string, pokemonsToHighlight: string[]): IPokemonHighlight[] {
        let highlightedPokemons: IPokemonHighlight[] = [];

        const regex = new RegExp(`${partialName}`, "gi");

        highlightedPokemons = pokemonsToHighlight.map((pokemon): IPokemonHighlight => {
            return {
                name: pokemon,
                highlight: pokemon.replace(regex, `<pre>${partialName}</pre>`)
            };
        })

        return highlightedPokemons;
    }

    public sortPokemonsByAlphabetical(pokemonsToSort: string[]): string[] {
        
        //

        return pokemonsToSort;
    }

    public sortPokemonsByLength(pokemonsToSort: string[]): string[] {

        const longestPokemonName = pokemonsToSort.reduce((pokemonA, pokemonB) => {
            return pokemonA.length > pokemonB.length ? pokemonA : pokemonB;
        });

        const count: number[] = [];
        const sortedPokemons: string[] = [];

        let i: number = 0;
        
        for(i = 0; i <= longestPokemonName.length; i++){
            count[i] = 0;
        }

        for (i = 0; i < pokemonsToSort.length; i++) {
            sortedPokemons[i] = " ";
        }

        for (i = 0; i < pokemonsToSort.length; i++) {
            count[pokemonsToSort[i].length]++;
        }

        for (i = 1; i < count.length; i++) {
            count[i] += count[i-1];
        }

        for (i = pokemonsToSort.length - 1; i >= 0; i--) {
            sortedPokemons[--count[pokemonsToSort[i].length]] = pokemonsToSort[i];
        }

        return sortedPokemons;
    }
}

const pokemonsService = new PokemonsService();

export default pokemonsService;
