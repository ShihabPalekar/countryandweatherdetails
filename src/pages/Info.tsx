import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/info.css";

const styles = {
  backBtn: {
    marginBottom: "40px",
  },
  weatherBtn: {
    marginLeft: "45vw",
    marginTop: "50px",
    marginBottom: "50px",
  },
};

type Props = {
  navigate: any;
  searchParams: any;
};

const Info: React.FC<Props> = ({ ...props }) => {
  const [data, setData] = useState<any[]>([]);
  const [weatherData, setWeatherData]: any = useState({});
  const [capital, setCapital] = useState("");

  const fetchData = async (name: string) => {
    const response = await fetch(`https://restcountries.com/v2/name//${name}`);
    const data = await response.json();
    setData(data);
    setCapital(data[0].capital);
  };

  useEffect(() => {
    fetchData(props.searchParams.get("countryName") || "");
  }, []);

  const fetchWeatherData = async () => {
    if (weatherData.current === undefined) {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=f97561106c9153d29b4081f510940097&query=${capital}`
      );
      const data = await response.json();
      setWeatherData(data);
    }
  };

  const backToForm = () => {
    props.navigate("/");
  };

  return (
    <div className="info-container">
      {data.length > 0 && (
        <div>
          <Button style={styles.backBtn} variant="text" onClick={backToForm}>
            Back
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableRow>
                <TableCell component="th" scope="row">
                  Capital
                </TableCell>
                <TableCell align="right">{data[0].capital}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Population
                </TableCell>
                <TableCell align="right">{data[0].population}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Lat/Lng
                </TableCell>
                <TableCell align="right">
                  {data[0].latlng[0]} / {data[0].latlng[1]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Flag
                </TableCell>
                <TableCell align="right">
                  <img
                    style={{ width: "60px", height: "30px" }}
                    alt={"flag-icon"}
                    src={data[0].flag}
                  />
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            style={styles.weatherBtn}
            onClick={fetchWeatherData}
          >
            Capital weather
          </Button>
          <div
            style={{
              display: weatherData.current !== undefined ? "block" : "none",
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Temperature
                  </TableCell>
                  <TableCell align="right">
                    {weatherData.current !== undefined &&
                      weatherData.current.temperature}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Weather Icon
                  </TableCell>
                  <TableCell align="right">
                    <img
                      style={{ width: "30px", height: "30px" }}
                      alt={"weather-icon"}
                      src={
                        weatherData.current !== undefined &&
                        weatherData.current.weather_icons
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Wind Speed
                  </TableCell>
                  <TableCell align="right">
                    {weatherData.current !== undefined &&
                      weatherData.current.wind_speed}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Precip
                  </TableCell>
                  <TableCell align="right">
                    {weatherData.current !== undefined &&
                      weatherData.current.precip}
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;