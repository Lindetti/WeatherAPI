import "./Start.css";
import {useState, useEffect} from "react";

const Start = () => {
const [getCity, setCity] = useState({
 desc: "",
 temperature: "",
 wind: "",
 error: "",
});

const [cityName, getCityName] = useState("Sundsvall");
const [search, setSearch] = useState("");
const [date, setDate] = useState(new Date());

useEffect(() => {
    fetch(`https://goweather.herokuapp.com/weather/${cityName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setCity({
            desc: "",
            temperature: "",
            wind: "",
            error: "City not found. Please try again.",
          });
        } else {
          setCity({
            desc: data.description,
            temperature: data.temperature,
            wind: data.wind,
            error: null,
          });
        }
      })
      .catch((error) => {
        setCity({ error: error.message });
      });
    document.title = "Weather App";
  }, [cityName]);


    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        if (now.getDate() !== date.getDate()) {
          setDate(now);
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [date]);
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);

    const handleSearch = (event) => {
    setSearch(event.target.value);
    }

    const searchClick = (event) => {
        event.preventDefault();
        getCityName(search);
        setSearch("");
    }

    const getIcon = (description) => {
        switch (description.toLowerCase()) {
          case 'clear':
            return '/clear.svg';
          case 'sunny':
            return '/sunny.svg';
          case 'partly cloudy':
            return '/partlycloudy.svg';
          case 'cloudy':
            return '/cloudy.svg';
          case 'rain':
            return '/rain.svg';
          case 'rain shower':
            return "/rainshower.svg";
          case 'thunderstorm':
            return '/thunder.svg';
          case 'heavy snow':
            return '/heavysnow.svg';
          case 'drizzle':
            return "/drizzle.svg";
          case 'light drizzle':
          case 'light rain':
            return "/light.svg";
          default:
            return '/light.svg';
        }
      };

    return (
        <div className="base-wrapper">
          <div className="main">
            <div className="searchDiv">
                <form onSubmit={searchClick}> 
            <input 
            type="text" 
            placeholder="search city" 
            className="input-field"
            value={search}
            onChange={handleSearch}
            />
            <button type="submit">Search</button>
            </form>
            </div>
            <div className="weatherDiv">
  {getCity.error ? (
    <div className="errorDiv">{getCity.error}</div>
  ) : (
    <div>
      <div className="cityNameDiv">
        <h2>{cityName}</h2> 
        <p>{formattedDate}</p>
      </div>
      <div className="tempDescDiv">
        <h1>{getCity.temperature.slice(0, -1)}</h1>
        <img src={getIcon(getCity.desc)} alt="weather icon" />
      </div>
      <div className="moreInfo">
        <p>{getCity.desc}</p>
        <p>Wind: {getCity.wind}</p>
      </div>
    </div>
  )}
</div>
          </div>
        </div>
    )
}

export default Start;