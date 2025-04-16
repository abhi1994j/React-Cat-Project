import React from "react";

const EducationPlanner = (props) => {
  console.log(props);
  const { input, setInput, handleSubmit, error, list, isSubmit ,handleDelete, handleIncrement, handleDecrement} = props;

  function handleChange(e) {
    const { name, value } = e.target;
    // console.log(`${name} - ${value}`);
    setInput({ ...input, [name]: value });
  }
 
  return (
    <section className="bg-amber-100 min-h-screen flex items-center justify-center py-10 m-4">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-6">
        <h1
          id="header_text"
          className="text-2xl font-bold text-center text-gray-800 mb-4"
        >
          Geekster Education Planner
        </h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            value={input.subject}
            onChange={handleChange}
            placeholder="Enter Subject"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error && error.subject ? (
            <p className="text-center font-semibold text-red-400 text-xs">
              {error.subject}
            </p>
          ) : (
            ""
          )}

          <input
            type="number"
            name="hours"
            value={input.hours}
            onChange={handleChange}
            placeholder="Hours"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error ? (
            <p className="text-center font-semibold text-red-400 text-xs">
              {error.hours}
            </p>
          ) : (
            ""
          )}
          <button className="cursor-pointer bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-all duration-300">
            Add
          </button>
          {/* {isSubmit ? <p className="text-center font-semibold text-green-400 text-xs">Data Submitted Successfully</p> : ''} */}
        </form>

        {list &&
          list.map((ele) => {
            console.log(ele);
            return <div className="list mt-6 bg-amber-50 p-4 rounded-lg space-y-3" key={ele.id}>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">{ele.subject}</span>
                <span className="text-sm text-gray-600">{ele.hours}</span>
              </div>
              <div className="flex justify-around gap-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600" onClick={()=>handleIncrement(ele.id)}>
                  +
                </button>
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={()=>handleDecrement(ele.id)}>
                  -
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={()=>handleDelete(ele.id)}>
                  Delete
                </button>
              </div>
            </div>;
          })}
      </div>
    </section>
  );
};

export default EducationPlanner;
