import React from 'react';
import { Radio, Button } from "antd";

const POLICYENGINE_API = "https://policyengine.org/us/api"

export class HouseholdData {
    constructor({married, numChildren, zipCode, income, purchased_qualifying_new_clean_vehicle,
        new_clean_vehicle_msrp, new_clean_vehicle_classification,
    }) {
        this.married = married;
        this.numChildren = numChildren;
        this.zipCode = zipCode;
        this.income = income;
        this.purchased_qualifying_new_clean_vehicle = purchased_qualifying_new_clean_vehicle;
        this.new_clean_vehicle_msrp = new_clean_vehicle_msrp;
        this.new_clean_vehicle_classification = new_clean_vehicle_classification;

        this.capped_heat_pump_rebate = null;
        this.income_tax_before_credits = null;
    }

    getOpenFiscaSituation() {
        let household = {
          tax_units: {
            tax_unit: {
              purchased_qualifying_new_clean_vehicle: {2023: 1},
              new_clean_vehicle_msrp: {2023: +this.new_clean_vehicle_msrp},
              new_clean_vehicle_classification: {2023: "VAN"},
              new_clean_vehicle_battery_capacity: {2023: 100},
              new_clean_vehicle_credit: {2023: null},
              new_clean_vehicle_battery_critical_minerals_extracted_in_trading_partner_country: {2023: 1},
              new_clean_vehicle_battery_components_made_in_north_america: {2023: 1},
              adjusted_gross_income: {2023: +this.income}, // This is an approximation
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
            return data.tax_units.tax_unit.new_clean_vehicle_credit[2023];
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
            <label>Income</label>
            <input name="income" type="number" defaultValue={props.household.income} onChange={handleChangeState} />
            <label>Marital Status</label>
            <Radio.Group name="married" defaultValue={props.household.married} onChange={handleChangeState}>
                <Radio.Button value={false}>Single</Radio.Button>
                <Radio.Button value={true}>Married</Radio.Button>
            </Radio.Group>
            <label>Number of dependents</label>
            <Radio.Group name="numChildren" defaultValue={props.household.numChildren} onChange={handleChangeState}>
                <Radio.Button value={0}>none</Radio.Button>
                <Radio.Button value={1}>1</Radio.Button>
                <Radio.Button value={2}>2</Radio.Button>
                <Radio.Button value={3}>3</Radio.Button>
                <Radio.Button value={4}>4</Radio.Button>
                <Radio.Button value={5}>5</Radio.Button>
            </Radio.Group>
            <label>Zipcode</label>
            <input type="number" defaultValue={props.household.zipCode} />
        </>
    )

}