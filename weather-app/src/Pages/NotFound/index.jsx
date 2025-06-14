import FuzzyText from "../../Components/Text/FuzzyText";
import "./NotFound.scss";
const NotFound = () => {
  return (
    <>
      <div className="NotFound">
        <div className="NotFound__container">
          <FuzzyText baseIntensity={0.2} color="white">
            404
          </FuzzyText>
          <div className="NotFound__bar"></div>
          <FuzzyText baseIntensity={0.2} color="white">
            not found
          </FuzzyText>
        </div>
      </div>
    </>
  );
};
export default NotFound;
