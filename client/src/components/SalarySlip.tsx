import { Col, Container, Row } from 'react-bootstrap';
import '../css/style.css'
import SlipLable from "./SlipLable";

interface SalarySlipProps {
    basic_Salary: number;
    gross_earning: number;
    gross_deduction: number;
    APIT: number;
    net_salary: number;
    cost_Company: number;
    emp_EPF: number;
    employer_EPF: number;
    employer_ETF: number;
}

const SalarySlip: React.FC<SalarySlipProps> = ({ basic_Salary, gross_earning, gross_deduction, APIT, net_salary, cost_Company, emp_EPF, employer_EPF, employer_ETF
 }) => {
    return (
            <div className='slipCard border rounded-2 m-4 p-4 text-start bg-white'>
                <Container fluid>
                    <Row className="d-flex justify-content-end">
                        <Col>
                            <h3 className="fw-bold">Your Salary</h3>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="d-flex justify-content-between">
                            <p className="fw-semibold text-secondary">Item</p>
                            <p className="fw-semibold text-secondary">Amount</p>
                        </Col>
                    </Row>   

                    <SlipLable label="Basic Salary" amount={basic_Salary.toFixed(2)} />
                    <SlipLable label="Gross Earnings" amount={gross_earning.toFixed(2)} />
                    <SlipLable label="Gross Deductions" amount={"-"+gross_deduction.toFixed(2)} />  
                    <SlipLable label="Employee EPF (8%)" amount={"-"+emp_EPF.toFixed(2)} />
                    <SlipLable label="APIT" amount={"-"+APIT.toFixed(2)} />

                    <div className='border border-1 p-4 my-4'>
                        <SlipLable label="Net Salary" amount={net_salary.toFixed(2)} />
                    </div>

                    <p className="fw-semibold text-secondary mt-4">Contribution from the Employer</p>

                    <SlipLable label="Employer EPF (12%)" amount={employer_EPF.toFixed(2)} />
                    <SlipLable label="Employer ETF (3%)" amount={employer_ETF.toFixed(2)} />

                    <div className='mt-4'>
                        <SlipLable label="CTC (Cost to Company)" amount={cost_Company.toFixed(2)} />
                    </div>
                </Container>

            </div>
    );
};

export default SalarySlip;
