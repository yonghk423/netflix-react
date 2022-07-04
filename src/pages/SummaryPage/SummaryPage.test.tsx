import SummaryPage from './SummaryPage'
import { render, screen } from '@testing-library/react';
import React from 'react';

test("checkbox and button", () => {
  render(<SummaryPage />);
  const checkbox:any = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  expect(checkbox.checked).toEqual(false);

  const confirmButton:any = screen.getByRole("button", { name: "주문 확인" });
  expect(confirmButton.disabled).toBeTruthy();
});
