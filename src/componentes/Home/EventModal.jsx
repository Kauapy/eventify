import React, { useEffect, useState } from "react";
import "./EventModal.css";
import api from "../../services/api";
import { toDateInput } from "../../utils/format";

const CATEGORIAS = ["Geral", "Tecnologia", "Esportes", "Educação", "Arte", "Música", "Negócios"];

const VAZIO = {
  titulo: "",
  descricaoCurta: "",
  descricaoCompleta: "",
  imagem: "",
  valor: "",
  data: "",
  horario: "",
  local: "",
  categoria: "Geral",
  vagas: "",
};

function EventModal({ visible, onClose, onSalvo, evento = null }) {
  const editando = Boolean(evento && evento._id);
  const [form, setForm] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  useEffect(() => {
    if (!visible) return;
    if (editando) {
      setForm({
        titulo: evento.titulo || "",
        descricaoCurta: evento.descricaoCurta || "",
        descricaoCompleta: evento.descricaoCompleta || "",
        imagem: evento.imagem || "",
        valor: evento.valor ?? "",
        data: toDateInput(evento.data),
        horario: evento.horario || "",
        local: evento.local || "",
        categoria: evento.categoria || "Geral",
        vagas: evento.vagas ?? "",
      });
    } else {
      setForm(VAZIO);
    }
    setErros({});
    setErroGeral("");
  }, [visible, evento, editando]);

  if (!visible) return null;

  const setCampo = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const validar = () => {
    const e = {};
    if (!form.titulo.trim()) e.titulo = "Informe o título";
    if (!form.descricaoCurta.trim()) e.descricaoCurta = "Informe uma descrição curta";
    if (form.descricaoCurta.length > 200) e.descricaoCurta = "Máximo de 200 caracteres";
    if (!form.data) e.data = "Informe a data";
    if (!form.categoria) e.categoria = "Selecione uma categoria";
    if (form.valor !== "" && Number(form.valor) < 0) e.valor = "Valor inválido";
    if (form.vagas !== "" && Number(form.vagas) < 0) e.vagas = "Vagas inválido";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async (ev) => {
    ev.preventDefault();
    setErroGeral("");
    if (!validar()) return;
    setSalvando(true);
    try {
      const payload = {
        ...form,
        valor: form.valor === "" ? 0 : Number(form.valor),
        vagas: form.vagas === "" ? null : Number(form.vagas),
      };
      const { data } = editando
        ? await api.put(`/events/${evento._id}`, payload)
        : await api.post("/events", payload);
      onSalvo?.(data, editando);
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.erros?.join(", ") ||
        err?.response?.data?.mensagem ||
        "Não foi possível salvar o evento.";
      setErroGeral(msg);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose();
      }}
    >
      <div className="modal-content event-form" role="dialog" aria-modal="true">
        <h2 className="modal-title">
          {editando ? "Editar Evento" : "Criar Novo Evento"}
        </h2>

        {erroGeral && <p className="modal-erro-geral">{erroGeral}</p>}

        <form onSubmit={handleSave} className="modal-form" noValidate>
          <div className="form-row">
            <label className="modal-label">
              Título *
              <input
                className="modal-input"
                type="text"
                value={form.titulo}
                onChange={setCampo("titulo")}
                maxLength={120}
              />
              {erros.titulo && <span className="campo-erro">{erros.titulo}</span>}
            </label>
          </div>

          <div className="form-row">
            <label className="modal-label">
              Descrição curta * <small>({form.descricaoCurta.length}/200)</small>
              <input
                className="modal-input"
                type="text"
                value={form.descricaoCurta}
                onChange={setCampo("descricaoCurta")}
                maxLength={200}
              />
              {erros.descricaoCurta && (
                <span className="campo-erro">{erros.descricaoCurta}</span>
              )}
            </label>
          </div>

          <div className="form-row">
            <label className="modal-label">
              Descrição completa
              <textarea
                className="modal-textarea"
                rows="4"
                value={form.descricaoCompleta}
                onChange={setCampo("descricaoCompleta")}
              />
            </label>
          </div>

          <div className="form-row">
            <label className="modal-label">
              URL da imagem
              <input
                className="modal-input"
                type="url"
                placeholder="https://..."
                value={form.imagem}
                onChange={setCampo("imagem")}
              />
            </label>
          </div>

          <div className="form-row form-row-2">
            <label className="modal-label">
              Data *
              <input
                className="modal-input"
                type="date"
                value={form.data}
                onChange={setCampo("data")}
              />
              {erros.data && <span className="campo-erro">{erros.data}</span>}
            </label>
            <label className="modal-label">
              Horário
              <input
                className="modal-input"
                type="time"
                value={form.horario}
                onChange={setCampo("horario")}
              />
            </label>
          </div>

          <div className="form-row">
            <label className="modal-label">
              Local
              <input
                className="modal-input"
                type="text"
                placeholder="Endereço ou online"
                value={form.local}
                onChange={setCampo("local")}
              />
            </label>
          </div>

          <div className="form-row form-row-3">
            <label className="modal-label">
              Categoria *
              <select
                className="modal-select"
                value={form.categoria}
                onChange={setCampo("categoria")}
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="modal-label">
              Valor (R$)
              <input
                className="modal-input"
                type="number"
                min="0"
                step="0.01"
                placeholder="0 = gratuito"
                value={form.valor}
                onChange={setCampo("valor")}
              />
              {erros.valor && <span className="campo-erro">{erros.valor}</span>}
            </label>
            <label className="modal-label">
              Vagas
              <input
                className="modal-input"
                type="number"
                min="0"
                placeholder="Opcional"
                value={form.vagas}
                onChange={setCampo("vagas")}
              />
              {erros.vagas && <span className="campo-erro">{erros.vagas}</span>}
            </label>
          </div>

          <div className="modal-actions">
            <button
              className="modal-button cancel"
              type="button"
              onClick={onClose}
              disabled={salvando}
            >
              Cancelar
            </button>
            <button className="modal-button save" type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : editando ? "Salvar alterações" : "Criar evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
