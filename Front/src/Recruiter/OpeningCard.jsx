function OpeningCard({ elem, id, RemoveData }) {
  return (
    <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <h1 className="elem">
        <b>Opening - </b>
        {elem.Heading}
      </h1>
      <h1 className="elem">
        <b>Requirements -</b>
        <ul class="list-group" style={{ marginTop: "25px" }}>
          {elem.Requirements.split(",").map((element, idx) => {
            return <li class="list-group-item">{` ${idx + 1}) ${element}`}</li>;
          })}
        </ul>
      </h1>
      <button
        className="btn btn-danger"
        style={{ marginTop: "20px" }}
        onClick={() => {
          RemoveData(id, elem.Heading);
        }}
      >
        Remove Opening
      </button>
    </div>
  );
}
export default OpeningCard;
