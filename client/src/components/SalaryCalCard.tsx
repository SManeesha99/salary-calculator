import React, {useEffect, useState} from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../css/style.css"
import LabelField from "./Lable";
import InputField from "./InputTextFiled";
import CloseImg from "../assets/close.png";
import ResetImg from "../assets/reset.png";
import AddImg from "../assets/add.png";
import CheckBox from "./CheckBox";
import SalarySlip from "./SalarySlip";


interface SalaryCalCardProps {
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



const SalaryCalCard: React.FC<SalaryCalCardProps> = () => {

    //Initial State
    const[earnings, setEarnings] = useState([1]);
    const[deductions, setDeductions] = useState([1]);
    const[basic_Salary, setBasic_Salary] = useState(0);
    const[earningsItems, setEarningsItems] = useState([""]);
    const[deductionsItems, setDeductionsItems] = useState([""]);
    const[earningAmounts, setEarningAmounts] = useState([""]);
    const[deductionAmounts, setDeductionAmounts] = useState([""]);
    const[epf_etf, setEpf_etf] = useState([false]);

    //Add New Earning
    const addEarning = () => {
        setEarnings([...earnings, earnings.length + 1]);
    }

    //Add New Deduction
    const addDeduction = () => {
        setDeductions([...deductions, deductions.length + 1]);
    }

    //Remove Earning
    const removeEarning = (indexToRemove: number) => {
        setEarnings(earnings.filter((_, index) => index !== indexToRemove));
    }

    //Remove Deduction
    const removeDeduction = (indexToRemove: number) => {
        setDeductions(deductions.filter((_, index) => index !== indexToRemove));
    }

    //Total  Basic Salary
    const totalBasicSalary = () => {
        console.log("Basic Salary" , basic_Salary);
        return basic_Salary;
    }

    //Total Earnings
    const calculateEarnings = () => {
        let total = basic_Salary;
        earningAmounts.forEach((value) => {
            if (value) {
                total += parseInt(value);
            }
        });
        console.log("Amount Earning :", total);
        return total;
    }

    //Total Earnings for EPF
    const empEpfEarning = () => {
        let totalEpfEtf = basic_Salary;
        earningAmounts.forEach((value, index) => {
            if (value && epf_etf[index]) {
                totalEpfEtf += parseInt(value);
            }
        });
        console.log("EPF/ETF Earning :", totalEpfEtf);
        return totalEpfEtf;
    }

    //Gross Deduction 
    const grossDeduction = () => {
        let totalGrossDeduction = 0;
        deductionAmounts.forEach((value, index)=>{
            if(value && deductionsItems[index]){
                totalGrossDeduction += parseInt(value);
            }
        });
        console.log("Gross Deduction :",totalGrossDeduction);
        return totalGrossDeduction        
    }

    //Gross Earnings
    const grossEarning = () => {
        let totalGrossEarning = calculateEarnings() - grossDeduction();
        console.log("Gross Earning :", totalGrossEarning);
        return totalGrossEarning;
    }

    //Gross Salary for EPF
    const grossSalaryEpf = () => {
        let totalgrossSalaryEpf = empEpfEarning() - grossDeduction();
        console.log("Gross Salary for EPF :", totalgrossSalaryEpf);
        return totalgrossSalaryEpf;
    }

    //Employee EPF (8%)
    const employeeEpf = () => {
        let totalEmployeeEpf = (grossSalaryEpf() * 8 ) / 100;
        console.log("Employee EPF(8%) :",totalEmployeeEpf);
        return totalEmployeeEpf;
    }

    //Employer EPF (12%)
    const employerEpf = () => {
        let totalEmployerEpf = (grossSalaryEpf() * 12) / 100;
        console.log("Employer EPF(12%) :",totalEmployerEpf);
        return totalEmployerEpf;
    }

    //Employer ETF (3%)
    const employeeEtf = () => {
        let totalEmployeeEtf = (grossSalaryEpf() * 3) / 100;
        console.log("Employer ETF(3%) :",totalEmployeeEtf);
        return totalEmployeeEtf;
    }

    //APIT
    const calculateAPIT = () => {
        let totalgrossErning = grossEarning();
        let totalSalary;
        if (totalgrossErning >= 100000 && totalgrossErning < 141667) {
            totalSalary = totalgrossErning * 0.06 - 6000;
        } else if (totalgrossErning >= 141667 && totalgrossErning < 183333) {
            totalSalary = totalgrossErning * 0.12 - 14500;
        } else if (totalgrossErning >= 183333 && totalgrossErning < 225000) {
            totalSalary = totalgrossErning * 0.18 - 25000;
        } else if (totalgrossErning >= 225000 && totalgrossErning < 266667) {
            totalSalary = totalgrossErning * 0.24 - 39000;
        } else if (totalgrossErning >= 266667 && totalgrossErning < 308333) {
            totalSalary = totalgrossErning * 0.3 - 55000;
        } else if (totalgrossErning >= 308333) {
            totalSalary = totalgrossErning * 0.36 - 73500;
        } else {
            totalSalary = 0;
        }
        console.log("APIT :", totalSalary);
        return totalSalary;
    }

    

    //Net Salary
    const netSalary = () => {
        let totalNetSalary = grossEarning() - employeeEpf() - calculateAPIT();
        console.log("Net Salary :", totalNetSalary);
        return totalNetSalary;
    }

    //Cost To Company
    const costToCompany = () => {
        let totalCostToCompany = grossEarning() + employerEpf() + employeeEtf();
        console.log("Cost To Company :", totalCostToCompany);
        return totalCostToCompany;
    }


    const resetFiled = () => {
        setBasic_Salary(0);
        setEarningsItems([""]);
        setDeductionsItems([""]);
        setEarningAmounts([""]);
        setDeductionAmounts([""]);
        setEarnings([1]);
        setDeductions([1]);
    };

    const handleBasicSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setBasic_Salary(value);
    };

    useEffect(()=>{
        totalBasicSalary();
        calculateEarnings();
        empEpfEarning();
        grossDeduction();
        grossEarning();
        grossSalaryEpf();
        employeeEpf();
        employerEpf();
        employeeEtf();
        calculateAPIT();
        netSalary();
    },[
        basic_Salary,
        earningsItems,
        deductionsItems,
        earningAmounts,
        deductionAmounts,
        epf_etf,
    ]);

    return (
        <>
            <Row>
                <Col md={6}>
                    <div className="mainCard position-absolute text-start border rounded-2 p-4 m-4 bg-light">
                        
                        <Container fluid>
                            <Row className="d-flex justify-content-between">
                                <Col>
                                    <h3 className="fw-bold">Calculate Your Salary</h3>
                                </Col>
                                <Col xs="auto">
                                    <Button 
                                        variant="light" 
                                        className="text-primary"
                                        onClick={resetFiled} >
                                    <img src={ResetImg} alt="Close" /> Reset
                                    </Button>
                                </Col>
                            </Row>
                            {/* Basic Salary Section */}

                            <div className="mt-4">
                            <LabelField label="Basic Salary" />
                            <br />
                            <InputField
                                    className="inputFiled border rounded-1 px-2"
                                    placeholder="Enter Basic Salary"
                                    type="text"
                                    value={basic_Salary}
                                    onChange={handleBasicSalary}
                            />
                            </div>

                            {/* Earning Section */}

                                <div className="mt-4">

                                    <LabelField 
                                    label="Earnings"
                                    disable="Allowance, Fixed Allowance, Bonus and etc." />

                                    {earnings.map((index) => (
                                            <>
                                            <div key={index} className="d-flex align-items-center mt-2">
                                            <div className="d-flex justify-content-between ">
                                                <InputField
                                                    className="inputLeft border rounded-1 px-2 me-2"
                                                    placeholder="Pay Details (Title)" 
                                                    type="text"
                                                    value={earningsItems[index - 1]}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                                        const addNewEarningItem = [...earningsItems];
                                                        addNewEarningItem[index-1] = e.target.value;
                                                        setEarningsItems(addNewEarningItem)
                                                    }} />
                                                <InputField
                                                    className="inputRight border rounded-1 px-2 text-end"
                                                    placeholder="Amount"
                                                    type="text"
                                                    value={earningAmounts[index - 1]}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                                        const addNewEarningAmount = [...earningAmounts];
                                                        addNewEarningAmount[index-1] = e.target.value;
                                                        setEarningAmounts(addNewEarningAmount)
                                                    }} />
                                            </div>
                                            <Button
                                                className="closeBtn border border-0 bg-secondary-subtle rounded-circle mx-2 d-flex justify-content-center align-items-center"
                                                onClick={() => removeEarning(index - 1 )}
                                            >
                                                <img src={CloseImg} alt="Close" />
                                            </Button>
                                            <CheckBox
                                                className="m-2"
                                                label={"EPF / ETF"} 
                                                checked={epf_etf[index - 1]}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const newEpf_Etf = [...epf_etf];
                                                    newEpf_Etf[index - 1] = !epf_etf[index - 1];
                                                    setEpf_etf(newEpf_Etf);
                                                  }}
                                                />
                                        </div>
                                        
                                        
                                        </>

                                    ))}
                                        <Button
                                            variant="light"
                                            className="text-primary my-4"
                                            onClick={addEarning}
                                        >
                                                <img src={AddImg} alt="Add" />  Add New Allowance
                                        </Button>
                                </div> 

                                <hr />
                            {/* Deduction Section */}   
                                <div className="mt-4">
                                    <LabelField 
                                        label="Deductions"
                                        disable="EPF, ETF, Tax and etc."
                                    />

                                    {deductions.map((index) => {
                                        return (
                                            <div key={index} className="d-flex align-items-center mt-2">
                                                <div className="d-flex justify-content-between ">
                                                    <InputField
                                                        className="inputLeft border rounded-1 px-2 me-2"
                                                        placeholder="Pay Details (Title)"
                                                        type="text"
                                                        value={deductionsItems[index - 1]}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                                            const addNewDeductionItem = [...deductionsItems];
                                                            addNewDeductionItem[index-1] = e.target.value;
                                                            setDeductionsItems(addNewDeductionItem)
                                                        }}                                                         
                                                    />
                                                    <InputField
                                                        className="inputRight border rounded-1 px-2 text-end"
                                                        placeholder="Amount"
                                                        type="text"
                                                        value={deductionAmounts[index - 1]}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                                            const addNewDeductionAmount = [...deductionAmounts];
                                                            addNewDeductionAmount[index-1] = e.target.value;
                                                            setDeductionAmounts(addNewDeductionAmount)
                                                        }}

                                                    />
                                                </div>
                                                <Button
                                                    className="closeBtn border border-0 bg-secondary-subtle rounded-circle mx-2 d-flex justify-content-center align-items-center"
                                                    onClick={() => removeDeduction(index - 1 )}
                                                >
                                                    <img src={CloseImg} alt="Close" />
                                                </Button>
                                            </div>
                                        );
                                    })}
                                    <Button
                                        variant="light"
                                        className="text-primary my-4"
                                        onClick={addDeduction}
                                    >
                                        <img src={AddImg} alt="Add" />  Add New Deduction
                                    </Button>
                                </div>
                        </Container>
                    </div>
                </Col>
                <Col md={6} className="">
                    <SalarySlip 
                        basic_Salary={basic_Salary} 
                        gross_earning={grossEarning()} 
                        gross_deduction={grossDeduction()} 
                        APIT={calculateAPIT()} 
                        net_salary={netSalary()} 
                        cost_Company={costToCompany()} 
                        emp_EPF={employeeEpf()} 
                        employer_EPF={employerEpf()} 
                        employer_ETF={employeeEtf()}                    
                    />
                </Col>
            </Row>          
        </>
    );
};

export default SalaryCalCard;

