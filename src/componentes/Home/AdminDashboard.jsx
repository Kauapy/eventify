import React, { useState } from 'react'
import "./AdminDashboard.css";
import EventModal from "./EventModal";

function AdminDashboard() {

    const [showModal, setShowModal] = useState(false)

  return (
    <div>
        <h2 className='titulo-admin'>Adminfy</h2>
        <h2 className='subtitulo-admin'>Events</h2>

        <div>
            <button type='button' onClick={() => setShowModal(true)}>Novo Evento</button>
        </div>

        <EventModal visible={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default AdminDashboard