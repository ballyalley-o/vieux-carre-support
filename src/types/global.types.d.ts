export {}

declare global {
    declare type PriorityType    = 'LOW' |  'MEDIUM'| 'HIGH'
    declare type PriorityKeyType = 'low' | 'medium' | 'high'
    declare type UserRoleType    = 'admin' | 'user'
    declare type AppLogLevelType = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'
    declare type AppResponseType = Promise<AppResponse>
    declare type AppButtonType   = 'submit' | 'reset' | 'button' | undefined
    declare type AppSortType     = 'newest' | 'oldest'| 'priority'

    declare type UserSession     = { name: string | null; id: string; email: string } | null
}