import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='footer-container'>
      <p className='cadastrar'>Esqueceu sua senha?</p>
      <Link to="/register" className='cadastrar'>Criar Conta</Link>
    </div>
  )
}

export default Footer;