'use client';

import { useState } from 'react';
import { SettingsSidebar } from '@/app/components/SettingsSidebar';
import { DashboardSettings } from '@/app/components/settings/DashboardSettings';
import { CoreSettings } from '@/app/components/settings/CoreSettings';
import { WatermarkSettings } from '@/app/components/settings/WatermarkSettings';
import { ModulesSettings } from '@/app/components/settings/ModulesSettings';
import { RequiredFieldsSettings } from '@/app/components/settings/RequiredFieldsSettings';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSettings />;
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
    <div className="flex min-h-screen bg-base-100">
      <SettingsSidebar onSectionChange={setActiveSection} />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
