import React, { useContext, useEffect, useState } from "react";
import "./createItemPrompt.css";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
export const CreateBarcodeItem = (props) => {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: null,
    category: "other",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    console.log(event);

    event.preventDefault();
    console.log(formData.name);
    if (!formData.name) {
      appContext.setShowPrompt(null);
      appContext.setAppState(APP_STATES.DEFAULT);
      return;
    }
    //appContext.setShowPrompt(null);
    appContext.setPromptData(formData);
    appContext.setAppState(APP_STATES.DATA_READY);
  };

  useEffect(() => {
    appContext.setAppState(APP_STATES.SHOW_PROMPT);
  }, []);

  return (
    <div className="create_item">
      <form className="form" onSubmit={handleSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold"
          style={{
            width: "90%",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: "4vw",
            marginLeft: "15px",
            marginTop: "10px",
          }}
          htmlFor="name"
        >
          Introduce product name:
        </label>

        <input
          className=""
          style={{
            width: "90%",
            height: "20%",
            padding: "3%",
            fontWeight: "bold",
            alignContent: "center",
            alignSelf: "center",
            marginTop: "2%",
            marginBottom: "2%",
            marginLeft: "5%",
            marginRight: "5%",
            border: "2px solid #f6bd60",
          }}
          type="text"
          id="name"
          name="name"
          autoFocus={true}
          onChange={handleInputChange}
        />

        <div className="row-2">
          <div className="row-2">
            <input
              className="flex"
              style={{ transform: "scale(1.4)", marginLeft: "10%" }}
              type="radio"
              id="fridge"
              name="category"
              value="fridge"
              onClick={handleRadioChange}
            />

            <label
              htmlFor="fridge"
              style={{ fontWeight: "bold", margin: "7px", fontSize: "3vw" }}
            >
              Fridge
            </label>

            <input
              style={{ transform: "scale(1.4)", marginLeft: "10%" }}
              type="radio"
              id="larder"
              name="category"
              value="larder"
              onClick={handleRadioChange}
            />
            <label
              htmlFor="larder"
              style={{ fontWeight: "bold", margin: "7px", fontSize: "3vw" }}
            >
              Larder
            </label>
          </div>
          <div>
            <input
              className="flex"
              style={{ transform: "scale(1.4)", marginLeft: "10%" }}
              type="radio"
              id="bathroom"
              name="category"
              value="bathroom"
              onClick={handleRadioChange}
            />
            <label
              htmlFor="bathroom"
              style={{ fontWeight: "bold", margin: "7px", fontSize: "3vw" }}
            >
              Bathr
            </label>
            <input
              className="flex"
              style={{ transform: "scale(1.4)", marginLeft: "10%" }}
              type="radio"
              id="other"
              name="category"
              onClick={handleRadioChange}
            />
            <label
              htmlFor="other"
              style={{ fontWeight: "bold", margin: "7px", fontSize: "3vw" }}
            >
              Others
            </label>
          </div>
        </div>
        <div className="navbar">
          <div className="col-md-1">
            <button
              className="create_item_buttons"
              type="submit"
              onClick={() => {
                appContext.setShowPrompt(false);
                appContext.setAppState(APP_STATES.DEFAULT);
              }}
            >
              Cancel
            </button>
          </div>
          <button
            className="create_item_buttons"
            type="submit"
            onSubmit={() => {
              handleSubmit();
            }}
          >
            OK
          </button>
        </div>
      </form>
    </div>
  );
};
