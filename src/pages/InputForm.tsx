import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "../styles/inputForm.css";

type Props = {
  navigate: any;
};

const InputForm: React.FC<Props> = ({ ...props }) => {
  const [countryName, setCountryName] = useState("");

  const handleInputChange = (e: { target: { value: string } }) => {
    setCountryName(e.target.value);
  };

  const buttonClicked = () => {
    setCountryName("")
    props.navigate("/info?countryName=" + countryName);
  };

  return (
    <div className="input-form">
      <TextField
        id="standard-basic"
        label="Country name"
        variant="standard"
        onChange={handleInputChange}
        value={countryName}
        role='input-field-country'
      />
      <Button
        disabled={countryName.trim() === ""}
        variant="contained"
        onClick={buttonClicked}
        role="search-button"
      >
        Search
      </Button>
    </div>
  );
};

export default InputForm;