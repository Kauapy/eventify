import React, { useEffect, useState } from "react";
import "./EventDetail.css";
import { formatarData, formatarValor } from "../../utils/format";
import { temInteresse, toggleInteresse } from "../../utils/interesses";

function EventDetail({ evento, onClose }) {
  const [interessado, setInteressado] = useState(false);

  useEffect(() => {
    if (evento?._id) setInteressado(temInteresse(evento._id));
  }, [evento]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!evento) return null;

  const handleInteresse = () => {
    const novoEstado = toggleInteresse(evento._id);
    setInteressado(novoEstado);
  };

  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0' stop-color='#6366f1'/>
            <stop offset='1' stop-color='#8b5cf6'/>
          </linearGradient>
        </defs>
        <rect width='800' height='400' fill='url(#g)'/>
        <text x='50%' y='52%' text-anchor='middle' fill='white' font-family='Inter,sans-serif' font-size='40' font-weight='700'>Eventify</text>
      </svg>`
    );

  return (
    <div
      className="detail-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("detail-overlay")) onClose?.();
      }}
    >
      <div className="detail-modal" role="dialog" aria-modal="true">
        <button className="detail-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="detail-hero">
          <img
            src={evento.imagem || fallback}
            alt={evento.titulo}
            onError={(e) => {
              if (e.target.src !== fallback) e.target.src = fallback;
            }}
          />
          {evento.categoria && <span className="detail-cat">{evento.categoria}</span>}
        </div>

        <div className="detail-body">
          <h2 className="detail-title">{evento.titulo}</h2>

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">Data</span>
              <span className="detail-info-value">{formatarData(evento.data)}</span>
            </div>
            {evento.horario && (
              <div className="detail-info-item">
                <span className="detail-info-label">Horário</span>
                <span className="detail-info-value">{evento.horario}</span>
              </div>
            )}
            {evento.local && (
              <div className="detail-info-item">
                <span className="detail-info-label">Local</span>
                <span className="detail-info-value">{evento.local}</span>
              </div>
            )}
            <div className="detail-info-item">
              <span className="detail-info-label">Valor</span>
              <span className="detail-info-value detail-price">
                {formatarValor(evento.valor)}
              </span>
            </div>
            {evento.vagas != null && (
              <div className="detail-info-item">
                <span className="detail-info-label">Vagas</span>
                <span className="detail-info-value">{evento.vagas}</span>
              </div>
            )}
          </div>

          {evento.descricaoCurta && (
            <p className="detail-summary">{evento.descricaoCurta}</p>
          )}

          {evento.descricaoCompleta && (
            <div className="detail-section">
              <h3>Sobre o evento</h3>
              <p>{evento.descricaoCompleta}</p>
            </div>
          )}

          <div className="detail-actions">
            <button
              className={`detail-cta ${interessado ? "is-active" : ""}`}
              onClick={handleInteresse}
              type="button"
            >
              {interessado ? "✓ Você tem interesse" : "Tenho interesse"}
            </button>
            <button className="detail-secondary" onClick={onClose} type="button">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
