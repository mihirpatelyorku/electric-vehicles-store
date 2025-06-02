import coverImg from "../assets/homeImg/Cover.jpg";
import BrowseByType from "../Components/BrowseByType";
import Detail from "../Components/detail";
function Home() {
  return (
    <>
      <div className="cover-container">
        <img src={coverImg} alt="Cover" className="cover-image" />
      </div>
      <BrowseByType />
      <Detail />
    </>
  );
}
export default Home;
