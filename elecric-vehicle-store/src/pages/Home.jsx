import coverImg from "../assets/homeImg/Cover.jpg";
import BrowseByType from "../Components/BrowseByType";

function Home() {
  return (
    <>
      <div className="cover-container">
        <img src={coverImg} alt="Cover" className="cover-image" />
      </div>
      <BrowseByType />
    </>
  );
}
export default Home;
