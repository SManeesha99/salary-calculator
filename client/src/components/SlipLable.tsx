import {Row, Col} from 'react-bootstrap';

interface SlipLableProps {
    label: string;
    amount: string;
    className?: string;
    [key: string]: any;
}

const SlipLable: React.FC<SlipLableProps> = ({label, amount, className}) => {
    return (
        <Row >
            <Col className={className}>{label}</Col>
            <Col className='text-end'>{amount}</Col>
        </Row>
    );
};

export default SlipLable;