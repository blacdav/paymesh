// import { Link } from "react-router"

const Navigation = () => {
  return (
    <nav className='h-1/12 w-full p-2 fixed bottom-0 bg-primary text-text flex items-center'>
      <ul className="grid grid-cols-12 gap-2 w-full h-full *:col-span-3 *:text-center *:text-sm *:bg-secondary">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    </nav>
  )
}

export default Navigation
