import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import styles from "./mine-block.module.css";
import {Preloader} from "../preloader/preloader";
import {Form} from "../form/form";
import {CardWeather} from "../card-weather/card-weather";
import {API_URL, URL_Geocoding} from "../../../config";
import {IData} from "../../../types";

export const MineBlock = (): JSX.Element => {
    const [city, setCity] = useState('')
    const [resCity, setResCity] = useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const getData = useCallback(async () => {
        try {
            const responseGeo = await axios.get(URL_Geocoding, {
                headers: {
                    'Content-type': 'Application/json'
                },
                params: {
                    q: `${city ? city.trim() : "Moscow"}`
                }
            })
            const latCity = responseGeo.data[0].lat
            const lonCity = responseGeo.data[0].lon
            setResCity(responseGeo.data[0].local_names.ru)

            if (latCity && lonCity) {
                const response = await axios.get(API_URL, {
                    params: {
                        lat: latCity,
                        lon: lonCity,
                        exclude: "hourly,minutely"
                    }
                })
                if (response.status === 200) {
                    setCity('')
                    return response.data.daily
                }
            }

        } catch (error) {
            setError('City not found')
        }
    }, [city])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        getData().then(res => {
            setData(res)
            setLoading(false)
        })
    }

    useEffect(() => {
        getData().then(res => {
            setData(res)
            setLoading(false)
        })
    }, [])

    return (
        <div className={styles.container}>
            {isLoading
                ? <Preloader/>
                : (<>
                    <Form city={city} onChange={setCity} onSubmit={handleSubmit}/>
                    {error && <h1 className={styles.error}>{error}</h1>}
                    <div className={styles.block}>
                        {data && data.map((item: IData) => (
                            <CardWeather
                                key={item.dt}
                                city={resCity}
                                data={item}
                            />
                        ))}
                    </div>
                </>)
            }
        </div>
    )
}