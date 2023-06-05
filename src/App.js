import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import HeaderTab from "./components/HeaderTab";
import Horoscope from "./components/Horoscope/Horoscope";
import NewsContent from "./components/NewsContent/NewsContent";

function App() {
  const [category, setCategory] = useState("");
  const [newsArr, setNewsArr] = useState([]);
  const [newsResults, setNewsResults] = useState();
  // const [loadMore, setLoadMore] = useState(8);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const firstItemRef = useRef(null);

  const newsAPI = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news",
      params: {
        count: 30,
        category: category,
        cc: "in",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        "X-RapidAPI-Key": "aa576887d3msh967a68908fd8353p14e532jsn2005301e7308",
      },
    };

    try {
      const news = await axios.request(options);
      console.log(news.data.value);
      setNewsArr(news.data.value);
      setFilteredData(news.data.value);
      setNewsResults(news.data.value.length);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // console.log("APP ", newsArr);

  useEffect(() => {
    newsAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, newsResults]);

  const searchTriggered = (value) => {
    const newData = newsArr.filter((each) => {
      return each.name.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(newData);
  };

  return (
    <div>
      <div className="header-comp">
        <h1 className="header-title">
          <a href="/" className="blogNews">
            News Molecule{" "}
          </a>{" "}
          : One place for all your daily news
        </h1>
        <div className="divider-line"></div>

        <HeaderTab setCategory={setCategory} firstItemRef={firstItemRef} />

        {/* <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "22ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Search News here"
            variant="standard"
            color="info"
            focused
            value={search}
            onChange={(e) => e.target.value}
          />
        </Box> */}

        <form action="" className="search-bar">
          <input
            type="search"
            placeholder="Search Here..."
            name="search"
            onChange={(e) => searchTriggered(e.target.value)}
          />
        </form>
      </div>
      <div className="divider-line"></div>

      <div className="mainContent">
        {loading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {loading === false && newsResults && (
          <NewsContent
            newsArray={filteredData}
            newsResults={newsResults}
            // loadMore={loadMore}
            // setLoadMore={setLoadMore}
          />
        )}
      </div>

      <div className="divider-line"></div>

      <div ref={firstItemRef}>
        <Horoscope />
        <Footer />
      </div>
    </div>
  );
}

export default App;

// {
//   "_type": "NewsArticle",
//   "name": "France Polls: Macron First Prez In Two Decades To Win Reelection But Le Pen Narrows Gap",
//   "url": "https://www.msn.com/en-in/news/world/france-polls-macron-first-prez-in-two-decades-to-win-reelection-but-le-pen-narrows-gap/ar-AAWyqq3",
//   "image": {
//       "_type": "ImageObject",
//       "thumbnail": {
//           "_type": "ImageObject",
//           "contentUrl": "https://www.bing.com/th?id=OVFT.Mxxh_sdrJtcxB9b2MNF81S&pid=News",
//           "width": 1200,
//           "height": 630
//       },
//       "isLicensed": true
//   },
//   "description": "France re-elected Emmanuel Macron on Sunday as he won 58.8% of the vote in the second round of the presidential election, according to pollster Ipsos. This is the first time a French president has",
//   "provider": [
//       {
//           "_type": "Organization",
//           "name": "News18",
//           "image": {
//               "_type": "ImageObject",
//               "thumbnail": {
//                   "_type": "ImageObject",
//                   "contentUrl": "https://www.bing.com/th?id=ODF.raV3hWx5LJpFUHNtCFAcrw&pid=news"
//               }
//           }
//       }
//   ],
//   "datePublished": "2022-04-25T02:12:57.0000000Z"
// }
