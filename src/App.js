import './App.css';
import { useState } from 'react';
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Household, { HouseholdData } from './Household';
import CleanVehicleForm from './CleanVehicleForm';
import { Button } from 'antd';

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


  // TODO: begin with a null household in the PR that creates Household component.
  // This is just placeholder data for now
  const [household, setHousehold] = useState(new HouseholdInfo({
    married: true,
    numChildren: 3,
    zipCode: 98102,
    income: 50000,
  }));

  const [evCredit, setEVCredit] = useState(0);

  return (
    <div>
      <Header />
      <Household household={household} setHousehold={setHousehold} />
      <CleanVehicleForm household={household} setHousehold={setHousehold} />
      <Button onClick={() => {
        new HouseholdData(household).calculateResults().then(setEVCredit);//.then(res => alert(`New clean vehicle credit value: $${res}`))
      }}>Simulate EV credits</Button>
      <h3>Results</h3>
      {
        evCredit > 0 ?
          <p>You're eligible: your eligible new clean vehicle credit is ${evCredit}.</p> :
          <p>You don't qualify for the new clean vehicle credit.</p>
      }
    </div>
  );
}

export default App;
