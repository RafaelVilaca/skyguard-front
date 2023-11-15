import React from 'react';
import './style.css'

interface ICoord {
    lon: string,
    lat: string
}

interface IWeather {
    main: string,
    description: string
}

interface IClouds {
    all: number
}

interface IMain {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}

interface IWind {
    speed: number,
    gust: number
}

interface IList {
    main: IMain,
    weather: IWeather[],
    clouds: IClouds,
    wind: IWind, 
    dt_txt: string
}

interface IWeatherForecastProps {
    cityWeather: { 
        list: IList[],
        city: {
            coord: ICoord;
            population: number;
            name: "" | undefined;
        }  
    };
}

const WeatherForecast: React.FC<IWeatherForecastProps> = props => {
    const { list, city } = props.cityWeather

    function capitalizarPrimeiraLetra(palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }

    function convertMilissegundosToDate (date) {
        const data = new Date(date);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');

        return `${dia}/${mes}/${ano} às ${hora}:${minutos}:${segundos}`;
    }

    return (
        <>
            <div style={{ 
                borderRadius: '10px', 
                border: 'outset', 
                padding: '15px', 
                background: 'powderblue',
                textAlign: 'center'
            }}>
                <h5>Cidade Pesquisada: &nbsp;
                    <strong style={{ fontSize: "x-large", color: "crimson" }}>{city.name}</strong>
                    &nbsp;com as coordenadas: Latitude&nbsp;
                    <strong style={{ fontSize: "x-large", color: "gray" }}>{city.coord.lat}</strong>
                    &nbsp;com as coordenadas: Longitude&nbsp;
                    <strong style={{ fontSize: "x-large", color: "gray" }}>{city.coord.lon}</strong>
                </h5>
            </div>
            {list.map(item => (
                <div className='card'>
                    <span>Data:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {convertMilissegundosToDate(item.dt_txt)}
                        </strong>
                        <br />
                        Temperatura:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "crimson" }}>
                            {Math.ceil(item.main.temp - 273.15)}°
                        </strong>&nbsp;e o tempo estará &nbsp;
                        <strong style={{ fontSize: "large", color: "gray" }}>
                            {capitalizarPrimeiraLetra(item.weather[0].description)}
                        </strong>
                    </span>
                    <br />
                    <span>Sensação Térmica:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {Math.ceil(item.main.feels_like - 273.15)}°
                        </strong>&nbsp;&nbsp;
                        <br />
                        Humidade do Ar:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {Math.ceil(item.main.humidity)}%
                        </strong>
                    </span>
                    <br />
                    <span>Pressão atmosférica ao nível do mar:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {Math.round(item.main.pressure)}&nbsp;hPa
                        </strong>
                        <br />
                        Porcentagem de Nuvens:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {item.clouds.all}&nbsp;%
                        </strong>
                    </span>
                    <br />
                    <span>Velocidade dos Ventos:&nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {Number((item.wind.speed * 3.6).toFixed(2))}&nbsp;km/h
                        </strong>
                        <br />
                        Podendo ter Rajadas de: &nbsp;&nbsp;
                        <strong style={{ fontSize: "large", color: "blue" }}>
                            {Number((item.wind.gust * 3.6).toFixed(2))}&nbsp;km/h
                        </strong>&nbsp;
                    </span>
                </div>
            ))}
        </>
    )
}

export default WeatherForecast;
