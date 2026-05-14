import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import CustomButton from '@/Components/CustomButton';

export default function Dashboard({ stats, items }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Dashboard Inventori SIMRS
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 space-y-6">
                {/* Statistik Ringkas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                        <div className="p-4 rounded-xl bg-blue-50 text-blue-600 mr-4">
                            <i className="fas fa-barcode fa-2x"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Item</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalItems}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                        <div className="p-4 rounded-xl bg-purple-50 text-purple-600 mr-4">
                            <i className="fas fa-hand-holding-heart fa-2x"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Permintaan Pending</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalPending}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                        <div className="p-4 rounded-xl bg-green-50 text-green-600 mr-4">
                            <i className="fas fa-file-import fa-2x"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Transaksi Masuk</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalMasuk}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                        <div className="p-4 rounded-xl bg-orange-50 text-orange-600 mr-4">
                            <i className="fas fa-file-export fa-2x"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Transaksi Keluar</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalKeluar}</h3>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        href={route('item-requests.index')}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4 group-hover:bg-blue-100 transition-all">
                                <i className="fas fa-hand-holding-heart"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Permintaan Barang</h4>
                                <p className="text-sm text-gray-500">Kelola permintaan stok dari unit</p>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right text-gray-300 group-hover:text-blue-400 transition-all"></i>
                    </Link>

                    <Link 
                        href={route('incoming-goods.index')}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-green-300 transition-all"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-green-50 text-green-600 mr-4 group-hover:bg-green-100 transition-all">
                                <i className="fas fa-plus"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Catat Barang Masuk</h4>
                                <p className="text-sm text-gray-500">Input stok baru dari vendor</p>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right text-gray-300 group-hover:text-green-400 transition-all"></i>
                    </Link>

                    <Link 
                        href={route('outgoing-goods.index')}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group hover:border-orange-300 transition-all"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-orange-50 text-orange-600 mr-4 group-hover:bg-orange-100 transition-all">
                                <i className="fas fa-minus"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Catat Barang Keluar</h4>
                                <p className="text-sm text-gray-500">Input pengeluaran barang ke unit</p>
                            </div>
                        </div>
                        <i className="fas fa-chevron-right text-gray-300 group-hover:text-orange-400 transition-all"></i>
                    </Link>
                </div>

                {/* Recent Items / Status Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h3 className="text-lg font-medium text-gray-800">Status Stok Terkini</h3>
                        <CustomButton 
                            variant="secondary" 
                            href={route('stock-check.index')}
                            className="!py-2 !px-4 !text-gray-900 w-full sm:w-auto justify-center"
                        >
                            Lihat Laporan Lengkap
                        </CustomButton>
                    </div>
                    <div className="overflow-x-auto p-4 sm:p-6 scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300 whitespace-nowrap">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Kode Barang</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama Barang</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Stok</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Satuan</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.slice(0, 5).map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 border border-gray-300 text-center text-sm font-bold text-gray-900">
                                            {item.kode_simaset}
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <div className="text-sm font-semibold text-gray-900">{item.nama_simaset}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <span className="text-sm font-bold text-gray-900">{item.stok}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-500 border border-gray-300">
                                            {item.satuan}
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <span className={`px-4 py-2 inline-flex text-xs font-bold rounded-lg border shadow-sm uppercase tracking-wider ${
                                                item.stok > 5 
                                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                                {item.stok > 5 ? 'Aman' : 'Low Stok'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}{items.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic text-sm">Belum ada data barang tersedia.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
