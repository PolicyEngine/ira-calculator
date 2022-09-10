import './App.css';
import { useState, useEffect } from 'react';

class HouseholdInfo {
  constructor({married, numChildren, zipCode, income}) {
    this.married = married;
    this.numChildren = numChildren;
    this.zipCode = zipCode;
    this.income = income;
  }
}
class ExpenditureInfo{
  constructor({new_clean_vehicle_classification,
  new_clean_vehicle_msrp,
  purchased_qualifying_new_clean_vehicle}){
    this.new_clean_vehicle_classification = new_clean_vehicle_classification;
    this.new_clean_vehicle_msrp = new_clean_vehicle_msrp;
    this.purchased_qualifying_new_clean_vehicle = purchased_qualifying_new_clean_vehicle;
  }
}
function App() {
  const [household, setHousehold] = useState(new HouseholdInfo({
    married: true,
    numChildren: 3,
    zipCode: 98102,
    income: 50000,
  }));
  return (
    <div className="App">
      <header className="App-header">
        <APIExampleTest />
      </header>
    </div>
  );
}

const exampleHousehold = {
  people: {
    person: {},
  },
  tax_units: {
    tax_unit: {
      members: ["person"],
      heat_pump_expenditures: {2023: 10_000},
      high_efficiency_electric_home_rebate_percent_covered: {2023: 1},
      capped_heat_pump_rebate: {2023: null}, // We want to calculate this.
    }
  }
}

function APIExampleTest() {
  const [rebateAmount, setRebateAmount] = useState(null);
  
  useEffect(() => {
    fetch(
      "https://policyengine.org/us/api/calculate", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          household: exampleHousehold,
        })
      }
    )
      .then(results => results.json())
      .then(data => {
        const rebateAmount = data.tax_units.tax_unit.capped_heat_pump_rebate[2023];
        setRebateAmount(rebateAmount);
      });
  }, []); // <-- Have to pass in [] here!

  if(rebateAmount === null) {
    return <p>Fetching an example from the PolicyEngine API...</p>
  } else {
    return (
      <p>
        The heat pump rebate for $10k in heat pump expenditures in 2023 is ${rebateAmount}.
      </p>
    );
  }
}

export default App;
