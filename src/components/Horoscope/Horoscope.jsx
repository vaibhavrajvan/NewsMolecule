import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";

import "./Horoscope.css";

const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const Horoscope = () => {
  const [sign, setSign] = useState("Taurus");
  const [horoscopeData, setHoroscopeData] = useState({});
  const [loading, setLoading] = useState(false);

  const HoroscopeApi = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
      params: { sign: sign, day: "today" },
      headers: {
        "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "aa576887d3msh967a68908fd8353p14e532jsn2005301e7308",
      },
    };

    try {
      const horoscope = await axios.request(options);
      // console.log(horoscope.data);
      setHoroscopeData(horoscope.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    HoroscopeApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign]);

  // console.log("Sign ", sign);

  return (
    <>
      <div className="horoscope-container">
        <div>
          <h1>What does your sign say about you ?</h1>
          <div className="select-sign">
            <h3>Select your Sign</h3>
            <FormControl
              variant="outlined"
              sx={{ m: 4, minWidth: 120, maxWidth: 200 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Sign
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={sign}
                onChange={(e) => setSign(e.target.value)}
                label="Sign"
              >
                {signs.map((sign) => (
                  <MenuItem value={sign}> {sign}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {loading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {loading === false && horoscopeData && (
          <div className="horoscope-card">
            <div className="horoscope-card-content">
              <span className="horoscope-sign">{sign.toLocaleUpperCase()}</span>
              <p className="card-text">{horoscopeData.description}</p>
              <h3>
                Color : <span>{horoscopeData.color}</span>
              </h3>
              <h3>
                Compatibility : <span>{horoscopeData.compatibility}</span>
              </h3>
              <h3>
                Mood : <span>{horoscopeData.mood}</span>
              </h3>
              <h3>
                Lucky Number : <span>{horoscopeData.lucky_number}</span>
              </h3>
            </div>
            <div className="card-link"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Horoscope;

// {
//   "date_range": "Apr 21 - May 20",
//   "current_date": "April 25, 2022",
//   "description": "Your personal power (which has never been anything to sneeze at) is currently amped up to a thirteen, on a scale of one to ten. Better warn friends, family and lovers alike that you're not to be toyed with now.",
//   "compatibility": "Leo",
//   "mood": "Aggressive",
//   "color": "Teal",
//   "lucky_number": "73",
//   "lucky_time": "2am"
// }
