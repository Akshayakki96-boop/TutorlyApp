// Fixed-price payment packages offered at checkout, shared by every payment form
// (StudentPayment.jsx and StudentDashboard.jsx). Keep these aligned with the
// marketing rates shown on the Fees / Course Fees pages.
//
// Calculated totals (confirm/adjust before going live):
// - 12-Session Bundle: 12 sessions x GBP 8/hour (discounted rate) = GBP 96.
// - GCSE Intensive Bundle: 12 sessions x GBP 14/hour = GBP 168.
// - Quarterly Plan: assumes a 1 session/week cadence (~4 sessions/month) at the
//   GBP 8/hour standard rate, i.e. 2 paid months x GBP 32 = GBP 64, with the
//   3rd month free. Adjust `amount` if your actual session cadence differs.
export const PAYMENT_CURRENCY = 'GBP'

export const PAYMENT_PACKAGES = [
  {
    id: 'bundle12',
    label: '12-Session Bundle',
    description: '12 standard maths sessions at the discounted £8/hour rate',
    amount: 96,
  },
  {
    id: 'gcseIntensive',
    label: 'GCSE Intensive Bundle',
    description: '12 GCSE Intensive sessions at £14/hour',
    amount: 168,
  },
  {
    id: 'quarterly',
    label: 'Quarterly Plan (pay 2 months, 3rd free)',
    description: '2 months of standard tuition, 3rd month free',
    amount: 64,
  },
]

export function findPaymentPackage(id) {
  return PAYMENT_PACKAGES.find((pkg) => pkg.id === id) || PAYMENT_PACKAGES[0]
}
