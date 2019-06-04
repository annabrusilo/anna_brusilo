export class CharacterModel {
  public id: number;
  public name: string;
  public species: string;
  public gender: string;
  public homeworld: string;

  constructor(options: {
    id?: number;
    name?: string;
    species?: string;
    gender?: string;
    homeworld?: string
  }) {
    options = options || {};
    this.id = options.id || null;
    this.name = options.name || '';
    this.species = options.species || '';
    this.gender = options.gender || '';
    this.homeworld = options.homeworld || '';
  }
}
