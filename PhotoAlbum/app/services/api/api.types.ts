import { GeneralApiProblem } from "./api-problem"

export interface Photo {
  albumId: number;
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export type GetPhotosResult = Photo[] | GeneralApiProblem
