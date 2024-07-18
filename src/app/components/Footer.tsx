const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white mt-4">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Adszoo Lead Manager. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
