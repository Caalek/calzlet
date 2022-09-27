const ProgressBar = ({ complete, all }) => {
  return (
    <>
      <span
        className="progress-bar"
        style={{
          width: `${Math.round(((complete + 1) / all) * 100)}%`,
        }}
      ></span>
      <div>
        {`${complete}/${all}`}
      </div> 
    </>
  );
};

export default ProgressBar;
