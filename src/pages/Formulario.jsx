import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForm } from '../redux/actions/actionFormulario/actionFormulario';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.reducerFormulario);

  // Estados locales para los valores y errores del formulario
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Al montar, solicita la estructura del formulario
  useEffect(() => { dispatch(fetchForm()); }, [dispatch]);

  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Cargando formulario...</div>;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:40}}>Error: {error}</div>;
  if (!data) return null;

  const fields = data.inputs || [];

  // Actualiza el valor del campo localmente
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Si hay error para este campo y el usuario escribe, lo limpiamos
    setFormErrors(prevErrors => {
      if (!prevErrors[name]) return prevErrors;
      const newErrors = { ...prevErrors };
      if (value && newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };


  // Valida campos obligatorios y muestra errores localmente
  const handleSubmit = e => {
    e.preventDefault();
    const errors = {};
    fields.forEach(f => {
      if (f.mandatory && !formValues[f.identifier]) {
        errors[f.identifier] = `El campo "${f.fiendlyName}" es obligatorio, favor de ingresar su "${f.fiendlyName}".`;
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert('Formulario enviado correctamente!');
      setFormValues({}); 
      setFormErrors({});
    }
  };

  return (
    <div style={{ position: 'relative', padding: '2rem', maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginTop: '8rem' }}>
      <ArrowBackIcon
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 2,
          left: 2,
          fontSize: 25,
          color: '#1976d2',
          cursor: 'pointer',
          zIndex: 9999
        }}
        titleAccess="Volver al inicio"
      />
      <h2 style={{ marginBottom: '1.5rem', color: '#1976d2', fontWeight: 700 }}>Formulario</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
        {fields.map(f => (
          <div key={f.identifier} style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor={f.identifier} style={{fontWeight:600, marginBottom:4}}>{f.fiendlyName}</label>
            {f.inputType && f.inputType.toLowerCase() === 'textarea' ? (
              <textarea
                id={f.identifier}
                name={f.identifier}
                placeholder={f.fiendlyName}
                value={formValues[f.identifier] || ''}
                onChange={handleChange}
                style={{ padding: '10px', borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }}
              />
            ) : (
              <input
                id={f.identifier}
                type={f.inputType && f.inputType.toLowerCase() === 'email' ? 'email' : 'text'}
                name={f.identifier}
                placeholder={f.fiendlyName}
                value={formValues[f.identifier] || ''}
                onChange={handleChange}
                style={{ padding: '10px', borderRadius: 6, border: '1px solid #ccc' }}
              />
            )}
            {formErrors[f.identifier] && <span style={{color:'red',fontSize:13,marginTop:3}}>{formErrors[f.identifier]}</span>}
          </div>
        ))}
        <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '12px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;