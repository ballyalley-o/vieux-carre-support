export {}

declare global {
    declare interface AppResponse {
      success: boolean
      code   : number
      message: string
      data   : unknown
    }
}