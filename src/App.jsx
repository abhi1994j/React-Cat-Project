import { useState, useRef, useEffect } from 'react';
import './App.css';
import EducationPlanner from './EducationPlanner';

function App() {
  const newId = useRef(0);
  const initialValue = {
    subject: "",
    hours: ""
  };

  const [input, setInput] = useState(initialValue);
  const [error, setErrors] = useState({});
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("educationList");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [isSubmit, setIsSubmit] = useState(false);

  // ✅ Restore the correct value of newId on initial load
  useEffect(() => {
    if (list.length > 0) {
      const maxId = Math.max(...list.map(item => item.id));
      newId.current = maxId;
    }
  }, []);

  // ✅ Save to localStorage on every list change
  useEffect(() => {
    localStorage.setItem("educationList", JSON.stringify(list));
  }, [list]);

  function validate(value) {
    const errors = {};
    if (value.subject.trim() === '') {
      errors.subject = "Please Enter Your Subject";
    }
    if (!value.hours) {
      errors.hours = "Please Enter Your Hour";
    } else if (value.hours <= 0) {
      errors.hours = "Hours should be more than 0";
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(input);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmit(true);
      newId.current += 1;
      setList([...list, {
        id: newId.current,
        subject: input.subject,
        hours: parseInt(input.hours)
      }]);
      setInput(initialValue);
    } else {
      setIsSubmit(false);
    }
  }

  function handleDelete(id) {
    const filteredList = list.filter((ele) => ele.id !== id);
    setList(filteredList);
  }

  function handleIncrement(id) {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, hours: parseInt(item.hours) + 1 } : item
    );
    setList(updatedList);
  }

  function handleDecrement(id) {
    const updatedList = list.map((item) =>
      item.id === id && item.hours > 1
        ? { ...item, hours: parseInt(item.hours) - 1 }
        : item
    );
    setList(updatedList);
  }

  return (
    <>
      <EducationPlanner
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        error={error}
        list={list}
        isSubmit={isSubmit}
        handleDelete={handleDelete}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </>
  );
}

export default App;
