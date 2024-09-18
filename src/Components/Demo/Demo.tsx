import snap1 from "../../images/snap1.jpg";
import snap2 from "../../images/snap2.jpg";
import snap3 from "../../images/snap3.jpg";
import snap4 from "../../images/snap4.jpg";
import snap5 from "../../images/snap5.jpg";
import "./Demo.css";
interface Props {}

const Demo = (props: Props) => {
  return (
    <>
      <div className="divframe">
        <span className="helper"></span>
        <img src={snap1} alt="Picture 1" />
        <span className="helper"></span>
        <img src={snap2} alt="Picture 2" />
        <span className="helper"></span>
        <img src={snap3} alt="Picture 3" />
        <span className="helper"></span>
        <img src={snap4} alt="Picture 4" />
        <span className="helper"></span>
        <img src={snap5} alt="Picture 5" />
        <span className="helper"></span>
      </div>
    </>
  );
};

export default Demo;
