import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import EditOption from './EditOption';
import Button from 'react-bootstrap/esm/Button';

export default function EditQuestion (props) {
  const [numOptions, setNumOptions] = useState(0);
  const [multi, setMulti] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const addOption = () => {
    if (numOptions < 6) {
      setNumOptions(numOptions + 1);
      const newOptionList = [...optionList];
      newOptionList.push('')
      setOptionList(newOptionList);
    }
  }

  const removeOption = () => {
    if (numOptions > 2) {
      setNumOptions(numOptions - 1);
      const newOptionList = [...optionList];
      newOptionList.pop();
      setOptionList(newOptionList);
    }
  }
  return (
    <div style={{ width: '800px', backgroundColor: '#AAB8D4', margin: '20px auto', padding: '20px' }}>
      <div className='d-flex justify-content-around align-items-center p-2'>
        <h3>
          How many days in a leap year?
        </h3>
        <h3>
          (30s)
        </h3>
      </div>
      <div>
        <Form.Check
          type="switch"
          label="multiple correct answers"
          className="mb-3"
          onChange={() => setMulti(!multi)}
        />
      </div>
      <div>
        <Form>
          {/* <Option multi={multi}></Option>
          <Option multi={multi}></Option> */}
          {optionList.map((option, index) => (
          <EditOption key={index} multi={multi}>{option}</EditOption>
          ))}
        </Form>
      </div>
      <div className='d-flex justify-content-between align-items-center p-2'>
        <Button onClick={addOption} disabled={numOptions >= 6}>
          Add Option
        </Button>
        <Button variant="danger" disabled={numOptions <= 2} onClick={removeOption}>
          Remove Option
        </Button>
      </div>
    </div>
  );
}
