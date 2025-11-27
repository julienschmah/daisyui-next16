'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User, Mail, Palette, Save, Loader2 } from 'lucide-react';
import { Button, Card, Typography } from '@/components/ui';
import { useTheme } from '@/app/providers';

export default function ProfilePage() {
    const { data: session, update: updateSession } = useSession();
    const { theme, changeTheme, themes } = useTheme();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || '',
                email: session.user.email || '',
                avatar: session.user.image || '', // NextAuth uses 'image', backend uses 'avatar'
            });
            // Fetch latest data from backend to be sure
            fetchUserData(session.user.id);
        }
    }, [session]);

    const fetchUserData = async (userId: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar || '',
                }));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) return;

        setSaving(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    avatar: formData.avatar,
                }),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                // Update NextAuth session
                await updateSession({
                    ...session,
                    user: {
                        ...session.user,
                        name: updatedUser.name,
                        image: updatedUser.avatar,
                    },
                });
                alert('Perfil atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar perfil');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Erro ao atualizar perfil');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <Typography variant="h2" className="font-bold">Meu Perfil</Typography>
                <Typography variant="body2" className="text-base-content/60">
                    Gerencie suas informações pessoais e preferências
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <User className="text-primary" />
                            <Typography variant="h4" className="font-bold">Informações Pessoais</Typography>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nome Completo</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                                    <input
                                        type="email"
                                        className="input input-bordered w-full pl-10"
                                        value={formData.email}
                                        disabled
                                    />
                                </div>
                                <label className="label">
                                    <span className="label-text-alt text-warning">O email não pode ser alterado</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">URL do Avatar</span>
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered"
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" variant="primary" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Salvar Alterações
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Theme Selector Card */}
                <div>
                    <Card className="h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <Palette className="text-primary" />
                            <Typography variant="h4" className="font-bold">Aparência</Typography>
                        </div>

                        <div className="space-y-4">
                            <Typography variant="body2" className="text-base-content/70">
                                Escolha um tema para personalizar sua experiência no sistema.
                            </Typography>

                            <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {themes.map((t) => (
                                    <button
                                        key={t.name}
                                        className={`btn btn-sm justify-start normal-case ${theme === t.name ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => changeTheme(t.name)}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-4 h-4 rounded-full bg-primary" data-theme={t.name}></div>
                                            <span className="flex-1 text-left">{t.label}</span>
                                            {theme === t.name && <span className="badge badge-sm badge-primary">Ativo</span>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
