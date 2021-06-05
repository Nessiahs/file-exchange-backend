import { getSettingByType } from "../db/getSettingByType";

export type TIpRestriction = {
  restricted: boolean;
  allowedIp: string[];
  useProxy: boolean;
  proxyHeader: string[];
};

let cache: TIpRestriction;
const defaults: TIpRestriction = {
  restricted: false,
  allowedIp: [],
  useProxy: false,
  proxyHeader: [],
};
const cacheByDb = async () => {
  try {
    const result = await getSettingByType("ipRestrictions");
    const parsed = JSON.parse(result.settings);
    if (!parsed) {
      cache = defaults;
      return;
    }
    cache = parsed;
  } catch (error) {
    cache = defaults;
  }

  return;
};
cacheByDb();

export const ipSettings = {
  get: () => {
    if (cache) {
      return cache;
    }
  },
  refresh: cacheByDb,
};
