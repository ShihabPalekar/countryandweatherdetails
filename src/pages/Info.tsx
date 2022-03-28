import {
  Button,
  Table,
  TableBody,
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
        `http://api.weatherstack.com/current?access_key=f97561106c9153d29b4081f510940097&query=${capital}`
      );
      const data = await response.json();
      setWeatherData(data);
    }
  };

  const backToForm = () => {
    props.navigate(-1);
  };

  if (isLoading) {
    return <p className="loader">loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>
          Please go back and enter a valid country name. Make sure the spelling
          is correct, you are adding the necessary spaces, etc.
        </p>
        <Button style={styles.backBtn} variant="text" onClick={backToForm}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="info-container">
      {data.length > 0 && (
        <div>
          <Button style={styles.backBtn} variant="text" onClick={backToForm}>
            Back
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableBody>
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
                      src={data[0].flags.svg}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
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
                <TableBody>
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
                          weatherData.current !== undefined
                            ? weatherData.current.weather_icons
                            : ""
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
