import React from 'react'
import "./AdminDashboard.css";

function AdminDashboard() {

    const handleCreateEvent = async () =>{
        const response = await fetch("http://localhost:3000/admin/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                nome: "Evento de Teste",
                data: "21/10/2025",
                categoria: "Tecnologia",
                descricao: "Festa comemorativa da nova empresa de tecnologia chamada Eventify"
            })
        })

        const data = await response.json()
        console.log(data);
    }
  return (
    <div>
        <h2 className='titulo-admin'>Adminfy</h2>
        <h2 className='subtitulo-admin'>Events</h2>
    </div>
  )
}

export default AdminDashboard