import React, { useState } from 'react';
import { react_constants } from './components/constants'
import WeatherNow from './components/weatherNow.tsx'
import WeatherForecast from './components/weatherForecast.tsx'

export default function Home () {
    const [activeTab, setActiveTab] = useState(0)
    const [searchCity, setSearchCity] = useState('')
    const [searchLatitude, setSearchLatitude] = useState(0)
    const [searchLongitude, setSearchLongitude] = useState(0)
    const [cityWeather, setCityWeather] = useState({})
    const [latLonWeather, setLatLonWeather] = useState({})
    const [cityWeatherForecast, setCityWeatherForecast] = useState({})
    const [latLonWeatherForecast, setLatLonWeatherForecast] = useState({})
    const [buscaNow, setBuscaNow] = useState(false)
    const [buscaForecast, setBuscaForecast] = useState(false)

    const handleTabClick = (index) => {
        setBuscaNow(false)
        setBuscaForecast(false)
        setCityWeatherForecast({});
        setLatLonWeatherForecast({})
        setActiveTab(index);
    };

    const handleSearchChangeCity = (event) => {
        setSearchCity(event.target.value)
    }

    const handleSearchChangeLatitude = (event) => {
        setSearchLatitude(event.target.value)
    }

    const handleSearchChangeLongitude = (event) => {
        setSearchLongitude(event.target.value)
    }

    const handleSubmitCity = () => {
        let url = activeTab === 0 
            ? `${react_constants["local_api"]}/getCityNow`
            : `${react_constants["local_api"]}/getCityForecast`;
        let action = {
            city: searchCity
        };
        
        fetch(url,{
            method:"post",
            body:JSON.stringify(action),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            if (activeTab === 0) {
                setBuscaNow(true);
                setCityWeather(retorno_convertido)
            } else {
                setBuscaForecast(true);
                setCityWeatherForecast(retorno_convertido)
            }
        })
    }

    const handleSubmitLatLon = () => {
        let url = activeTab === 0
            ? `${react_constants["local_api"]}/getPositionNow`
            : `${react_constants["local_api"]}/getPositionForecast`;
        let action = {
            lat: searchLatitude,
            lon: searchLongitude
        };

        fetch(url,{
            method:"post",
            body:JSON.stringify(action),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            if (activeTab === 0) {
                setBuscaNow(true);
                setLatLonWeather(retorno_convertido)
            } else {
                setBuscaForecast(true);
                setLatLonWeatherForecast(retorno_convertido)
            }
        })
    }

    return (
        <div>
            <div className="tab-buttons">
            <button
                className={activeTab === 0 ? 'active' : ''}
                onClick={() => handleTabClick(0)}
            >
                Previsão Atual
            </button>
            <button
                className={activeTab === 1 ? 'active' : ''}
                onClick={() => handleTabClick(1)}
            >
                Previsão Semanal
            </button>
            </div>
            <div className="tab-content" style={{ float: "left" }}>
                <span>Pesquisa por Cidade</span>
                <br />
                <input
                    type="text"
                    placeholder="Digite a cidade"
                    onChange={(e) => handleSearchChangeCity(e)}
                />
                <button onClick={handleSubmitCity} className='searchButton active'>Pesquisar</button>
                <br />
                <span>Pesquisa por Latitude e Longitude</span>
                <br />
                <input
                    type="text"
                    placeholder="Digite a Latitude"
                    onChange={(e) => handleSearchChangeLatitude(e)}
                />
                <input
                    type="text"
                    placeholder="Digite a Longitude"
                    onChange={(e) => handleSearchChangeLongitude(e)}
                />
                <button onClick={handleSubmitLatLon} className='searchButton active'>Pesquisar</button>
                {activeTab === 0 && buscaNow
                    && <WeatherNow cityWeather={Object.keys(cityWeather).length === 0 ? latLonWeather : cityWeather} />
                }
                {activeTab === 1 && buscaForecast
                    && <WeatherForecast cityWeather={Object.keys(cityWeatherForecast).length === 0 ? latLonWeatherForecast : cityWeatherForecast} />
                }
            </div>
        </div>
    );
}
