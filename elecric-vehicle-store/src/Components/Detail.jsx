import QualityImg from "../assets/homeImg/Quality.png"
function Detail() {
  return (
    <div className="text-center detail-section">
      <h1>Smarter Drives. Cleaner Tomorrow.</h1>
      <p>
        Each vehicle undergoes a detailed inspection, ensuring advanced
        performance, reliability, and peace of mind on every drive. Our electric
        vehicles are thoroughly inspected for quality, giving you sustainable
        performance without compromise.
      </p>
        <img src={QualityImg} alt="" />
    </div>
  );
}
export default Detail;
