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
      <div className="div-api-link">
        Please click on this{" "}
        <a
          href="https://finworld001-g8cgetfzc4abfagj.eastasia-01.azurewebsites.net/swagger/index.html"
          target="_blank"
        >
          ApiLink
        </a>{" "}
        , if the application does not responds
      </div>
      <div className="div-demo-usr">
        Demo user credentials: TestUser01/Test@123
      </div>
      <div className="divframe">
        <span className="helper"></span>
        <img src={snap1} alt="Picture 1" />
        <span className="helper"></span>
        <img src={snap2} alt="Picture 2" />
        <span className="helper"></span>
        <img src={snap3} alt="Picture 3" />
        <span className="helper"></span>
      </div>
    </>
  );
};

export default Demo;
