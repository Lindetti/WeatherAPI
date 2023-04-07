import "./Start.css";
import {useState, useEffect} from "react";

const Start = () => {
const [getCity, setCity] = useState({
 desc: "",
 temperature: "",
 wind: "",
 error: "",
 forecast: "",
});

const [cityName, getCityName] = useState("Sundsvall");
const [search, setSearch] = useState("");
const [date, setDate] = useState(new Date());
const [time, setTime] = useState(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
const [isAfterMidnight, setIsAfterMidnight] = useState(false);

useEffect(() => {
    fetch(`https://goweather.herokuapp.com/weather/${cityName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.message) {
          setCity({
            desc: "",
            temperature: "",
            wind: "",
            forecast: "",
            error: "City not found. Please try again.",
          });
        } else {
          setCity({
            desc: data.description,
            temperature: data.temperature,
            wind: data.wind,
            forecast: data.forecast,
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
    const now = new Date();
    setDate(now);
    setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

    if (now.getHours() >= 0 && now.getHours() < 6) {
      setIsAfterMidnight(true);
    } else {
      setIsAfterMidnight(false);
    }

    const timer = setInterval(() => {
      const now = new Date();
      setDate(now);
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

      if (now.getHours() >= 0 && now.getHours() < 6) {
        setIsAfterMidnight(true);
      } else {
        setIsAfterMidnight(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
    
  
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
          case 'Thunderstorm in vicinity':
            return '/thunder.svg';
          case 'heavy snow':
            return '/heavysnow.svg';
            case "light snow":
            return "/lightsnow.svg";
          case 'drizzle':
            return "/drizzle.svg";
          case 'light drizzle':
          case 'light rain':
            return "/light.svg";
          default:
            return '/thunder.svg';
        }
      };



    return (
        <div className={`base-wrapper ${isAfterMidnight ? 'night' : 'day'}`}>
          <div className="main">
            <div className="searchDiv">
                <form onSubmit={searchClick}> 
            <input 
            type="text" 
            placeholder="Search city.." 
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
    <>
      <div className="cityNameDiv">
        <h2>{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h2> 
        <p>{formattedDate}</p>
        <p>{time}</p>
      </div>
      <div className="tempDescDiv">
        <h1>{getCity.temperature.slice(0, -1)}</h1>
        <img src={getIcon(getCity.desc)} alt="weather icon" />
      </div>
      <div className="moreInfo">
        <p>{getCity.desc}</p>
        <p>Wind: {getCity.wind}</p>
      </div>
      {getCity.forecast && Array.isArray(getCity.forecast) && (
  <div className="upcomingWeather">
    {getCity.forecast.map((item, key) => (
      <div className="upcomingDays" key={key}>
       <p>Day: {item.day}</p>
       <p>{item.temperature}</p>
       <p>{item.wind}</p>
        </div>
    ))}
  </div>
)}
    </>
  )}
</div>
          </div>
        </div>
    )
}

export default Start;