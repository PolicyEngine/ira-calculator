import React from 'react';
import { Radio, Button } from "antd";
import HouseholdData from './Household';
import CleanVehicleForm from './CleanVehicleForm';

export default function Household(props){
    function handleChangeState(evt) {
        const updatedNewInfo = {
          ...props.household,
          [evt.target.name]: evt.target.value
        };
        props.setHousehold(updatedNewInfo);
      }

    return (
        <>
        <form>
            <label>Income</label>
            <input type="number" defaultValue={props.household.income} />
            <label>Marital Status</label>
            <Radio.Group name="isMarried" defaultValue={props.household.married} onChange={handleChangeState}>
                <Radio.Button value={false}>Single</Radio.Button>
                <Radio.Button value={true}>Married</Radio.Button>
            </Radio.Group>
            <label>Number of dependents</label>
            <Radio.Group name="haveChildren" defaultValue={props.household.numChildren} onChange={handleChangeState}>
                <Radio.Button value={0}>none</Radio.Button>
                <Radio.Button value={1}>1</Radio.Button>
                <Radio.Button value={2}>2</Radio.Button>
                <Radio.Button value={3}>3</Radio.Button>
                <Radio.Button value={4}>4</Radio.Button>
                <Radio.Button value={5}>5</Radio.Button>
            </Radio.Group>
            <label>Zipcode</label>
            <input type="number" defaultValue={props.household.zipCode} />
        </form>
        <hr />
        <CleanVehicleForm />
        <hr />
        <Button onClick={() => {
            new HouseholdData(props.household).calculateResults().then(results => alert(`Heat pump rebate: ${results.capped_heat_pump_rebate}`))
        }}>Simulate</Button>
        </>
    )

}
