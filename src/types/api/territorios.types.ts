export interface TerritorioListItem {
  idTerritorio: number;
  territorio: string;
}

export interface TerritorioApiList {
  content: TerritorioListItem[];
}

export interface TerritorioApiDetails {
  idTerritorio: number;
  territorio: string;
  bairros: string[];
}
