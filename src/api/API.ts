import axios from "axios"
import {AdminResponseType, EventType, EventTypeWithoutId} from "../types/types.ts";
import { SetStateAction } from "react";

const instance = axios.create({
    baseURL: 'http://localhost:5000/events'
})

export const API = {
    searchEvents: (title: string) => {
        return instance.get<SetStateAction<EventType[]>>(`/search/${title}`)
    },
    findEventById: (id: number) => {
        return instance.get<SetStateAction<EventType>>(`/search/${id}`,)
    },
    addEvent: (event: EventTypeWithoutId, login: string, password: string) => {
        return instance.post<SetStateAction<AdminResponseType>>('/', {login, password, event})
    },
    changeEvent: (event: EventType, login: string, password: string) => {
        return instance.put<SetStateAction<AdminResponseType>>('/', {login, password, event})
    },
    deleteEvent: (id: number, login: string, password: string) => {
        console.log(id)
        return instance.put<SetStateAction<AdminResponseType>>('/delete', {login, password, eventId: id})
    },
}