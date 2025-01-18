import axios from "axios";
import { WeatherResponse } from "../types/weather";
import { BASE_URL } from "../config/constants";
import { getFormattedDate, getFormattedTime } from "../utils/date_utils";

export class WeatherService {
  constructor(private readonly apiKey: string) {}

  private async makeRequest(endpoint: string, params: Record<string, string>) {
    console.log(
      this.apiKey,
      params.base_date,
      params.base_time,
      params.nx,
      params.ny
    );

    const response = await axios.get<WeatherResponse>(
      `${BASE_URL}/${endpoint}`,
      {
        params: {
          serviceKey: this.apiKey,
          dataType: "JSON",
          ...params,
        },
      }
    );
    return response.data;
  }

  async getCurrentWeather(nx: string, ny: string) {
    return this.makeRequest("getUltraSrtNcst", {
      numOfRows: "10",
      pageNo: "1",
      base_date: getFormattedDate(),
      base_time: getFormattedTime(),
      nx,
      ny,
    });
  }

  async getForecast(nx: string, ny: string) {
    return this.makeRequest("getVilageFcst", {
      numOfRows: "100",
      pageNo: "1",
      base_date: getFormattedDate(),
      base_time: getFormattedTime(),
      nx,
      ny,
    });
  }

  async getUltraForecast(nx: string, ny: string) {
    return this.makeRequest("getUltraSrtFcst", {
      numOfRows: "60",
      pageNo: "1",
      base_date: getFormattedDate(),
      base_time: getFormattedTime(true),
      nx,
      ny,
    });
  }

  async getVersion(ftype: string) {
    const baseDatetime = `${getFormattedDate()}${getFormattedTime()}`;
    return this.makeRequest("getFcstVersion", {
      numOfRows: "10",
      pageNo: "1",
      ftype,
      basedatetime: baseDatetime,
    });
  }
}
