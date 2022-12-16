export enum EPokemonsSortingOptions {
    alphabetical = "alphabetical",
    length = "length"
}

export interface IGetPokemonsQueryParams {
    query?: string;
    sort?: EPokemonsSortingOptions;
}

export interface IPokeAPIResponseBody {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemon[];
}

export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonHighlight {
    name: string;
    highlight: string;
}