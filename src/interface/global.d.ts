export {}

declare global {
    declare interface AppResponse {
      success: boolean
      code   : number
      message: string
      data   : unknown
    }

    declare interface AppPage<T> { page: T }
    declare interface AppTicketsAction<T> extends AppPage<T> { query: string, limit?: number,  category?: string, sort?: AppSortType }
}