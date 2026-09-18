export type GetOne<T> = (id: number, token: string) => Promise<T>
export type Get<T> = (token: string) => Promise<T[]>
export type Post<T, K> = (record: K, token: string) => Promise<T>
export type Put<T> = (record: T, token: string) => Promise<T>
export type Delete<T> = (id: number, token: string) => Promise<T>
