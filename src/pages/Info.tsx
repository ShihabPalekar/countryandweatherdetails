import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const styles = {
  backBtn: {
    // marginBottom: "40px",
  },
  weatherBtn: {
    // marginLeft: "45vw",
    // marginTop: "50px",
    // marginBottom: "50px",
  },
};

type Props = {
  navigate: any;
  searchParams: any;
};

const Info: React.FC<Props> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [weatherData, setWeatherData]: any = useState({});
  const [capital, setCapital] = useState("");
  const [error, setError] = useState(false);

  const fetchData = async (name: string) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = await response.json();
      setData(data);
      setCapital(data[0].capital);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData(props.searchParams.get("countryName") || "");
  }, []);

  const fetchWeatherData = async () => {
    if (weatherData.current === undefined) {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=c345dee6f01fb43ba106c194b88bf894&query=${capital}`
      );
      const data = await response.json();
      setWeatherData(data);
    }
  };

  const backToForm = () => {
    props.navigate(-1);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return (
      <div style={{width:"400px"}}>
        <p style={{color:"red"}}>
          ERROR! Please go back and enter a valid country name. Make sure the spelling
          is correct, you are adding the necessary spaces, etc.
        </p>
        <Button variant="contained" onClick={backToForm}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="info-container">
      {data.length > 0 && (
        <div>
          <Button
            style={{ margin: "10px" }}
            variant="text"
            onClick={backToForm}
          >
            Go Back
          </Button>
          <div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableBody>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Capital</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">{data[0].capital}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Population</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">{data[0].population}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Lat/Lng</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">
                      {data[0].latlng[0]} / {data[0].latlng[1]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Flag</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">
                      <img
                        style={{ width: "60px", height: "30px" }}
                        alt={"flag-icon"}
                        src={data[0].flags.svg}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button
            variant="contained"
            style={{ margin: "30px 225px" }}
            onClick={fetchWeatherData}
          >
            Get Capital weather
          </Button>
          <div
            style={{
              display: weatherData.current !== undefined ? "block" : "none",
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableBody>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Temperature</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">
                      {weatherData.current !== undefined &&
                        weatherData.current.temperature}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Weather Icon</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">
                      <img
                        style={{ width: "30px", height: "30px" }}
                        alt={"weather-icon"}
                        src={
                          weatherData.current !== undefined
                            ? weatherData.current.weather_icons
                            : ""
                        }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Wind Speed</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">
                      {weatherData.current !== undefined &&
                        weatherData.current.wind_speed}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{width:"255px"}} align="right">Precip</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell align="left">
                      {weatherData.current !== undefined &&
                        weatherData.current.precip}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
