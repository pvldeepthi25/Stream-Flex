import { useState } from 'react';
import './App2.css';
import back_img from './backImg.jpg';
function App({ ToPage1 }) {
  const back = "<=";
  const [cinema, setCinema] = useState([
    { "title": "Baahubali: The Beginning", "industry": "Telugu", "release_year": 2015, "theme": "Epic Action / Fantasy", "rating": 8.0, "hero": "Prabhas", "heroine": "Tamannaah Bhatia" },
    { "title": "Jersey", "industry": "Telugu", "release_year": 2019, "theme": "Sports Drama", "rating": 8.5, "hero": "Nani", "heroine": "Shraddha Srinath" },
    { "title": "Vikram", "industry": "Tamil", "release_year": 2022, "theme": "Action Thriller", "rating": 8.3, "hero": "Kamal Haasan", "heroine": "Gayathrie Shankar" },
    { "title": "96", "industry": "Tamil", "release_year": 2018, "theme": "Romantic Drama", "rating": 8.5, "hero": "Vijay Sethupathi", "heroine": "Trisha Krishnan" },
    { "title": "Inception", "industry": "Hollywood", "release_year": 2010, "theme": "Sci-Fi Thriller", "rating": 8.8, "hero": "Leonardo DiCaprio", "heroine": "Marion Cotillard" },
    { "title": "Interstellar", "industry": "Hollywood", "release_year": 2014, "theme": "Sci-Fi / Space Drama", "rating": 8.7, "hero": "Matthew McConaughey", "heroine": "Anne Hathaway" },
    { "title": "Dangal", "industry": "Bollywood", "release_year": 2016, "theme": "Sports Biographical Drama", "rating": 8.4, "hero": "Aamir Khan", "heroine": "Fatima Sana Shaikh" },
    { "title": "3 Idiots", "industry": "Bollywood", "release_year": 2009, "theme": "Comedy Drama / Education", "rating": 8.4, "hero": "Aamir Khan", "heroine": "Kareena Kapoor" },
    { "title": "Drishyam", "industry": "Malayalam", "release_year": 2013, "theme": "Crime Thriller", "rating": 8.3, "hero": "Mohanlal", "heroine": "Meena" },
    { "title": "Premam", "industry": "Malayalam", "release_year": 2015, "theme": "Romantic Drama", "rating": 8.3, "hero": "Nivin Pauly", "heroine": "Sai Pallavi" },
    { "title": "Titanic","industry": "Hollywood", "release_year": 1997, "rating": 7.9, "hero": "Leonardo DiCaprio", "heroine": "Kate Winslet" },
    { "title": "Avatar","industry": "Hollywood", "release_year": 2009, "rating": 7.8, "hero": "Sam Worthington", "heroine": "Zoe Saldana" },
    { "title": "The Dark Knight","industry": "Hollywood", "release_year": 2008, "rating": 9.0, "hero": "Christian Bale", "heroine": "Maggie Gyllenhaal" },
    { "title": "Spider-Man","industry": "Hollywood", "release_year": 2002, "rating": 7.4, "hero": "Tobey Maguire", "heroine": "Kirsten Dunst" }
  ]);

  const [release_year, setRelease_year] = useState(''); // Holds the typed text
  const [selectedYear, setSelectedYear] = useState(null); // Holds the year to filter by after click
  const [industry,setIndustry]=useState("");
  const [ques,setQues]=useState("");
  const handleyear = (event) => {
    setRelease_year(event.target.value);
    //console.log(release_year);
  };
 
  // Triggered when Submit button is clicked
  async function showMoviesForYear() {
    setSelectedYear(release_year);
    console.log(release_year)
    console.log(selectedYear);
    setQues(JSON.stringify(release_year).toLowerCase());
  if(ques.length<3){
     return null;
  }
     var parts =  callGeminiAPI(ques);
	
console.log(parts);
	 debugger
  return cinema.filter(c =>
    c.title.toLowerCase().includes(ques) ||
    c.hero.toLowerCase().includes(ques)||
    c.heroine.toLowerCase().includes(ques)
  );
  }
  const API_KEY = "AIzaSyDTzTnbXGJAbRfd9oXxvsX9wF8KJDf0ABk";
async function callGeminiAPI(prompt) {
  console.log(prompt);
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
   try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'need json reponse'+ prompt }],
          },
        ],
		generationConfig: {
        response_mime_type: "application/json"
		}
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const parts = data.candidates[0].content.parts;
     console.log(parts);
      return parts;
  } catch (error) {
    console.error("Error:", error);
  }
}
const [resultsList,setResultsList]=useState("");
function output(){
  setIndustry("");
  const result=showMoviesForYear();
  setRelease_year("")
  console.log(result);
  setResultsList(result
    .map(movie => `<li>${movie.title} (${movie.release_year})</li>`)
    .join("")
)
}
  return (
    <div  className='container' >
      <div className='first_line'>
      <button className='backSymbol' onClick={ToPage1}><strong>{back}</strong></button>
    <div className='head'><strong>Stream-Flex</strong></div>
      <div className="search-section">
        <input 
          type="text" 
          value={release_year} 
          onChange={handleyear} 
          placeholder="e.g. 2015"
        />
        <button onClick={output}>Submit</button></div>
      </div>

      <div className='lang'>
        <button className='btnlang' onClick={ () => {setIndustry("Telugu");setSelectedYear(""); }}>TELUGU</button>
        <button className='btnlang' onClick={ () => {setIndustry("Tamil");setSelectedYear(""); }}>TAMIL</button>
        <button className='btnlang' onClick={ () => {setIndustry("Malayalam");setSelectedYear(""); }}>MALAYALAM</button>
        <button className='btnlang' onClick={ () => {setIndustry("Bollywood");setSelectedYear(""); }}>BOLLYWOOD</button>
        <button className='btnlang' onClick={ () => {setIndustry("Hollywood"); setSelectedYear("");}}>HOLLYWOOD</button>
      </div>

      <div className="results">
        <h3>Results for : {selectedYear} {industry}</h3>
        <h4>{resultsList}</h4>
        <ul  className='req_list'>
          {cinema.map((req, index) => (
            // Use == for flexible string/number comparison
            req.release_year == selectedYear ? (
              <li key={index} style={{ marginBottom: '10px', textAlign: 'left' }}>
                <strong>Title:</strong> {req.title} <br />
                <strong>Industry:</strong> {req.industry} <br />
                <strong>Hero:</strong> {req.hero} <br />
                <strong>Heroine:</strong> {req.heroine} <br />
                <strong>Year:</strong> {req.release_year} <br />
                <strong>Rating:</strong> {req.rating}
              </li>
            ) : null
          ))}
           {cinema.map((req, index) => (
            // Use == for flexible string/number comparison
            req.industry == industry ? (
              <li key={index} style={{ marginBottom: '10px', textAlign: 'left' }}>
                <strong>Title:</strong> {req.title} <br />
                <strong>Industry:</strong> {req.industry} <br />
                <strong>Hero:</strong> {req.hero} <br />
                <strong>Heroine:</strong> {req.heroine} <br />
                <strong>Year:</strong> {req.release_year} <br />
                <strong>Rating:</strong> {req.rating}
              </li>
            ) : null
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
