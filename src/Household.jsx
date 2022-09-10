import React from 'react';
import { Radio, Button } from "antd";

const POLICYENGINE_API = "https://policyengine.org/us/api"

export class HouseholdData {
    constructor({married, numChildren, zipCode, income}) {
        this.married = married;
        this.numChildren = numChildren;
        this.zipCode = zipCode;
        this.income = income;

        this.capped_heat_pump_rebate = null;
        this.income_tax_before_credits = null;
    }

    getOpenFiscaSituation() {
        let household = {
          tax_units: {
            tax_unit: {
              heat_pump_expenditures: {2023: 10_000},
              high_efficiency_electric_home_rebate_percent_covered: {2023: 1},
              capped_heat_pump_rebate: {2023: null},
              income_tax_before_credits: {2023: null},
              adjusted_gross_income: {2023: this.income}, // This is an approximation
            }
          },
          households: {
            household: {}
          },
          families: {
            family: {}
          },
          marital_units: {},
          people: {},
        }
        let adultNames = [];
        if(this.married) {
          adultNames = ["adult_1", "adult_2"];
        } else {
          adultNames = ["adult_1"];
        }
        let childNames = [];
        for(let i = 0; i < this.numChildren; i++) {
          childNames.push(`child_${i+1}`);
        }
        let allNames = adultNames.concat(childNames);
        household.tax_units.tax_unit.members = allNames;
        household.households.household.members = allNames;
        household.families.family.members = allNames;
        household.people = {};
        for(let name of allNames) {
          household.people[name] = {}
        }
        household.marital_units = {adults: {members: adultNames}}
        for(let name of childNames) {
          household.marital_units[name] = {members: [name]};
        }
        return household;
      }

      calculateResults() {
        return fetch(POLICYENGINE_API + "/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            household: this.getOpenFiscaSituation()
          })
        }).then(response => response.json()).then(data => {
            const capped_heat_pump_rebate = data.tax_units.tax_unit.capped_heat_pump_rebate[2023];
            const income_tax_before_credits = data.tax_units.tax_unit.income_tax_before_credits[2023];
            return {
                capped_heat_pump_rebate: capped_heat_pump_rebate,
                income_tax_before_credits: income_tax_before_credits,
            }
        });
      }
}

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
        <Button onClick={() => {
            new HouseholdData(props.household).calculateResults().then(results => alert(`Heat pump rebate: ${results.capped_heat_pump_rebate}`))
        }}>Simulate</Button>
        </>
    )

}