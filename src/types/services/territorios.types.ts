import type { ServiceError, ServiceSuccess } from './global.types';

import type {
  TerritorioApiList,
  TerritorioApiDetails,
} from '../api/territorios.types';

export interface ErrorResponse {
  message?: string;
}

export type TerritorioListResponse =
  | ServiceSuccess<TerritorioApiList>
  | ServiceError;
export type TerritorioDetailsResponse =
  | ServiceSuccess<TerritorioApiDetails>
  | ServiceError;
export type CreateTerritorioResponse = { success: true } | ServiceError;
export type UpdateTerritorioResponse = CreateTerritorioResponse;
export type DeleteTerritorioResponse = CreateTerritorioResponse;
export type UpdateBairroResponse = CreateTerritorioResponse;
