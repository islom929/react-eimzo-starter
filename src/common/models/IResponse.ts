export interface IResponse<T> {
    error: string,
    success: boolean,
    result: T
}