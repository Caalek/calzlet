const ProgressBar = ({ complete, all }) => {
  return (
    <>
      <div style={{textAlign: "center", fontSize: "large"}}>
        {`${complete}/${all}`}
      </div> 
      <span
        className="progress-bar"
        style={{
          width: `${Math.round((complete  / all) * 100)}%`,
        }}
      ></span>
    </>
  );
};

export default ProgressBar;
