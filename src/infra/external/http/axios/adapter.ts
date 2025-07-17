import { Either, left, right } from "@/infra/shared/either";
import { HttpClient } from "@/infra/external/http/http-client";
import axios, { AxiosInstance, isAxiosError } from "axios";
import { jsCookieBrowserStorage } from "@/infra/external/storage/js-cookie-browser-storage";

const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME;

export class AxiosAdapter implements HttpClient {
  private readonly api: AxiosInstance;

  constructor(private getToken: () => string | null) {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });

    this.api.interceptors.request.use((config) => {
      const token = this.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async get<Result>(
    url: string,
    params?: object | undefined,
  ): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.get<Result>(url, {
        params,
      });
      return right(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message));
      }

      return left(new Error("Ocorreu um erro interno."));
    }
  }

  async post<Result>(
    url: string,
    body: object,
  ): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.post<Result>(url, body);

      return right(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message));
      }

      return left(new Error("Ocorreu um erro interno."));
    }
  }

  async delete<Result>(url: string): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.delete<Result>(url);

      return right(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message));
      }

      return left(new Error("Ocorreu um erro interno."));
    }
  }

  async patch<Result>(
    url: string,
    body: object,
  ): Promise<Either<Error, Result>> {
    try {
      const { data } = await this.api.patch<Result>(url, body);

      return right(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return left(new Error(error.response?.data.message));
      }

      return left(new Error("Ocorreu um erro interno."));
    }
  }
}
const getToken = () => jsCookieBrowserStorage.get(tokenName);
export const client = new AxiosAdapter(getToken);
