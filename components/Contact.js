import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "./Faq";
import { db } from "../utils/Firebase";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default () => {
  const [formState, setFormState] = useState(initialState);
  const { name, email, message } = formState;
  const form = useRef();
  const date = new Date();
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && name !== "" && message !== "") {
      await db.collection("contact").add({
        name: name,
        email: email,
        message: message,
        date: date.toDateString(),
      });
      toast.success("Message sent successfully");
      setFormState(initialState);
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative pt-20"
    >
      <Accordion
        handleChange={handleChange}
        formState={formState}
        handleSubmit={handleSubmit}
        setFormState={setFormState}
      />
      <ToastContainer />
    </motion.div>
  );
};
