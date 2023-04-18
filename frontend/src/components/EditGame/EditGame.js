import { React, useState, useEffect, createContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EditGameHeader from './EditGameHeader';
import Question from '../Question/Question';
import AddQuestionButton from './AddQuestionButton';
import Form from 'react-bootstrap/Form';
import data from '../../config.json';
import SaveGameChanges from './SaveGameChanges';
import { fileToDataUrl } from '../helper';
import Feedback from '../General/Feedback';
import { useMediaQuery } from 'react-responsive'

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;
export const QuestionsContext = createContext([]);

export default function EditGame () {
  const location = useLocation();
  const token = location.state.token;
  const params = useParams();

  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);

  const [time, setTime] = useState(0);
  const [points, setPoints] = useState(0);

  const [name, setName] = useState('');
  const [valid, setValid] = useState(true);
  const [img, setImg] = useState(null);

  const fetchQuizData = async () => {
    console.log('data for ', params.id)
    const response = await fetch(url + '/admin/quiz/' + params.id, {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      setData(data);
      setQuestions(data.questions);
      setName(data.name);
    }
  }

  const calculateTotals = () => {
    const timeSum = questions.reduce((accumulator, curr) => {
      return accumulator + curr.time;
    }, 0);
    if (!timeSum) {
      setTime(0);
    } else {
      setTime(timeSum);
    }

    const pointsSum = questions.reduce((accumulator, curr) => {
      return accumulator + curr.points;
    }, 0);
    if (!pointsSum) {
      setPoints(0);
    } else {
      setPoints(pointsSum);
    }
  }

  const nameChange = (event) => {
    setName(event.target.value);
    if (event.target.value === '') {
      setValid(false);
    } else {
      setValid(true);
    }
  }

  const imgChange = async (event) => {
    const files = Array.from(event.target.files);
    const data = await fileToDataUrl(files[0]);
    setImg(data);
  }

  useEffect(async () => {
    await fetchQuizData();
  }, []);

  useEffect(async () => {
    calculateTotals();
    if (questions.thumbnail !== null) {
      setImg(questions.thumbnail);
    }
    console.log(questions);
  }, [questions]);

  let margin;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen || isMediumScreen) {
    margin = '0px 10px';
  } else {
    margin = '0px 20px';
  }

  return (
    <QuestionsContext.Provider value={{ questions, data, id: params.id, token, update: fetchQuizData }}>
    <EditGameHeader token={token}/>
    <h2 className='p-3'> Game Details </h2>
    <div className='d-flex justify-content-between align-items-start p-2 flex-wrap' style={{ margin }}>
      <div>
        <Form.Label>Game Name:</Form.Label>
        <Form.Control type='text' style={{ maxWidth: '500px', minWidth: '300px' }}
          defaultValue={name} onKeyUp={nameChange}
        />
        {!valid && <Feedback>
          The question must have a name
        </Feedback>}
      </div>
      <div>
        <Form.Label>Upload thumbnail</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={imgChange}/>
        {data.thumbnail !== null
          ? <Form.Text muted>
            If you choose to not upload a photo, the previous photo will be kept.
          </Form.Text>
          : <></>
        }
      </div>
      {data.thumbnail !== null
        ? <div> <div style={{ textAlign: 'center' }}> Existing Thumbnail </div> <img src={data.thumbnail} alt={'thumbnail for ' + name + ' with id: ' + params.id} style={{ width: '140px', height: 'auto', margin: '10px' }}></img> </div>
        : <></>
      }
    </div>
    <div className='p-2'>
      <SaveGameChanges id={params.id} name={name} thumbnail={img} questions={questions} token={token} update={fetchQuizData} {...(valid === false) ? { disabled: 'success' } : { }}/>
    </div>
    <hr/>
    <div className='d-flex justify-content-between align-items-center p-2 flex-wrap'>
      <h2 style={{ padding: '5px' }}>Questions - <i>{Math.floor(time / 60)} min {time % 60} sec</i> - <i>{points} points</i></h2>
      <AddQuestionButton update={fetchQuizData}/>
    </div>
    <div>
      <br/>
      {questions.map((question, index) => (
        question.title
          ? <Question key={index} token={token} title={question.title} points={question.points} time={question.time} options={question.options} multi={question.multi} id={index} image={question.image} link={question.link}/>
          : <span key={index}></span>
      ))}
      {questions.length === 0
        ? <h5 data-cy='NoQuestionsText' style={{ textAlign: 'center' }}> You currently have no questions in this quiz. To create a new question, click the Add New Question button</h5>
        : <></>
      }
    </div>
    </QuestionsContext.Provider>
  );
}
