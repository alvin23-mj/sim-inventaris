import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import CustomButton from '@/Components/CustomButton';
import Pagination from '@/Components/Pagination';

export default function Index({ itemRequests, filters = { month: null, year: null } }) {
    const requestsData = itemRequests.data;
    const months = [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const safeFilters = filters || { month: null, year: null };

    const handleFilter = (name, value) => {
        router.get(route('item-requests.index'), {
            ...safeFilters,
            [name]: value
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Daftar Permintaan Unit</h2>}
        >
            <Head title="Permintaan Unit" />

            <div className="py-6">
                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
                    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Log Permintaan Barang</h3>
                            <p className="text-sm text-gray-400">
                                {(!safeFilters?.date && !safeFilters?.month && !safeFilters?.year) 
                                    ? "Menampilkan permintaan khusus hari ini." 
                                    : safeFilters?.date 
                                        ? `Menampilkan permintaan untuk tanggal ${safeFilters.date}.`
                                        : "Daftar permohonan barang dari unit-unit rumah sakit."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 whitespace-nowrap">Hari:</span>
                                <input
                                    type="date"
                                    value={safeFilters?.date || ''}
                                    onChange={(e) => handleFilter('date', e.target.value)}
                                    className="border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                                />
                            </div>

                            <div className="h-4 w-px bg-gray-200 hidden sm:block mx-1"></div>

                            <select
                                value={safeFilters?.month || ''}
                                onChange={(e) => {
                                    handleFilter('month', e.target.value);
                                    if (e.target.value) handleFilter('date', ''); // Clear day filter if month is selected
                                }}
                                className="border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:min-w-[120px]"
                            >
                                <option value="">Pilih Bulan</option>
                                {months.map((m) => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>

                            <select
                                value={safeFilters?.year || ''}
                                onChange={(e) => handleFilter('year', e.target.value)}
                                className="border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                            >
                                <option value="">Tahun</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>

                            {(safeFilters?.date || safeFilters?.month || safeFilters?.year) && (
                                <button
                                    onClick={() => router.get(route('item-requests.index'))}
                                    className="text-red-500 text-sm font-bold hover:underline py-2 sm:py-0 px-2"
                                >
                                    <i className="fas fa-times mr-1"></i> Reset
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto p-4 sm:p-6 scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300 whitespace-nowrap">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase w-32">Tanggal</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Unit / Ruangan</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama Pemohon</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Daftar Barang</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-20">Tanda Tangan</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-32">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-40">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requestsData.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium border border-gray-300">
                                            {req.request_date}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-bold uppercase border border-gray-300">
                                            {req.unit_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                                            {req.recipient_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 border border-gray-300">
                                            <div className="space-y-2">
                                                {req.details.map((detail) => (
                                                    <div key={detail.id} className="text-gray-800">
                                                        <span className="font-semibold">{detail.item?.nama_simaset || 'Item tidak ditemukan'}</span> 
                                                        <span className="text-blue-600 font-bold ml-2">{detail.quantity} {detail.item?.satuan || ''}</span>
                                                        {detail.notes && (
                                                            <div className="text-[11px] text-gray-500 italic bg-gray-50 p-1 rounded border-l-2 border-gray-200 mt-1">
                                                                "{detail.notes}"
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            {req.signature && (
                                                <div className="bg-gray-50 p-1 rounded border border-gray-100 inline-block">
                                                    <img src={req.signature} alt="Signature" className="h-10 mix-blend-multiply mx-auto" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <span className={`px-4 py-2 inline-block rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm border ${
                                                req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                                                req.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                                'bg-red-100 text-red-700 border-red-200'
                                            }`}>
                                                {req.status === 'Pending' ? 'Menunggu' : req.status === 'Approved' ? 'Disetujui' : 'Ditolak'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <div className="flex items-center justify-center gap-4">
                                                {req.status === 'Pending' ? (
                                                    <Link 
                                                        href={route('outgoing-goods.create', { request_id: req.id })}
                                                        className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                                        title="Proses Permintaan"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400 italic text-[10px] uppercase font-bold tracking-widest">Selesai</span>
                                                )}
                                                
                                                <button
                                                    onClick={() => {
                                                        if(confirm('Hapus permintaan ini?')) {
                                                            import('@inertiajs/react').then(({ router }) => {
                                                                router.delete(route('item-requests.destroy', req.id));
                                                            });
                                                        }
                                                    }}
                                                    className="bg-white text-red-500 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all border border-red-100"
                                                    title="Hapus Permintaan"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {requestsData.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500 italic">
                                            Belum ada permintaan barang dari unit.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 pb-6">
                        <Pagination links={itemRequests.links} />
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                body { font-family: 'Telex', sans-serif; }
            ` }} />
        </AuthenticatedLayout>
    );
}
