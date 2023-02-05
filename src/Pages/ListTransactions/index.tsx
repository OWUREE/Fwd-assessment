import React, { useEffect, useState } from "react";
import axios from "axios";

interface dataItems {
  amount: number;
  customer: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
  };
  reference: string;
}
const ListTransactions = () => {
  const [responseData, setResponseData] = useState<dataItems[]>();

  const SECRET_KEY = `${import.meta.env.VITE_REACT_APP_SECRET_KEY}`;

  useEffect(() => {
    const listPaystackTransaction = async () => {
      console.log("something");
      try {
        const { data } = await axios.get(
          `https://api.paystack.co/transaction?perPage=4`,

          {
            headers: {
              Authorization: `Bearer ${SECRET_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data.data);
        setResponseData(data.data);

        return data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    listPaystackTransaction();
  }, []);

  return (
    <>
      <section className="flex text-font-color w-full lg:w-8/12 m-auto mt-8 border rounded-lg border-payment-color pt-5 flex-col font-poppins">
        <div className="text-center mx-4 lg:mx-8">
          <h2 className="text-2xl py-3">Payment History Page</h2>
          <p className="py-3">
            A summary of all the payments you have made is shown below!.
          </p>
        </div>

        <div className="flex justify-center my-5">
          {responseData?.length ? (
            <section className="flex flex-col lg:flex-row lg:flex-wrap justify-center">
              {responseData.map(
                ({ amount, customer, reference }: dataItems) => (
                  <div
                    className="bg-payment-color rounded-lg w-80 p-3 m-5 text-left"
                    key={reference}
                  >
                    <p>
                      customer name : {customer.first_name} {customer.last_name}
                    </p>
                    <p className="py-2"> customer email : {customer.email} </p>
                    <p className="py-2">
                      customer Telephone : {customer.phone}
                    </p>
                    <p className="py-2 ">
                      Amount paid : NGN{(amount / 100).toLocaleString()}
                    </p>
                    <p className="py-2">Paystack reference : {reference}</p>
                  </div>
                )
              )}
            </section>
          ) : (
            <div className="px-4 py-4 mb-4 text-center">
              NO DATA FROM BACKEND !!
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ListTransactions;
