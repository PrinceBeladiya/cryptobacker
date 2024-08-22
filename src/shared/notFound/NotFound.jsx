import { Link } from "react-router-dom"
import { notfound } from "../../assets/images"

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <img src={notfound} alt="404-Not_Found" />
      </div>
      <p className="w-full flex justify-center text-3xl my-3 text-blue-600">404 Not Found</p>
      <p className="w-full flex justify-center text-4xl my-4">Whoops! That page doesn’t exist.</p>
      <p className="w-full flex justify-center text-xl mt-4">Here are some helpful links instead:</p>
      <Link to="/" className="w-full flex justify-center text-lg underline">Home</Link>
    </>
  )
}

export default NotFound