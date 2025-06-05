export {}

declare global {
    declare type PriorityType    = 'LOW' |  'MEDIUM'| 'HIGH'
    declare type PriorityKeyType = 'low' | 'medium' | 'high'

    declare type AppLogLevelType = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'
    declare type AppResponseType = Promise<AppResponse>
    declare type AppButtonType   = 'submit' | 'reset' | 'button' | undefined
}