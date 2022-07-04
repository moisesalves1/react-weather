import {useState} from 'react';

function App() {

  const [city, setCity] = useState();
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=30fda8b11823435b8cb00633222006&q=${city}&lang=pt`)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data)
      setWeatherForecast(data);
    })
  }

  return (
    <div>

      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white ms-2" href="#top">
         Previsão do Tempo
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo em sua cidade</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
          </p>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
           <input onChange={handleChange} 
           className="form-control" 
           placeholder='Digite sua cidade'
           value={city}></input>  
          </div>
        </div>

        <button onClick={handleSearch} className="btn btn-primary btn-lg" >
          Pesquisar
        </button>

        {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForecast.current.condition.icon} alt={weatherForecast.current.condition.text} />
                </div>
                <div>
                  <h3>Hoje o dia está: {weatherForecast.current.condition.text} </h3>
                  <p className='lead'>
                    Temperatura: {weatherForecast.current.temp_c} ºC
                  </p>
                  <p className='lead'>
                    Umidade: {weatherForecast.current.humidity} %
                  </p>
                  <p className='lead'>
                    Sensação térmica: {weatherForecast.current.feelslike_c} ºC
                  </p>
                </div>
              </div>
            </div>
         ) : null }


      </main>

    </div>
  );
}

export default App;
