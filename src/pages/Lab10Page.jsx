import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegistrationForm } from '../components/RegistrationForm';
import { DynamicEmailForm } from '../components/DynamicEmailForm';
import { MultiStepForm } from '../components/MultiStepForm';
import './Lab10Page.css';

export default function Lab10Page() {
  return (
    <div className="lab-page">
      <header className="lab-header">
        <h1 className="lab-title">LAB 10<br/>FORMS</h1>
        <p className="lab-subtitle">Система валідації форм</p>
      </header>
      <main className="lab-main">
        <LoginForm />
        <RegistrationForm />
        <DynamicEmailForm />
        <MultiStepForm />
      </main>
    </div>
  );
}
