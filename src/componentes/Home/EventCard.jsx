import React from "react";
import "./EventCard.css";
import { formatarData, formatarValor } from "../../utils/format";

function EventCard({ evento, onAbrir, acoesAdmin = null }) {
  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 220'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0' stop-color='#6366f1'/>
            <stop offset='1' stop-color='#8b5cf6'/>
          </linearGradient>
        </defs>
        <rect width='400' height='220' fill='url(#g)'/>
        <text x='50%' y='52%' text-anchor='middle' fill='white' font-family='Inter, sans-serif' font-size='22' font-weight='700'>Eventify</text>
      </svg>`
    );

  const handleImgError = (e) => {
    if (e.target.src !== fallback) e.target.src = fallback;
  };

  return (
    <article
      className="event-card"
      onClick={onAbrir ? () => onAbrir(evento) : undefined}
      role={onAbrir ? "button" : undefined}
      tabIndex={onAbrir ? 0 : undefined}
      onKeyDown={(e) => {
        if (onAbrir && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onAbrir(evento);
        }
      }}
    >
      <div className="event-card-image-wrapper">
        <img
          className="event-card-image"
          src={evento.imagem || fallback}
          alt={evento.titulo || evento.nome}
          onError={handleImgError}
          loading="lazy"
        />
        {evento.categoria && (
          <span className="event-card-cat">{evento.categoria}</span>
        )}
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">{evento.titulo || evento.nome}</h3>
        {evento.descricaoCurta && (
          <p className="event-card-desc">{evento.descricaoCurta}</p>
        )}

        <ul className="event-card-meta">
          <li>📅 {formatarData(evento.data)}</li>
          {evento.horario && <li>⏰ {evento.horario}</li>}
          {evento.local && <li>📍 {evento.local}</li>}
        </ul>

        <div className="event-card-footer">
          <span className="event-card-price">{formatarValor(evento.valor)}</span>
          {acoesAdmin}
        </div>
      </div>
    </article>
  );
}

export default EventCard;
