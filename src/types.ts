export type DeepPartial<T> =
  T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

export type AllowedStateTypes =
  | string
  | number
  | bigint
  | boolean
  | Record<string, any>
  | Array<any>
  | Map<any, any>
  | Set<any>;