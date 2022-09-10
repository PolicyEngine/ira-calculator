import React from 'react';

export default function CleanVehicleForm(props) {
  function handleChange(evt) {
    const updatedNewInfo = {
      ...props.household,
      [evt.target.name]: evt.target.value
    };
    props.setHousehold(updatedNewInfo);
  }

  return (
    <form>
      <label htmlFor="purchased_qualifying_new_clean_vehicle">Did you buy a qualifiying new vehicle?</label>
      <br />
      <input
        type="checkbox"
        id="purchased_qualifying_new_clean_vehicle"
        checked={props.purchased_qualifying_new_clean_vehicle}
        onChange={handleChange}
        name="purchased_qualifying_new_clean_vehicle"
      />
      <br />

      <label htmlFor="new_clean_vehicle_msrp">What is the value of the purchased vehicle?</label>
      <br />
      <input
        id="new_clean_vehicle_msrp"
        type="text"
        placeholder="Vehicle MSRP"
        onChange={handleChange}
        name="new_clean_vehicle_msrp"
        defaultValue={props.new_clean_vehicle_msrp}
      />
      <br />

      <label htmlFor="new_clean_vehicle_classification">What kind of vehicle did you purchase?</label>
      <br />
      <select
        id="new_clean_vehicle_classification"
        defaultValue={props.new_clean_vehicle_classification}
        onChange={handleChange}
        name="new_clean_vehicle_classification"
      >
        <option value="VAN">Van</option>
        <option value="SUV">SUV</option>
        <option value="PICKUP">Pickup</option>
        <option value="OTHER">All Other Vehicles</option>
      </select>
    </form>
  )
}