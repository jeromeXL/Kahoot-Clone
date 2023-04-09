import { React } from 'react';
import Form from 'react-bootstrap/Form';
import Option from './Option';
import Button from 'react-bootstrap/esm/Button';

export default function Question (props) {
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
          disabled
          checked
        />
      </div>
      <div>
        <Option/>
        <Option/>
        <Option/>
      </div>

      <div>
        <Button> Edit question </Button>
        <Button> Delete Question </Button>
      </div>
    </div>
  );
}
