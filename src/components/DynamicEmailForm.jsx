import React, { useState } from 'react';
import { TextField } from './TextField';
import { Toast } from './Toast';
import { required, email, composeValidators } from '../utils/validators';

export const DynamicEmailForm = () => {
  const [emails, setEmails] = useState([{ id: Date.now(), value: '', error: null }]);
  const [toast, setToast] = useState(null);

  const addEmail = () => setEmails([...emails, { id: Date.now(), value: '', error: null }]);
  const removeEmail = (id) => setEmails(emails.filter(e => e.id !== id));
  
  const updateEmail = (id, value) => {
    setEmails(emails.map(e => e.id === id ? { ...e, value, error: composeValidators(required, email)(value) } : e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = emails.some(e => !e.value || composeValidators(required, email)(e.value));
    if (hasErrors) {
      setToast({ msg: 'Заповніть всі поля коректно', type: 'error' });
      return;
    }
    const uniqueValues = new Set(emails.map(e => e.value));
    if (uniqueValues.size !== emails.length) {
      setToast({ msg: 'Така адреса вже додана', type: 'error' });
      return;
    }
    setToast({ msg: 'Успішно збережено!', type: 'success' });
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">04 / Динамічний список Email</h2>
      <form onSubmit={handleSubmit}>
        {emails.map((email, idx) => (
          <div key={email.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <TextField label={`Email ${idx + 1}`} name={`email-${email.id}`} value={email.value} onChange={(e) => updateEmail(email.id, e.target.value)} error={email.error} />
            </div>
            {emails.length > 1 && (
              <button type="button" className="btn btn--danger" style={{ marginTop: '26px' }} onClick={() => removeEmail(email.id)}>✕</button>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button type="button" className="btn" onClick={addEmail}>+ Додати email</button>
          <button type="submit" className="btn" style={{ background: 'var(--color-white)', color: 'var(--color-ink)' }}>Зберегти</button>
        </div>
      </form>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
