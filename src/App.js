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

class ExpenditureInfo{
  constructor({new_clean_vehicle_classification,
  new_clean_vehicle_msrp,
  purchased_qualifying_new_clean_vehicle, used_clean_vehicle_sale_price,residential_efficiency_electrification_retrofit_expenditures,
  residential_efficiency_electrification_retrofit_energy_savings,
  home_energy_audit_expenditures,
  energy_efficient_door_expenditures,
  energy_efficient_insulation_expenditures,
  energy_efficient_roof_expenditures,
  energy_efficient_window_expenditures,
  advanced_main_air_circulating_fan_expenditures,
  air_sealing_ventilation_expenditures,
  biomass_stove_boiler_expenditures,
  electric_heat_pump_clothes_dryer_expenditures,
  electric_load_service_center_upgrade_expenditures,
  electric_stove_cooktop_range_or_oven_expenditures,
  electric_wiring_expenditures,
  energy_efficient_central_air_conditioner_expenditures,
  heat_pump_expenditures,
  heat_pump_water_heater_expenditures,
  qualified_furnace_or_hot_water_boiler_expenditures,
  fuel_cell_property_capacity,
  fuel_cell_property_expenditures,
  geothermal_heat_pump_property_expenditures,
  qualified_battery_storage_technology_expenditures,
  small_wind_energy_property_expenditures,
  solar_electric_property_expenditures,
  solar_water_heating_property_expenditures}){
    this.new_clean_vehicle_classification = new_clean_vehicle_classification;
    this.new_clean_vehicle_msrp = new_clean_vehicle_msrp;
    this.purchased_qualifying_new_clean_vehicle = purchased_qualifying_new_clean_vehicle;
    this.used_clean_vehicle_sale_price = used_clean_vehicle_sale_price;
    this.residential_efficiency_electrification_retrofit_expenditures = residential_efficiency_electrification_retrofit_expenditures;
    this.residential_efficiency_electrification_retrofit_energy_savings = residential_efficiency_electrification_retrofit_energy_savings;
    this.home_energy_audit_expenditures = home_energy_audit_expenditures;
    this.energy_efficient_door_expenditures = energy_efficient_door_expenditures;
    this.energy_efficient_insulation_expenditures = energy_efficient_insulation_expenditures;
    this.energy_efficient_roof_expenditures = energy_efficient_roof_expenditures;
    this.energy_efficient_window_expenditures = energy_efficient_window_expenditures;
    this.air_sealing_ventilation_expenditures = air_sealing_ventilation_expenditures;
    this.biomass_stove_boiler_expenditures = biomass_stove_boiler_expenditures;
    this.advanced_main_air_circulating_fan_expenditures = advanced_main_air_circulating_fan_expenditures;
    this.electric_heat_pump_clothes_dryer_expenditures = electric_heat_pump_clothes_dryer_expenditures;
    this.electric_load_service_center_upgrade_expenditures = electric_load_service_center_upgrade_expenditures;
    this.electric_stove_cooktop_range_or_oven_expenditures = electric_stove_cooktop_range_or_oven_expenditures;
    this.electric_wiring_expenditures = electric_wiring_expenditures;
    this.energy_efficient_central_air_conditioner_expenditures = energy_efficient_central_air_conditioner_expenditures;
    this.heat_pump_expenditures = heat_pump_expenditures;
    this.heat_pump_water_heater_expenditures = heat_pump_water_heater_expenditures;
    this.qualified_furnace_or_hot_water_boiler_expenditures = qualified_furnace_or_hot_water_boiler_expenditures;
    this.fuel_cell_property_capacity = fuel_cell_property_capacity;
    this.fuel_cell_property_expenditures = fuel_cell_property_expenditures;
    this.geothermal_heat_pump_property_expenditures = geothermal_heat_pump_property_expenditures;
    this.qualified_battery_storage_technology_expenditures = qualified_battery_storage_technology_expenditures;
    this.small_wind_energy_property_expenditures = small_wind_energy_property_expenditures;
    this.solar_electric_property_expenditures = solar_electric_property_expenditures;
    this.solar_water_heating_property_expenditures = solar_water_heating_property_expenditures;
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

  return (
    <div>
      <Header />
      <Household household={household} setHousehold={setHousehold} />
      <CleanVehicleForm household={household} setHousehold={setHousehold} />
      <Button onClick={() => {
        new HouseholdData(household).calculateResults().then(() => alert(7500))
      }}>Simulate EV credits</Button>
    </div>
  );
}

export default App;
