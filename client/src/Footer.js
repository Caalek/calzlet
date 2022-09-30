const Footer = () => {

  const githubLink = "https://github.com/Caalek"
  const email = "calzletapp@gmail.com"
  return (
    <>
      <footer className="font-background">
        <div
          style={{
            width: "40%",
            justifyContent: "space-between"
          }}
        >
          <a href={githubLink}>Github</a>
          <> </>
          <a href={`mailto:${email}`}>Kontakt</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
