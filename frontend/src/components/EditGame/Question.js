import { React } from 'react';
import Form from 'react-bootstrap/Form';
import Option from './Option';
import Button from 'react-bootstrap/esm/Button';
import ToEditQuestionButton from './ToEditQuestionButton';

export default function Question (props) {
  return (
    <div style={{ width: '800px', backgroundColor: '#AAB8D4', margin: '20px auto', padding: '20px' }}>
      <div className='d-flex justify-content-start align-items-center p-2'>
        <h3 className='p-2 flex-grow-1'>
          {props.title}

        </h3>
        <h4 className='p-2'>
          {props.points} points ({props.time} seconds)
        </h4>
      </div>
      <div>
        <Form.Check
          type="switch"
          label="multiple correct answers"
          className="mb-3"
          disabled
          {...(props.multi === true) ? { checked: 'success' } : { }}
        />
      </div>
      <div>
        {props.options.map((option, index) => (
          <Option key={index} option={Object.keys(option)[0]} correct={option[Object.keys(option)[0]]} multi={props.multi}/>
        ))}
      </div>

      <div className='d-flex justify-content-between align-items-center p-2'>
        <ToEditQuestionButton token={props.token} id={props.id}/>
        <Button> Delete Question </Button>
      </div>
    </div>
  );
}
