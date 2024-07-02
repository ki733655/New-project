import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 mb-4">
            <h5 className="uppercase mb-2 font-bold">Company</h5>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4">
            <h5 className="uppercase mb-2 font-bold">Support</h5>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="hover:underline">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4">
            <h5 className="uppercase mb-2 font-bold">Social</h5>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="hover:underline">Facebook</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Twitter</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Instagram</a>
              </li>
            </ul>
          </div>
          {/* <div className="w-full md:w-1/4 mb-4">
            <h5 className="uppercase mb-2 font-bold">Newsletter</h5>
            <form>
              <div className="mb-4">
                <input
                  type="email"
                  className="w-full px-4 py-2 text-gray-800"
                  placeholder="Your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
    </>
  )
}

export default Footer