import {EventType} from "../types/types.ts";
import s from './SearchTable.module.css'
import cat from '../img/cat.png'

type PropsType = {
    events: EventType[]
}

export const SearchTable = (props: PropsType) => {
    return (
        <>
            <table className={s.SearchTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th className={s.disc}>Описание</th>
                    <th>Дата</th>
                    <th>Место</th>
                </tr>
                </thead>
                <tbody>
                {props.events.map(e => <tr>
                    <td>{e.id}</td>
                    <td style={{borderRight: `5px solid ${e.color || ""}`}}>{e.title}</td>
                    <td>{e.description}</td>
                    <td>{e.date} {e.time}</td>
                    <td>{e.place}</td>
                </tr>)}
                </tbody>
            </table>
            {!props.events.length && <div className={s.noResults}>Нет результатов поиска.. <img src={cat} alt=""/></div>}
        </>
    )
}