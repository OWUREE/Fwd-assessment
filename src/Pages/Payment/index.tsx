import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router";

import Background from "../../images/background.jpeg";
import FormInput from "../../Components/FormInput";
import style from "./style.module.css";

const FormPayment = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    amount: 0,
    phoneNumber: "",
  });

  const [phoneError, setPhoneError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  // paystack implementation

  const publicKey = "pk_test_99d5c72614adecb45a6c4ead272db257ac76f7f4";
  const amount = inputValue.amount * 100;
  const email = inputValue.email;
  const fullName = inputValue.fullName;
  const phoneNumber = inputValue.phoneNumber;

  const componentProps = {
    email,
    amount,
    firstname: fullName.split(" ")[1],
    lastname: fullName.split(" ")[0],
    phone: phoneNumber,
    publicKey,
    text: "Pay Now",

    onSuccess: () => {
      // console.log(data);
      alert("Payment Successful, check your email for confirmation");
      navigate("/list");
      // return data;
    },

    onClose: () => alert("all transaction will be lost"),
  };

  const handleSubmit = (e: any) => {
    console.log("something different");
    e.preventDefault();

    const phonePattern =
      /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?([0-9]{3})$/;

    const correctPhone = phonePattern.test(inputValue.phoneNumber);
    console.log("something else");
    if (!correctPhone) {
      setPhoneError(true);
      return;
    } else if (!amount) {
      setAmountError(true);
      return;
    }
  };

  return (
    <section className="flex flex-col lg:flex-row justify-center gap-x-16 w-screen">
      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "screen",
        }}
        className={`${style.imageContainer} w-1/2 h-96 my-auto`}
      />

      <div
        className="flex text-font-color w-full lg:w-1/2 border rounded-lg border-payment-color p-3 pt-5 flex-col text-left font-poppins"
        style={{ paddingBottom: "30px" }}
      >
        <h2 className="text-2xl text-center lg:text-left p-3 font-semibold">
          Welcome to your payment page !!
        </h2>
        <p className="text-xl mt-4 p-3">Payment details</p>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg flex w-full flex-col mx-auto align-center items-center p-3 mt-3"
        >
          <FormInput
            name="Fullname"
            value={inputValue.fullName}
            type="text"
            placeholder="Enter Full name"
            handleChange={(e: any) => {
              setInputValue({ ...inputValue, fullName: e.target.value });
              console.log(inputValue.fullName.split(" ")[0]);
            }}
          />
          <FormInput
            name="email"
            value={inputValue.email}
            placeholder="Enter email"
            type="email"
            handleChange={(e: any) => {
              setInputValue({ ...inputValue, email: e.target.value });
              console.log(inputValue.email);
            }}
          />
          <FormInput
            name="phone"
            value={inputValue.phoneNumber}
            placeholder="Enter phone (+234......)"
            type="text"
            handleChange={(e: any) => {
              setInputValue({ ...inputValue, phoneNumber: e.target.value });
              console.log(inputValue.phoneNumber);
            }}
          />
          <span
            className="text-red-500 text-sm p-1"
            style={phoneError ? { display: "block" } : { display: "none" }}
          >
            Phone number pattern is incorrect.
          </span>

          <FormInput
            name="amount"
            value={inputValue.amount}
            type="number"
            placeholder="Enter amount (in NGN)"
            handleChange={(e: any) => {
              setInputValue({ ...inputValue, amount: e.target.value });
              console.log(inputValue.amount);
            }}
          />
          <span
            className="text-red-500 text-sm p-1"
            style={amountError ? { display: "block" } : { display: "none" }}
          >
            you have to enter an amount.
          </span>
        </form>
        <div className="flex justify-center">
          <PaystackButton
            {...componentProps}
            className="rounded-lg py-3 text-button-text border-0 bg-button-background text-center mt-5 w-48 lg:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default FormPayment;
