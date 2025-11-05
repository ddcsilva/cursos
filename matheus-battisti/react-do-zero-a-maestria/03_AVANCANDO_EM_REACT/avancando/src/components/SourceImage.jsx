import CityImage from "../assets/city.jpg";

const SourceImage = () => {
  return (
    <div>
      <h2>Imagens em Source</h2>
      <img src={CityImage} alt="Cidade" />
    </div>
  );
};

export default SourceImage;
