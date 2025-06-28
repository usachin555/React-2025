import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <>
      <div>
        <Accordian data={faqs} />
        <div className="tip">
          <TipCalculator />
        </div>
      </div>
    </>
  );
}
export default App;

function Accordian({ data }) {
  const [currOpen, setCurrOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((obj, ind) => (
        <AccordianItem
          currOpen={currOpen}
          onOpen={setCurrOpen}
          key={ind}
          title={obj.title}
          description={obj.text}
          num={ind}
        />
      ))}
    </div>
  );
}

function AccordianItem({ title, description, num, currOpen, onOpen }) {
  const isOpen = num === currOpen;

  function handleToggle() {
    // setIsOpen((isOpen) => !isOpen);
    onOpen(isOpen ? null : num);
    console.log(num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{description}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [sp1, setSP1] = useState(0);
  const [sp2, setSP2] = useState(0);

  const tip1 = sp1 / 100;
  const tip2 = sp2 / 100;
  const tip = bill * (tip1 + tip2);

  function handleReset() {
    setBill("");
    setSP1(0);
    setSP2(0);
  }
  return (
    <>
      <div>
        <BillInput bill={bill} onChange={setBill} />
        <SelectPercentage percentage={sp1} onSelect={setSP1} />
        <SelectPercentage percentage={sp2} onSelect={setSP2} />

        {bill ? <h5>{`You pay $${bill} ($${bill} + $${tip})`}</h5> : ""}

        <div className="reset">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
}

function BillInput({ bill, onChange }) {
  return (
    <div>
      <h5>How much was the bill?</h5>
      <div>
        <input
          type="text"
          placeholder="bill value"
          value={bill}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

function SelectPercentage({ percentage, onSelect }) {
  return (
    <>
      <div>
        <h5>How do you like the service?</h5>
        <div>
          <select value={percentage} onChange={(e) => onSelect(e.target.value)}>
            <option value="0">Dissatisfied(0%)</option>
            <option value="5">It was okay(5%)</option>
            <option value="10">It was good(10%)</option>
            <option value="20">Absolutely amazing(20%)</option>
          </select>
        </div>
      </div>
    </>
  );
}
