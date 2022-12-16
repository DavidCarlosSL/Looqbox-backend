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

        //This method implements the Counting Sort Algorithm for sorting the array of pokemons by length

        const longestPokemonName = pokemonsToSort.reduce((pokemonA, pokemonB) => { //Find the pokemon with the longest name
            return pokemonA.length > pokemonB.length ? pokemonA : pokemonB;
        });

        const count: number[] = []; //List of counts for each unique value (length of pokemon's name) in the pokemon array
        const sortedPokemons: string[] = []; //Array that will be returned containing the sorted pokemons. Initally is empty

        let i: number = 0;
        
        for(i = 0; i <= longestPokemonName.length; i++){ //For Loop responsible to fill the count array with zeros. count array will have the length of
            count[i] = 0;                                //the longest pokemon name plus one
        }

        for (i = 0; i < pokemonsToSort.length; i++) { //For Loop responsible to fill the sortedPokemons array with "empty" strings. sortedPokemons array will
            sortedPokemons[i] = " ";                  //have the same length of the pokemonsToSort array
        }

        for (i = 0; i < pokemonsToSort.length; i++) { //For Loop responsible for define how many times each unique value (length of pokemon's name) appears
            count[pokemonsToSort[i].length]++;
        }

        for (i = 1; i < count.length; i++) { //For Loop responsible to define each index as equal to the sum of itself plus the previous one
            count[i] += count[i-1];
        }

        for (i = pokemonsToSort.length - 1; i >= 0; i--) {
            sortedPokemons[--count[pokemonsToSort[i].length]] = pokemonsToSort[i]; //For Loop resposible to iterate backwards through the pokemonsToSort array
                                                                                   //It copy elements from pokemonsToSort to sortedPokemons according to the count
        }

        //According to already defined studies, the Counting Sort Algorithm have a Average Time Complexity of O(N+K), where N is the number of elements in the
        //input and K is the range of elements (K = largest element - smallest element). The Space Complexity is O(K)

        return sortedPokemons;
    }
}

const pokemonsService = new PokemonsService();

export default pokemonsService;
