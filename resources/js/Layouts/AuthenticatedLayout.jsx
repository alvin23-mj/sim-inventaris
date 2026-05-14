import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-telex text-[14px] font-normal leading-relaxed overflow-x-hidden">
            {/* Sidebar Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`transition-all duration-300 bg-white text-gray-800 flex flex-col fixed h-full z-40 shadow-lg border-r border-gray-200 
                    ${isSidebarOpen ? 'w-72' : 'w-20'} 
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="h-20 flex items-center px-6 border-b border-gray-100 shrink-0">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/images/logo_rsud.jpeg" alt="Logo RSUD" className="h-10 sm:h-12 w-auto" />
                        {isSidebarOpen && (
                            <div>
                                <span className="font-bold tracking-tight text-[18px] sm:text-[21px] text-black whitespace-nowrap block leading-none">SIM Inventaris</span>
                            </div>
                        )}
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
                    <nav className="space-y-1 px-4">
                        <SidebarLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            icon="fas fa-th-large"
                            label="Dashboard"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <SidebarLink
                            href={route('item-requests.index')}
                            active={route().current('item-requests.*')}
                            icon="fas fa-hand-holding-heart"
                            label="Permintaan"
                            isOpen={isSidebarOpen}
                            badge={usePage().props.pendingRequestsCount}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="my-4 h-px bg-gray-100 mx-4" />
                        <SidebarLink
                            href={route('vendors.index')}
                            active={route().current('vendors.*')}
                            icon="fas fa-truck"
                            label="Vendor"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <SidebarLink
                            href={route('item-codes.index')}
                            active={route().current('item-codes.*')}
                            icon="fas fa-barcode"
                            label="Kode Barang"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="my-4 h-px bg-gray-100 mx-4" />
                        <SidebarLink
                            href={route('incoming-goods.index')}
                            active={route().current('incoming-goods.*')}
                            icon="fas fa-file-import"
                            label="Barang Masuk"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <SidebarLink
                            href={route('outgoing-goods.index')}
                            active={route().current('outgoing-goods.*')}
                            icon="fas fa-file-export"
                            label="Barang Keluar"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <SidebarLink
                            href={route('stock-check.index')}
                            active={route().current('stock-check.*')}
                            icon="fas fa-clipboard-check"
                            label="Cek Stok"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="my-4 h-px bg-gray-100 mx-4" />
                        <SidebarLink
                            href={route('users.index')}
                            active={route().current('users.*')}
                            icon="fas fa-users-cog"
                            label="Manajemen Pengguna"
                            isOpen={isSidebarOpen}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100 shrink-0 hidden lg:block">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-400"
                    >
                        <i className={`fas ${isSidebarOpen ? 'fa-angle-double-left' : 'fa-angle-double-right'}`}></i>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 w-full min-w-0 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
                {/* Header */}
                <header className="!bg-white h-20 flex items-center justify-between px-4 sm:px-8 border-b border-gray-100 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all border border-gray-100"
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="hidden sm:block">
                            {header}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Notification Bell */}
                        <div className="relative group">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all border border-gray-100">
                                <i className="fas fa-bell text-lg"></i>
                                {usePage().props.pendingRequestsCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-lg border-2 border-white shadow-sm">
                                        {usePage().props.pendingRequestsCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="h-8 w-px bg-gray-100 mx-1 sm:mx-2"></div>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-all py-1.5 px-2 sm:px-3 rounded-xl border border-transparent hover:border-gray-100">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200 text-[12px] sm:text-[14px]">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left hidden md:block">
                                        <div className="text-xs sm:text-sm font-bold text-gray-900 leading-none">{user.name}</div>
                                    </div>
                                    <i className="fas fa-chevron-down text-[10px] sm:text-sm text-gray-300 ml-0.5 sm:ml-1"></i>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content width="56">
                                <Dropdown.Link href={route('profile.edit')} className="!text-[14px] !font-normal !py-3">
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="!text-[14px] !font-normal !py-3 text-red-600">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                <div className="sm:hidden px-4 py-3 bg-white border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {header}
                </div>

                <main className="p-4 sm:p-8 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, active, icon, label, isOpen, badge, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold transition-colors group ${active
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100'
                }`}
        >
            <div className="flex items-center gap-4">
                <i className={`${icon} text-lg w-6 flex justify-center ${active ? 'text-white' : 'text-gray-400'}`}></i>
                {(isOpen || window.innerWidth < 1024) && <span className="tracking-wide">{label}</span>}
            </div>
            {(isOpen || window.innerWidth < 1024) && badge > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold min-w-[20px] text-center ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white shadow-sm shadow-red-200'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
