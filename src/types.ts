export interface IData {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: { day: number, night: number, eve: number, morn: number }
    humidity: number
    moon_phase: number
    moonrise: number
    moonset: number
    pop: number
    pressure: number
    sunrise: number
    sunset: number
    temp: {
        day: number
        eve: number
        max: number
        min: number
        morn: number
        night: number
    }
    uvi: 7
    weather: [{ id: number, main: string, description: string, icon: string }]
    wind_deg: number
    wind_gust: number
    wind_speed: number
}