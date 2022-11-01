import React, {useState} from "react";
import styles from "./card-weather.module.css";
import {Modal} from "../modal/modal";
import {dayOfWeek} from "../../../constants";

interface Props {
    country: string,
    city: string,
    data: any,
}

export const CardWeather: React.FC<Props> = ({country, city, data}): JSX.Element => {
    const [showModal, setModal] = useState(false)
    const icon = data.weather[0].icon + '@2x.png'
    const today = new Date().toLocaleDateString() === new Date(data.dt * 1000).toLocaleDateString()
    const date = new Date(data.dt * 1000)
    const symbol = Number(data.temp.day) > 0 ? '+' : ''
    const temperature = Math.round(Number(data.temp.day))

    const toggleModal = () => setModal(!showModal)

    return (
        <div className={styles.cardWeather_container}>
            <div className={styles.cardWeather_image_block}>
                <img src={`https://openweathermap.org/img/wn/${icon}`} alt="img"/>
            </div>
            <div className={styles.cardWeather_content_block}>
                <div className={styles.cardWeather_date} style={today ? {color: 'red'} : {}}>
                    {today && <span>Сегодня,</span>}
                    <span>{dayOfWeek[date.getDay()]},</span>
                    <span>{date.toLocaleDateString()}</span>
                </div>
                <div>
                    <h1 className={styles.city}>{city}, {country}</h1>
                </div>
                <p className={styles.description}>{data.weather[0].description}</p>
                <p className={styles.temp_value}>{symbol + String(temperature)}&#8451;</p>
                <button className={styles.button} onClick={toggleModal}>Подробнее</button>
                {showModal && <Modal isOpen={showModal} onToggleModal={toggleModal} city={city} data={data}/>}
            </div>
        </div>
    )
}