import './App.css';
import './calculateCreditsAndRebates';
import { useState, useEffect } from 'react';

// TODO: create one of these objects in household component
class HouseholdInfo {
  constructor({married, numChildren, zipCode, income}) {
    this.married = married;
    this.numChildren = numChildren;
    this.zipCode = zipCode;
    this.income = income;
  }
}

function App() {
  // TODO: begin with a null household in the PR that creates Household component.
  // This is just placeholder data for now
  const [household, setHousehold] = useState(new HouseholdInfo({
    married: true,
    numChildren: 3,
    zipCode: 98102,
    income: 50000,
  }));
  console.log(household, setHousehold);

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
    const moneySavedInfo = calculateCreditsAndRebates();
    console.log('TODO: move this function call to the right place', moneySavedInfo);
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
