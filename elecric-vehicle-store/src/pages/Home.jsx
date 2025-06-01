import coverImg from "../assets/cover.jpg";
function Home() {
  return (
    <div className="cover-container">
      <img src={coverImg} alt="Cover" className="cover-image" />
      <h1 className="cover-text">BUY YOUR DREAM CAR TODAY</h1>
    </div>
  );
}
export default Home;
