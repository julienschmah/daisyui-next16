'use client';

import { useState } from 'react';
import {
  DashboardSettings,
  DashboardConfigSettings,
  CoreSettings,
  WatermarkSettings,
  ModulesSettings,
  RequiredFieldsSettings,
} from '@/components/forms/settings';
import { SettingsSidebar } from '@/components/layout/SettingsSidebar';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [hasChanges, setHasChanges] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSettings />;
      case 'configurar-dashboard':
        return <DashboardConfigSettings />;
      case 'cores':
        return <CoreSettings />;
      case 'marca-dagua':
        return <WatermarkSettings />;
      case 'modulos':
        return <ModulesSettings />;
      case 'campos-obrigatorios':
        return <RequiredFieldsSettings />;
      default:
        return <DashboardSettings />;
    }
  };

  return (
    <>
      <SettingsSidebar onSectionChange={setActiveSection} hasChanges={hasChanges} />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
