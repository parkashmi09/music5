// src/stripe.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51R4G9d00GICMHC6vO3BCvP70swYbx6UdZxkZRlQ8Q9JQ2KD5m7k8cngH5S4vKItsBMvvM2UyVwMWpV8cFeavLsLf00G3VBMcaJ');

export const handlePayment = async (priceId, planDetails) => {
  try {
    const stripe = await stripePromise;
    
    // Create a checkout session directly on the frontend
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // successUrl: `${window.location.origin}/subscription/success`,
      // cancelUrl: `${window.location.origin}/subscription/cancel`,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export default stripePromise;


/**
 * Takes subscription from website and processes it through Stripe
 * @param {string} userId - The user ID for the subscription
 * @param {object} planDetails - Details of the subscription plan
 * @returns {Promise<object>} - Response from the API
 */
export const takeSubscriptionFromWebsite = async (userId, planDetails) => {
  try {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${BASE_URL}/takeSubscriptionFromWebsiteAlsoOnStripe/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
      },
      // body: JSON.stringify(planDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to process subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Subscription API error:', error);
    throw error;
  }
};