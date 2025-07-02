import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router';
import axiosSecure from '../../../Hooks/axiosSecure';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosSecures = axiosSecure();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const { data: parcelInfo = {}, isPending } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await axiosSecures.get(`/parcels/${id}`);
            return res.data;
        },
    });

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    if (isPending) {
        return <span>Loading...</span>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setError('');
        setSuccess('');

        // ✅ Prepare address object without empty strings
        const address = {};
        if (country) address.country = country;
        if (postalCode) address.postal_code = postalCode;

        const billingDetails = {
            name: name || user?.displayName || 'Guest User',
            email: email || user?.email || 'noemail@example.com',
            address,
        };

        try {
            // Step 1: Create Payment Method
            const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
                billing_details: billingDetails,
            });
            console.log(paymentMethod)

            if (pmError) {
                setError(pmError.message);
                return;
            }

            // Step 2: Create Payment Intent
            const res = await axiosSecures.post('/create-payment-intent', {
                amountInCents,
                id,
            });

            const clientSecret = res.data.clientSecret;

            // Step 3: Confirm Card Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: billingDetails,
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                setSuccess('Payment successful!');
                const transactionId = result.paymentIntent.id;

                const paymentData = {
                    parcelId: id,
                    email: email || user.email,
                    amount,
                    transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                };

                const paymentRes = await axiosSecures.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `
            <strong>Transaction ID:</strong> <code>${transactionId}</code><br/>
            <strong>Amount:</strong> <code>${amount}</code>
        `,


                        confirmButtonText: 'Go to My Parcels',
                    });

                    navigate('/dashboard/my-Parcels');
                }
            }
        } catch (err) {
            console.error('Payment Error:', err);
            setError('An unexpected error occurred. Please try again.');
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
            >
                <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="test@example.com"
                        defaultValue={user?.email}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Card information</label>
                    <div className="mt-1 border border-gray-300 p-3 rounded-md">
                        <CardElement className="w-full" />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Name on card</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Zhang San"
                        defaultValue={user?.displayName}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Country or region</label>
                    <select
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select Country
                        </option>
                        <option value="US">United States</option>
                        <option value="BD">Bangladesh</option>
                        <option value="IN">India</option>
                        <option value="GB">United Kingdom</option>
                    </select>
                    <input
                        type="text"
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Postal Code"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-[#CAEB66] hover:bg-lime-500 text-[#03373D] font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2"
                >
                    <span>Pay $ {amount}</span>
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
