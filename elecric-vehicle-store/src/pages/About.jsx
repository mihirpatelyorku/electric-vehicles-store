import cover from "../assets/aboutImg/AboutPageCover.jpg"
function About() {
  return (
    <>
      <div className="main">
        <div className="sub-Main">
          <h1>About LUEV</h1>
          <p>
            Welcome to LUEV, your trusted online destination for premium
            electric vehicles. We are dedicated to transforming the way people
            drive by offering cutting-edge electric cars that combine
            innovation, sustainability, and performance.
          </p>
        </div>
        <img src={cover} alt="" />
      </div>
      <div className="part-1"></div>
    </>
  );
}
export default About;
