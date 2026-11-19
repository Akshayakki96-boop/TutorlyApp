const CHECKOUT_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

let scriptLoadingPromise = null

/**
 * Lazily injects the Razorpay Checkout script and resolves once `window.Razorpay` is available.
 */
export function loadRazorpayCheckout() {
  if (typeof window !== 'undefined' && window.Razorpay) {
    return Promise.resolve(window.Razorpay)
  }

  if (!scriptLoadingPromise) {
    scriptLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = CHECKOUT_SCRIPT_SRC
      script.async = true
      script.onload = () => resolve(window.Razorpay)
      script.onerror = () => {
        scriptLoadingPromise = null
        reject(new Error('Unable to load the Razorpay checkout script. Please check your connection and try again.'))
      }
      document.body.appendChild(script)
    })
  }

  return scriptLoadingPromise
}

/**
 * Opens Razorpay Checkout for a previously created order and resolves with the
 * payment response once the payer completes payment. Rejects if the payer
 * dismisses the modal without completing payment (via the `cancelled` flag).
 */
export async function openRazorpayCheckout({ order, student, description }) {
  const Razorpay = await loadRazorpayCheckout()

  return new Promise((resolve, reject) => {
    const options = {
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'SkillBridge Tutors',
      description: description || 'Enrollment fee',
      prefill: {
        name: student?.name || '',
        email: student?.email || '',
        contact: student?.contact || '',
      },
      theme: { color: '#0f766e' },
      handler: (response) => {
        resolve({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        })
      },
      modal: {
        ondismiss: () => reject(new Error('cancelled')),
      },
    }

    const checkout = new Razorpay(options)
    checkout.on('payment.failed', (response) => {
      reject(new Error(response?.error?.description || 'Payment failed. Please try again.'))
    })
    checkout.open()
  })
}
