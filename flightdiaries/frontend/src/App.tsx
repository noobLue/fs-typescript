import axios, { type AxiosResponse } from 'axios';
import { useState, useEffect } from 'react'
import { Visibility, Weather, type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from "./types.ts";


const baseUrl: string = "http://localhost:3000/api/diaries";

interface ValidationError {
  error: {
    code: string;
    message: string;
  }[];
}

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  const [newDiaryWeather, setNewDiaryWeather] = useState<Weather>(Weather.Sunny);
  const [newDiaryVisibility, setNewDiaryVisibility] = useState<Visibility>(Visibility.Good);
  const [newDiaryDate, setNewDiaryDate] = useState("");
  const [newDiaryComment, setNewDiaryComment] = useState("");
  
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(res => {
      setDiaries(res.data as NonSensitiveDiaryEntry[]);
    });
  }, [])

  const submitDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      weather: newDiaryWeather,
      visibility: newDiaryVisibility,
      date: newDiaryDate,
      comment: newDiaryComment
    };

    try {
      const response = await axios.post<DiaryEntry, AxiosResponse<DiaryEntry>, NewDiaryEntry>(baseUrl, newDiaryEntry);

      setDiaries([...diaries, response.data]);

      setNewDiaryComment("");
      setNewDiaryDate("");
      setNewDiaryWeather(Weather.Sunny);
      setNewDiaryVisibility(Visibility.Good);
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        const errors = error.response?.data?.error;

        if (Array.isArray(errors)) {
          setErrorMessages(errors.map(err => err.message));
        } else {
          setErrorMessages([error.message]);
        }
      }
      else 
      {
        setErrorMessages(["Unknown error"]);
      }

      setTimeout(() => {setErrorMessages([])}, 5000);
    }
  }

  return (
    <div>
      {diaries.map(d => (<div key={d.id}>{d.date} {d.visibility} {d.weather}</div>))}

      <p style={{color: "red"}}>{errorMessages.map((msg)=><p key={msg}>Error: {msg}</p>)}</p>
      <form onSubmit={submitDiary}>
        <div>
          Weather {Object.values(Weather).map(w => {
          return (<label key={w}>
            {w} <input type="radio" value={w} checked={w === newDiaryWeather} onChange={() => {setNewDiaryWeather(w)}}/>
          </label>);
        })}
        </div>
        <div>
          Visibility {Object.values(Visibility).map(v => {
            return (<label key={v}>
              {v} <input type="radio" value={v} checked={v === newDiaryVisibility} onChange={() => {setNewDiaryVisibility(v)}}/>
            </label>);
          })}
        </div>
        <div>
          Date <input type="date" value={newDiaryDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewDiaryDate(e.target.value)}}/>
        </div>
        <div>
          Comment <input type="text" value={newDiaryComment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewDiaryComment(e.target.value)}}/>
        </div>
        <button>Send</button>
      </form>
    </div>
  )
}

export default App
