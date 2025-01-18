// src/services/weather_service.ts
import axios from "axios";
import { WeatherResponse } from "../types/weather";
import { BASE_URL } from "../config/constants";
import { getFormattedDate, getFormattedTime } from "../utils/date_utils";

export class WeatherService {
  private async makeRequest(
    endpoint: string,
    params: Record<string, string>,
    serviceKey: string
  ) {
    const response = await axios.get<WeatherResponse>(
      `${BASE_URL}/${endpoint}`,
      {
        params: {
          serviceKey,
          dataType: "JSON",
          ...params,
        },
      }
    );
    return response.data;
  }

  async getCurrentWeather(nx: string, ny: string, serviceKey: string) {
    return this.makeRequest(
      "getUltraSrtNcst",
      {
        numOfRows: "10",
        pageNo: "1",
        base_date: getFormattedDate(),
        base_time: getFormattedTime(),
        nx,
        ny,
      },
      serviceKey
    );
  }

  async getForecast(nx: string, ny: string, serviceKey: string) {
    return this.makeRequest(
      "getVilageFcst",
      {
        numOfRows: "100",
        pageNo: "1",
        base_date: getFormattedDate(),
        base_time: getFormattedTime(),
        nx,
        ny,
      },
      serviceKey
    );
  }

  async getUltraForecast(nx: string, ny: string, serviceKey: string) {
    return this.makeRequest(
      "getUltraSrtFcst",
      {
        numOfRows: "60",
        pageNo: "1",
        base_date: getFormattedDate(),
        base_time: getFormattedTime(true),
        nx,
        ny,
      },
      serviceKey
    );
  }

  async getVersion(ftype: string, serviceKey: string) {
    const baseDatetime = `${getFormattedDate()}${getFormattedTime()}`;
    return this.makeRequest(
      "getFcstVersion",
      {
        numOfRows: "10",
        pageNo: "1",
        ftype,
        basedatetime: baseDatetime,
      },
      serviceKey
    );
  }
}
