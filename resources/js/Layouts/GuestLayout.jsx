import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F0F2F5] pt-6 sm:justify-center sm:pt-0 font-telex">
            <div className="mb-8 flex flex-col items-center gap-3">
                <Link href="/">
                    <img src="/images/logo_rsud.jpeg" alt="Logo RSUD" className="h-16 w-auto" />
                </Link>
                <h1 className="text-xl font-bold text-gray-900">SIM Inventaris</h1>
            </div>

            <div className="w-full overflow-hidden bg-white shadow-sm sm:max-w-md sm:rounded-xl border border-gray-200">
                <div className="bg-gray-400 h-2 w-full"></div>
                <div className="px-8 py-10">
                    {children}
                </div>
            </div>

            <div className="mt-8 text-center text-[11px] text-gray-400">
                &copy; 2026 RS Daerah Nganjuk. All Rights Reserved.
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                body { font-family: 'Telex', sans-serif; }
            ` }} />
        </div>
    );
}
