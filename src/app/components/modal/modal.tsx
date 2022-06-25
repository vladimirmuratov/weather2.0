import React from "react";
import ReactModal from "react-modal";
import styles from "./modal.module.css";
import {IData} from "../../types";

interface Props {
    isOpen: boolean,
    onToggleModal: () => void,
    data: IData,
    city: string,
}

export const Modal: React.FC<Props> = ({isOpen, onToggleModal, data, city}): JSX.Element => {
    const {weather, dt, temp, sunrise, sunset, uvi, pop, humidity, pressure, clouds, wind_speed} = data
    const today = new Date().toLocaleDateString() === new Date(dt * 1000).toLocaleDateString()
    const date = new Date(dt * 1000)

    const symbol = Number(data.temp.day) > 0 && '+'
    const temperature = Math.round(Number(temp.day))

    const sunriseDate = new Date(sunrise * 1000).getHours() + 'ч.' + new Date(sunrise * 1000).getMinutes() + 'мин.'
    const sunsetDate = new Date(sunset * 1000).getHours() + 'ч.' + new Date(sunset * 1000).getMinutes() + 'мин.'

    const icon = data.weather[0].icon + '@2x.png'

    const dayOfWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ]

    return (
        <ReactModal
            isOpen={isOpen}
            parentSelector={() => document.body}
            className={styles.modal_container}
            ariaHideApp={false}
        >
            <div className={styles.image}>
                <img src={`http://openweathermap.org/img/wn/${icon}`} alt="img"/>
            </div>
            <div className={styles.date} style={today ? {color: 'red'} : {}}>
                {today && <span>Сегодня,</span>}
                <span>{dayOfWeek[date.getDay()]},</span>
                <span>{date.toLocaleDateString()}</span>
            </div>
            <p className={styles.city}>{city}</p>
            <p className={styles.description}>{weather[0].description}</p>
            <p className={styles.temp_value}>{symbol + String(temperature)}&#8451;</p>
            <p className={styles.description}>температура:</p>
            <ul>
                <li>max: {temp.max}</li>
                <li>min: {temp.min}</li>
                <li>ночь: {temp.night}</li>
                <li>утро: {temp.morn}</li>
                <li>день: {temp.day}</li>
                <li>вечер: {temp.eve}</li>
            </ul>
            <p className={styles.description}>облачность: {clouds}%</p>
            <p className={styles.description}>ветер: {wind_speed}м/с</p>
            <p className={styles.description}>восход солнца: {sunriseDate}</p>
            <p className={styles.description}>закат солнца: {sunsetDate}</p>
            <p className={styles.description}>активнось солнца(uvi): {uvi}</p>
            <p className={styles.description}>вероятность осадков: {pop * 100}%</p>
            <p className={styles.description}>влажность: {humidity}%</p>
            <p className={styles.description}>атмосферное давление: {pressure}ГПа</p>

            <button onClick={onToggleModal} className={styles.button}>закрыть</button>
        </ReactModal>
    )
}