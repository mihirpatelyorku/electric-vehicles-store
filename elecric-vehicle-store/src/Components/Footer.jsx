function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20 p-5 mt-5 fs-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-50 items-start md:text-left">
        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 pl-0">
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">Shop Cars</li>
            <li className="hover:text-blue-400 cursor-pointer">
              Finance with LUEV
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 pl-0">
            <li className="hover:text-blue-400 cursor-pointer">About Us</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="mb-2">📞 1 (924) 834-061</p>
          <p className="mb-2">📧 contact@luev.ca</p>
          <p className="hover:text-blue-400 cursor-pointer">💬 Chat with us</p>
        </div>

        <div>
          <div className="fs-1 fw-bold text-white select-none">ＬＵＥＶ</div>
          <div className="text-end text-sm text-gray-400 mt-10 p-2">
            © {new Date().getFullYear()} LUEV. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


