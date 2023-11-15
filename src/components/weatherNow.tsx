import React from 'react';

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

interface IWeatherNowProps {
    cityWeather: { 
        coord: ICoord;
        clouds: IClouds;
        weather: IWeather;
        main: IMain;
        wind: IWind;
        name: "" | undefined;
        dt: any;
    };
}

const WeatherNow: React.FC<IWeatherNowProps> = props => {
    const { coord, clouds, weather, main, wind, name = '', dt } = props.cityWeather

    function capitalizarPrimeiraLetra(palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }

    function convertMilissegundosToDate (milissegundos) {
        const data = new Date(milissegundos*1000);

        // Formatando a data em uma string legível
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');

        return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
    }

    return (
        <div style={{ borderRadius: '10px', border: 'outset', padding: '15px', background: 'mintcream' }}>
            <h5>Data:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {convertMilissegundosToDate(dt)}
                </strong>
            </h5>
            <h2>Temperatura:&nbsp;&nbsp;
                <strong style={{ fontSize: "xxx-large", color: "crimson" }}>
                    {Math.ceil(main.temp - 273.15)}°
                </strong>&nbsp;em {name} e o tempo está &nbsp;
                <strong style={{ fontSize: "x-large", color: "gray" }}>
                    {capitalizarPrimeiraLetra(weather[0].description)}
                </strong>
            </h2>
            <h5>Coordenadas Requisitadas:&nbsp;&nbsp;
                Latitude:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "gray" }}>{coord.lat}</strong>&nbsp;
                Longitude:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "gray" }}>{coord.lon}</strong>
            </h5>
            <h5>Sensação Térmica:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {Math.ceil(main.feels_like - 273.15)}°
                </strong>&nbsp;&nbsp;
                Humidade do Ar:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {Math.ceil(main.humidity)}%
                </strong>
            </h5>
            <h5>Pressão atmosférica ao nível do mar:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {Math.round(main.pressure)}&nbsp;hPa
                </strong>
            </h5>
            <h5>Velocidade dos Ventos:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {Number((wind.speed * 3.6).toFixed(2))}&nbsp;km/h
                </strong>&nbsp;
                Podendo ter Rajadas de: &nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {Number((wind.gust * 3.6).toFixed(2)) || Number((wind.speed * 3.6).toFixed(2))}&nbsp;km/h
                </strong>&nbsp;
            </h5>
            <h5>Porcentagem de Nuvens:&nbsp;&nbsp;
                <strong style={{ fontSize: "x-large", color: "blue" }}>
                    {clouds.all}&nbsp;%
                </strong>
            </h5>
        </div>
    )
}

export default WeatherNow;
