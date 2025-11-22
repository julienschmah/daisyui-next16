'use client';

import { useState } from 'react';
import { Header } from '@/components/ui';
import {
  ThemeSwitcher,
  DashboardSettings,
  AccountSettings,
  RegionSettings,
  NotificationSettings,
  DataSettings,
} from '@/components/settings';
import {
  Palette,
  Bell,
  Lock,
  Globe,
  Database,
  Home,
} from 'lucide-react';

type SettingsTab = 'theme' | 'dashboard' | 'account' | 'region' | 'notifications' | 'data';

const settingsTabs = [
  { id: 'theme', label: 'Tema', icon: Palette },
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'account', label: 'Conta', icon: Lock },
  { id: 'region', label: 'Região', icon: Globe },
  { id: 'data', label: 'Dados', icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('theme');

  const renderContent = () => {
    switch (activeTab) {
      case 'theme':
        return <ThemeSwitcher />;
      case 'dashboard':
        return <DashboardSettings />;
      case 'account':
        return <AccountSettings />;
      case 'region':
        return <RegionSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'data':
        return <DataSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Header 
        title="Configurações" 
        subtitle="Gerencie suas preferências e configurações de conta"
        icon="⚙️"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de abas */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 rounded-lg border border-base-300 overflow-hidden sticky top-4">
            <div className="p-4 border-b border-base-300">
              <h3 className="font-semibold text-base-content">Configurações</h3>
            </div>
            <div className="p-0">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-content border-l-4 border-primary font-semibold'
                        : 'text-base-content hover:bg-base-200'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
