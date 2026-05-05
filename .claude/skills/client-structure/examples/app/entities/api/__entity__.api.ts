import { __entity__Fetcher } from "@/pkg/rest-api/fetcher";
import type { I__Entity__, I__Entity__Detail } from "@/app/entities/models";

export async function fetchAll__Entity__s(): Promise<I__Entity__[]> {
  return __entity__Fetcher.get("__entity__s").json<I__Entity__[]>();
}

export async function fetch__Entity__ById(id: string): Promise<I__Entity__Detail> {
  return __entity__Fetcher.get(`__entity__s/${id}`).json<I__Entity__Detail>();
}
