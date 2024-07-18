const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white mt-4">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Adszoo Lead Manager. All rights
        reserved. Developed by{" "}
        <a
          href="https://the-k-innovations.vercel.app/"
          className="text-blue-200"
          target="_blank"
        >
          @Adszoo
        </a>
      </div>
    </footer>
  );
};

export default Footer;
