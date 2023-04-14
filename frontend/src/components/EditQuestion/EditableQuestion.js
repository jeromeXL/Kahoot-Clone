import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import data from '../../config.json';
import { fileToDataUrl } from '../helper';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function EditableQuestion (props) {
  const navigate = useNavigate();
  const token = props.token;
  const [options, setOptions] = useState([]);
  const changeOption = (event, index) => {
    const tmpOptions = options;
    tmpOptions[index] = `${event.target.value}`;
    setOptions(tmpOptions);
  }

  const [correct, setCorrect] = useState([]);
  const changeCorrect = (index, checkbox) => {
    const tmpCorrect = correct;
    if (!checkbox) {
      for (let i = 0; i < correct.length; i++) {
        tmpCorrect[i] = false;
      }
      console.log('after loop: ', tmpCorrect);
    }
    tmpCorrect[index] = !correct[index];
    setCorrect(tmpCorrect);
  }
  const [numOptions, setNumOptions] = useState(props.options.length);
  const [multi, setMulti] = useState(props.multi);
  const [title, setTitle] = useState(props.title);
  const changeTitle = (event) => {
    setTitle(event.target.value);
  }
  const [points, setPoints] = useState(props.points);
  const changePoints = (event) => {
    setPoints(event.target.value);
  }
  const [time, setTime] = useState(props.time);
  const changeTime = (event) => {
    setTime(event.target.value);
  }
  const populateCorrect = () => {
    for (const opt of props.options) {
      setOptions(oldArray => [...oldArray, Object.keys(opt)[0]]);
      setCorrect(oldArray => [...oldArray, opt[Object.keys(opt)[0]]]);
    }
  }

  useEffect(() => {
    populateCorrect();
  }, []);

  const addOption = () => {
    if (numOptions >= 6) {
      return;
    }
    setNumOptions(numOptions + 1);
    setOptions(oldArray => [...oldArray, '']);
    setCorrect(oldArray => [...oldArray, false]);
  }

  const deleteOption = () => {
    if (numOptions <= 2) {
      return;
    }
    setNumOptions(numOptions - 1);
    const tmpOptions = options;
    tmpOptions.pop();
    const tmpCorrect = correct;
    tmpCorrect.pop();
    setOptions(tmpOptions);
    setCorrect(tmpCorrect);
  }

  const switchChange = () => {
    if (multi) {
      const tmpCorrect = correct;
      for (let i = 0; i < correct.length; i++) {
        tmpCorrect[i] = false;
      }
      setCorrect(tmpCorrect);
    }
    setMulti(!multi);
  }

  const [isImg, setIsImg] = useState(props.image !== null);
  const [isLink, setIsLink] = useState(props.link !== null);

  const changeAttachment = (event) => {
    console.log(event.target.value);
    if (event.target.value === 'img') {
      setIsImg(true);
      setIsLink(false);
    } else if (event.target.value === 'link') {
      setIsImg(false);
      setIsLink(true);
    } else {
      setIsImg(false);
      setIsLink(false);
    }
  }

  const [img, setImg] = useState(props.image);
  const imageChange = async (event) => {
    const files = Array.from(event.target.files);
    const data = await fileToDataUrl(files[0]);
    setImg(data);
  }

  const [link, setLink] = useState(props.link);
  const linkChange = (event) => {
    setLink(event.target.value);
  }

  const back = () => {
    navigate(-1, {
      state: {
        token,
      }
    });
  }

  const submit = () => {
    // Check all inputs are not empty
    for (let i = 0; i < options.length; i++) {
      if (options[i] === '') {
        alert('Options cannot be empty');
        return;
      }
    }

    // Check title is not empty
    if (title === '') {
      alert('Title cannot be empty');
      return;
    }

    // Check there is at least one right answer
    const atLeastOne = correct.reduce(
      (accumulator, currentValue) => accumulator || currentValue,
      false
    );
    if (!atLeastOne) {
      alert('There must be at least one right answer');
      return;
    }

    // Check points and time are positive integers
    const pointsNumber = Number(points);
    if (!Number.isInteger(pointsNumber) || Math.sign(pointsNumber) !== 1) {
      alert('Points for a question must be a positive integer')
      return;
    }
    const timeNumber = Number(time);
    if (!Number.isInteger(timeNumber) || Math.sign(timeNumber) !== 1) {
      alert('Time for a question must be a positive integer')
      return
    }
    const allQuestions = props.allQuestions;
    const indexToChange = props.index;
    const optionsToSubmit = [];
    for (let i = 0; i < options.length; i++) {
      const obj = {}
      obj[options[i]] = correct[i];
      optionsToSubmit.push(obj);
    }
    console.log('options to submit: ', optionsToSubmit);
    const editedQuestion = { title, multi, options: optionsToSubmit, points: pointsNumber, time: timeNumber, link: isLink ? link : null, image: isImg ? img : null };
    allQuestions[indexToChange] = editedQuestion;
    console.log('after: ', allQuestions);
    const gameData = props.data;
    gameData.questions = allQuestions;
    console.log('after', gameData);
    updateAndReturn(gameData);
  }

  const updateAndReturn = async (payload) => {
    const response = await fetch(url + '/admin/quiz/' + props.id, {
      method: 'PUT',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('data is : ', data);
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      navigate(-1, {
        state: {
          token,
        }
      });
    }
  }

  return (
    <div style={{ width: '800px', backgroundColor: '#AAB8D4', margin: '20px auto', padding: '20px' }}>
      <div className='d-flex justify-content-start align-items-center p-2'>
        <h3 className='p-2 flex-grow-1'>
          {/* {props.title} */}
          <Form.Control defaultValue={title} onChange={changeTitle}/>
        </h3>
        <h4 className='p-2'>
          <Form.Control defaultValue={points} style={{ maxWidth: '75px', display: 'inline-block', textAlign: 'center', }} onChange={changePoints} type="number"/>
          points
          (<Form.Control defaultValue={time} style={{ maxWidth: '50px', display: 'inline-block', textAlign: 'center' }} onChange={changeTime} type="number"/> seconds)
        </h4>
      </div>
      <hr/>
      <div className='p-2'>
        <h3>Links/Images</h3>
        <Form.Select aria-label="select attachment type" onChange={changeAttachment} style={{ marginBottom: '20px' }} defaultValue={props.link ? 'link' : (props.image ? 'img' : 'none')}>
          <option value="none">No attachment</option>
          <option value="img">Image</option>
          <option value="link">Youtube Link</option>
        </Form.Select>
        {isLink && <>
          <Form.Label>Enter Youtube URL</Form.Label>
          <Form.Control onChange={linkChange} {...(props.link) ? { defaultValue: props.link } : { }}/>
        </>}
        {isImg && <>
          <Form.Label>Upload Image</Form.Label>x
          <Form.Control type="file" accept="image/*" onChange={imageChange}/>
          {props.image && <div>
            <h4>Currently selected photo</h4>
            <img src={props.image} alt={`image for question ${props.id}`} style={{ width: '500px', height: 'auto', margin: 'auto' }}/>
            <br/>
            <Form.Text muted>
              If you choose to not upload a photo, the previous image will be kept.
            </Form.Text>
          </div>}
        </>}
      </div>
      <hr/>
      <div>
        <Form.Check
          type="switch"
          label="multiple correct answers"
          className="mb-3"
          {...(multi === true) ? { checked: 'success' } : { }}
          onChange={switchChange}

        />
      </div>
      <div className='d-flex justify-content-between align-items-center p-2'>
        <Button onClick={deleteOption} {...(numOptions <= 2) ? { disabled: 'success' } : { }}> Delete Option </Button>
        <Button onClick={addOption} {...(numOptions >= 6) ? { disabled: 'success' } : { }}> Add Option </Button>
      </div>
      <div>
        <Form>
        {options.map((option, index) => (
          <div className='d-flex justify-content-start align-items-center p-2' key={index}>
            <Form.Check
              type={multi === true ? 'checkbox' : 'radio'}
              {...(correct[index] === true) ? { defaultChecked: 'success' } : { }} inline aria-label={option} name='options' onChange={() => changeCorrect(index, multi === true)}
            />
            <Form.Control onChange={(e) => changeOption(e, index)}
              defaultValue={option}
            />
          </div>
        ))}
        </Form>
      </div>
      <div className='d-flex justify-content-between align-items-center p-2'>
        <Button onClick={back}> Cancel </Button>
        <Button onClick={submit}> Save Changes </Button>
      </div>
    </div>
  );
}
