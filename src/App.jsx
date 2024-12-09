import React, { useState } from "react";
import { BarChart } from "@mui/x-charts";
import { useEffect } from "react";
import "./style.css";
import axios from "axios";

const App = () => {
  const initialHtml = parseInt(localStorage.getItem("html") || 0);
  const initialCss = parseInt(localStorage.getItem("css") || 0);
  const initialJs = parseInt(localStorage.getItem("js") || 0);
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [selectedOption, setSelectedOption] = useState("");
  const [chartData, setChartData] = useState([html, css, js]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5007/data", {
      option: selectedOption,
    })

  
    if (selectedOption === "html") {
      setHtml(html + 1);
      localStorage.setItem("html", html + 1);
    } else if (selectedOption === "css") {
      setCss(css + 1);
      localStorage.setItem("css", css + 1);
    } else if (selectedOption === "js") {
      setJs(js + 1);
      localStorage.setItem("js", js + 1);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    setChartData([html, css, js]);
  }, [html, css, js]);

  return (
    <div>
      <form action="Check.php" onSubmit={submit}>
        <input
          type="radio"
          name="option"
          id="html"
          onChange={handleChange}
          value="html"
        />
        <label htmlFor="html">HTML</label>
        <input
          type="radio"
          name="option"
          id="css"
          onChange={handleChange}
          value="css"
        />
        <label htmlFor="css">CSS</label>
        <input
          type="radio"
          name="option"
          id="js"
          onChange={handleChange}
          value="js"
        />
        <label htmlFor="js">JavaScript</label>
        <button type="submit">Submit</button>
      </form>

      <h1>Results</h1>
      <p>HTML: {html}</p>
      <p>CSS: {css}</p>
      <p>JavaScript: {js}</p>

      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: chartData,
          },
        ]}
        width={390}
        height={300}
      />
    </div>
  );
};

export default App;
