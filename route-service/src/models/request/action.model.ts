export interface ActionResult<T> {
    items: T[];
    isSuccess: boolean;
    message?: any;
}
