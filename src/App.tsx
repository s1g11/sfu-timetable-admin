import './App.module.css'
import {SearchTable} from "./SearchTable/SearchTable.tsx";
import {useState} from "react";
import {EventType} from "./types/types.ts";
import {API} from './api/API.ts';
import lupa from './img/lupa.png'
import s from "./App.module.css"
import {Header} from './Header/Header.tsx';

function App() {
    const [searchedEvents, setSearchedEvents] = useState<EventType[]>([])
    const [inputValue, setInputValue] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [place, setPlace] = useState('')
    const [color, setColor] = useState('')

    const searchEvents = async () => {
        const res = await API.searchEvents(inputValue)
        if (res.data) {
            setSearchedEvents(res.data)
        }
    }

    const addEvent = async () => {
        const event = {
            title, description, date, time, place, color, month: date.split('.')[1] + '.' + date.split('.')[2]
        }
        await API.addEvent(event, login, password)
    }

    const changeEvent = async () => {
        const one = date.split('.')[1] + '.' + date.split('.')[2]

        if (date.split('.')[1].length === 2) {
            const one = date.split('.')[1][1] + '.' + date.split('.')[2]

        }

        const event = {
                    id: +id, title, description, date, time, place, color, month: one
        }
        await API.changeEvent(event, 'admin', '1234')
    }
    const changeEditMode = () => {
        setEditMode(!editMode)
        setTitle('')
        setDate('')
        setDescription('')
        setTime('')
        setPlace('')
        setColor('')
    }

    const deleteEvent = async () => {
        console.log(deleteId)
        await API.deleteEvent(+deleteId, 'admin', '1234')
    }

    const findByID = async () => {
        const res = await API.findEventById(+id)
        // @ts-ignore
        const event = res.data[0]
        if (event) {
            setTitle(event.title)
            setDate(event.date)
            setDescription(event.description)
            setTime(event.time)
            setPlace(event.place)
            setColor(event.color || '')

        }
    }

    const addEventClickHandler = () => {
        addEvent()
    }

    const onClickHandler = () => {
        searchEvents()
    }

    const changeEventClickHandler = () => {
        changeEvent()
    }

    const onDeleteHandler = () => {
        deleteEvent()
    }

    const findByIDHandler = () => {
        findByID()
    }


    return (
        <div className={s.app}>
            <Header login={login} password={password} setLogin={setLogin} setPassword={setPassword} />
            <div className={s.container}>
                <div>
                    <div className={s.addEvent}>
                        <input value={title} onChange={e => setTitle(e.currentTarget.value)}
                               placeholder={"Название события"} type="text"/>
                        <input value={description} onChange={e => setDescription(e.currentTarget.value)}
                               placeholder={"Описание события"} type="text"/>
                        <input value={date} onChange={e => setDate(e.currentTarget.value)} placeholder={"Дата события"}
                               type="text"/>
                        <input value={time} onChange={e => setTime(e.currentTarget.value)} placeholder={"Время события"}
                               type="text"/>
                        <input value={place} onChange={e => setPlace(e.currentTarget.value)}
                               placeholder={"Место события"} type="text"/>
                        <input value={color} onChange={e => setColor(e.currentTarget.value)}
                               placeholder={"Цвет события"} type="text"/>
                        {editMode
                            ? <>
                                <input value={id} onChange={e => setId(e.currentTarget.value)}
                                       placeholder={"ID события"} type="text"/>
                                <button onClick={changeEventClickHandler} className={s.addEventBut}>Редактировать по ID
                                </button>
                                <button onClick={findByIDHandler} className={s.addEventBut}>Найти по ID
                                </button>
                                <button onClick={changeEditMode} className={s.addEventBut}>Переключиться на добавление
                                </button>
                            </>
                            : <>
                                <button onClick={addEventClickHandler} className={s.addEventBut}>Добавить событие
                                </button>
                                <button onClick={changeEditMode} className={s.addEventBut}>Переключиться на изменение
                                </button>
                            </>
                        }
                        <input value={deleteId} onChange={e => setDeleteId(e.currentTarget.value)}
                               placeholder={"ID события"} type="text"/>
                        <button onClick={onDeleteHandler}>Удалить</button>
                    </div>

                </div>
                <div className={s.search}>
                    <div className={s.input}>
                        <input value={inputValue} onChange={e => setInputValue(e.currentTarget.value)}
                               placeholder={"Название события"} type="text"/>
                        <button onClick={onClickHandler} className={s.lupa}>< img src={lupa} alt=""/></button>
                    </div>
                    <SearchTable events={searchedEvents}/>
                </div>
            </div>
        </div>
    )
}

export default App
