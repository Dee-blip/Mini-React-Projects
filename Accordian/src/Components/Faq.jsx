import Accordion from "./Accordion";
import data from "../data.json";

export default function Faq() {
  // console.log(data);
  return (
    <div>
      <h1> FAQ's </h1>
      {data.faqs.map((obj, index) => {
        return <Accordion key={index} qna={obj} />;
      })}
    </div>
  );
}
