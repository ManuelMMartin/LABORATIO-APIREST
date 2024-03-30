import apiRest from '../assets/apiRest.webp'
import './Header.css'

export function Header() {

  return (
    <header className='header'>
      <h1>LABORATORIO</h1>
      <img src={apiRest} className="logo" alt="React logo" />
    </header>
  )
}
