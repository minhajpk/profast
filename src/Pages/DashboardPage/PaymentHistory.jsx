import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axiosSecure from '../../Hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecures = axiosSecure();

    const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); 
};

    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecures.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (isPending) {
        return <span className="loading loading-bars loading-xl"></span>;
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            <table className="table w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Payment Method</th>
                        <th>Payment Date & Time</th> {/* New header */}
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment.transactionId}>
                            <td>{index + 1}</td>
                            <td>{payment.parcelId}</td>
                            <td>{payment.email}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.paymentMethod?.[0]}</td>
                            <td>
                               <td>{formatDate(payment.paid_at_string)}</td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
