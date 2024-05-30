export type EventType = {
    id: number
    month: string
    title: string
    description: string
    date: string
    time: string
    place: string
    color: string | null
}

export type EventTypeWithoutId = {
    month: string
    title: string
    description: string
    date: string
    time: string
    place: string
    color: string | null
}

export type AdminResponseType = {
    resCode: 0 | 1
    error?: string
}