import React from 'react';

export default function CleanVehicleForm() {
  const [formData, setFormData] = React.useState(
    {
      new_clean_vehicle_classification: "",
      new_clean_vehicle_msrp: "",
      purchased_qualifying_new_clean_vehicle: true,
    }
  )

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    console.log(event);
    setFormData(prev => {
      console.log(prev);
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  return (
    <form>
      <label htmlFor="purchased_qualifying_new_clean_vehicle">Did you buy a qualifiying new vehicle?kljlkj</label>
      <br />
      <input
        type="checkbox"
        id="purchased_qualifying_new_clean_vehicle"
        checked={formData.purchased_qualifying_new_clean_vehicle}
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
        value={formData.new_clean_vehicle_msrp}
      />
      <br />

      <label htmlFor="new_clean_vehicle_classification">What kind of vehicle did you purchase?</label>
      <br />
      <select
        id="new_clean_vehicle_classification"
        value={formData.new_clean_vehicle_classification}
        onChange={handleChange}
        name="new_clean_vehicle_classification"
      >
        <option value="van">Van</option>
        <option value="suv">SUV</option>
        <option value="pickup">Pickup</option>
        <option value="other">All Other Vehicles</option>
      </select>
    </form>
  )
}