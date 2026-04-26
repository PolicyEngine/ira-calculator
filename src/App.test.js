import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('shows clean vehicle credit result', async () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          tax_units: {
            tax_unit: {
              new_clean_vehicle_credit: { 2023: 7500 },
            },
          },
        }),
    })
  );

  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /simulate ev credits/i }));

  await waitFor(() => {
    expect(
      screen.getByText(
        "You're eligible: your eligible new clean vehicle credit is $7500."
      )
    ).toBeInTheDocument();
  });
});
