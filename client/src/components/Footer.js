const Footer = () => {
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
          <> </>
          <a href={`mailto:${email}`}>Kontakt</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
