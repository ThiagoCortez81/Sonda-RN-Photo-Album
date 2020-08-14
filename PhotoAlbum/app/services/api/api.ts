import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of photos.
   */
  async getPhotos(): Promise<Types.GetPhotosResult> {
    if (!this.apisauce)
      this.setup();
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/photos`)

    // the typical ways to die when calling an api
    if (!response) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertPhoto = (raw) => {
      return {
        albumId: raw.albumId,
        id: raw.id,
        title: raw.title,
        url: raw.url,
        thumbnailUrl: raw.thumbnailUrl
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawPhotosData = response.data
      return rawPhotosData.map(convertPhoto)
    } catch {
      return []
    }
  }
}
