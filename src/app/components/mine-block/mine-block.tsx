import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import styles from "./mine-block.module.css";
import {Preloader} from "../preloader/preloader";
import {Form} from "../form/form";
import {CardWeather} from "../card-weather/card-weather";
import {API_URL, URL_Geocoding} from "../../config";
import {IData} from "../../types";
import {CityButton} from "../cityButton/cityButton";

export const MineBlock = (): JSX.Element => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState<string[]>([])
    const [resCity, setResCity] = useState('')
    const [resCountry, setResCountry] = useState('')
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const removeCitiesFromLS = () => {
        localStorage.removeItem("cities")
        setCities([])
        getData()
    }

    const getBgColor = useCallback((city: string, c: string) => {
        return city.split(' ').pop()?.toLowerCase() === c ? "blue" : "#757575"
    }, [])

    const getData = useCallback(async (defaultCity = "Moscow") => {
        try {
            setLoading(true)
            const responseGeo = await axios.get(URL_Geocoding, {
                headers: {
                    'Content-type': 'Application/json'
                },
                params: {
                    q: `${city ? city.trim() : defaultCity}`
                }
            })
            const latCity = responseGeo.data[0].lat
            const lonCity = responseGeo.data[0].lon
            setResCity(responseGeo.data[0].local_names.ru)
            setResCountry(responseGeo.data[0].country)

            if (latCity && lonCity) {
                try {
                    const response = await axios.get(API_URL, {
                        params: {
                            lat: latCity,
                            lon: lonCity,
                            exclude: "hourly,minutely"
                        }
                    })
                    if (response.status === 200) {
                        setLoading(false)
                        if (city) {
                            if (!cities.includes(city)) {
                                setCities(prevState => ([
                                    ...prevState,
                                    city
                                ]))
                            }
                        }
                        setCity('')
                        setData(response.data.daily)
                    }
                } catch (e) {
                    setLoading(false)
                    setError('Error!')
                }
            }

        } catch (error) {
            setLoading(false)
            setError('City not found')
        }
    }, [city, cities])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        getData()
    }

    useEffect(() => {
        if (cities.length) {
            localStorage.setItem("cities", JSON.stringify(cities))
        }
    }, [cities])

    useEffect(() => {
        const citiesFromLSStr = localStorage.getItem("cities")
        const citiesFromLS: string[] = citiesFromLSStr && JSON.parse(citiesFromLSStr)
        if (citiesFromLS?.length) {
            setCities(citiesFromLS)
        }
        getData()
    }, [])

    return (
        <div className={styles.container}>
            {isLoading
                ? <Preloader/>
                : (<>
                    <Form city={city} onChange={setCity} onSubmit={handleSubmit}/>
                    {error && <h1 className={styles.error}>{error}</h1>}
                    {cities?.length
                        ? (
                            <div className={styles.cities_block}>
                                <div className={styles.cities_container}>
                                    {cities.map((c, index) => <CityButton
                                            key={index}
                                            bgColor={getBgColor(resCity, c)}
                                            text={c}
                                            onClick={() => getData(c)}
                                        />
                                    )}
                                </div>
                                <div className={styles.cities_block__remove_button}>
                                    <CityButton bgColor="#0277bd" text="удалить все" onClick={removeCitiesFromLS}/>
                                </div>
                            </div>
                        )
                        : ""
                    }
                    <div className={styles.block}>
                        {data && data.map((item: IData) => (
                            <CardWeather
                                key={item.dt}
                                city={resCity}
                                country={resCountry}
                                data={item}
                            />
                        ))}
                    </div>
                </>)
            }
        </div>
    )
}