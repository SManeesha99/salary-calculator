import { Form } from 'react-bootstrap';

interface LabelProps {
  label: string;
  disable?: string;
}

const Label: React.FC<LabelProps> = ({ label, disable }) => {
  return (
    <>
      <Form.Label className='fw-semibold'>
        {label}
      </Form.Label>
      {disable && <br />}
      {disable && <Form.Label className="text-muted"> {disable} </Form.Label>}
    </>
  );
};

export default Label;
