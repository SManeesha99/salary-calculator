import { Form } from 'react-bootstrap';

interface CheckBoxProps {
  className?: string;
  label: string;
  checked?: boolean;
  [key: string]: any; // Allow any other props
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, className, checked, ...rest }) => {
  return (
    <Form.Check
      className={className}
      type="checkbox"
      id="flexCheckDefault"
      label={label}
      checked={checked}
      {...rest}
    />
  );
};

export default CheckBox;
