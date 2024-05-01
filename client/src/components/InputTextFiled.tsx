import { Form } from 'react-bootstrap';

interface InputFieldProps {
  className?: string;
  placeholder?: string;
  [key: string]: any; // Allow any other props
}

const InputField: React.FC<InputFieldProps> = ({ className, placeholder, ...rest }) => {
  return (
    <Form.Group>
      <input className={className} placeholder={placeholder} {...rest} />
    </Form.Group>
  );
};

export default InputField;
