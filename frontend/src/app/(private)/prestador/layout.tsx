import { ProviderSidebar } from '@/components/layout/ProviderSidebar';

export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-base-100">
            <ProviderSidebar />
            <main className="ml-64 min-h-screen bg-base-100/50">
                <div className="container mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
