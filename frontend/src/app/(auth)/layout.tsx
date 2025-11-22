import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center text-sm text-base-content/60 hover:text-primary transition-colors mb-6">
                        <ArrowLeft size={16} className="mr-2" />
                        Voltar para Home
                    </Link>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ServiceHub
                    </h1>
                </div>
                {children}
            </div>
        </div>
    );
}
