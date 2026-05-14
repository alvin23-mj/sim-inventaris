import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        kode_simaset: '',
        nama_simaset: '',
        nama_riil: '',
        satuan: 'Pcs',
        stok_awal: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('item-codes.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Master Kode Barang</h2>}
        >
            <Head title="Tambah Kode Barang" />

            <div className="">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-400 h-2.5 w-full"></div>
                            <div className="p-8">
                                <h2 className="text-3xl font-normal text-gray-900 mb-4">Tambah Kode Barang Baru</h2>
                                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                    Silakan lengkapi informasi barang sesuai dengan data Simaset dan kondisi riil di lapangan.
                                </p>
                            </div>
                        </div>

                        {/* Simaset Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
                            <div className="space-y-3">
                                <InputLabel htmlFor="kode_simaset" value="Kode Barang Simaset" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="kode_simaset"
                                    value={data.kode_simaset}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('kode_simaset', e.target.value)}
                                    required
                                />
                                {errors.kode_simaset && <div className="text-red-500 text-xs mt-1">{errors.kode_simaset}</div>}
                            </div>

                            <div className="space-y-3">
                                <InputLabel htmlFor="nama_simaset" value="Nama Barang Simaset" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="nama_simaset"
                                    value={data.nama_simaset}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('nama_simaset', e.target.value)}
                                    required
                                />
                                {errors.nama_simaset && <div className="text-red-500 text-xs mt-1">{errors.nama_simaset}</div>}
                            </div>
                        </div>

                        {/* Real Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
                            <div className="space-y-3">
                                <InputLabel htmlFor="nama_riil" value="Nama Barang Riil (Sebutan Umum)" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="nama_riil"
                                    value={data.nama_riil}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('nama_riil', e.target.value)}
                                    required
                                />
                                {errors.nama_riil && <div className="text-red-500 text-xs mt-1">{errors.nama_riil}</div>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <InputLabel htmlFor="satuan" value="Satuan Barang" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="satuan"
                                        value={data.satuan}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                        placeholder="Jawaban Anda"
                                        onChange={(e) => setData('satuan', e.target.value)}
                                        required
                                    />
                                    {errors.satuan && <div className="text-red-500 text-xs mt-1">{errors.satuan}</div>}
                                </div>

                                <div className="space-y-3">
                                    <InputLabel htmlFor="stok_awal" value="Stok Awal Sistem" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="stok_awal"
                                        type="number"
                                        value={data.stok_awal}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                        placeholder="Jawaban Anda"
                                        onChange={(e) => setData('stok_awal', e.target.value)}
                                        required
                                    />
                                    {errors.stok_awal && <div className="text-red-500 text-xs mt-1">{errors.stok_awal}</div>}
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-4">
                            <InputLabel value="Status Barang" className="text-gray-900 text-[15px] font-medium mb-4" />
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-0"
                                />
                                <label htmlFor="is_active" className="text-gray-600 text-[14px] cursor-pointer">
                                    Aktifkan barang (Tampil di form permintaan)
                                </label>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
                            <div className="flex gap-4 w-full md:w-auto">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 md:flex-none bg-gray-800 text-white px-10 py-2.5 rounded-lg font-bold hover:bg-gray-900 transition-all shadow-md disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <Link
                                    href={route('item-codes.index')}
                                    className="flex-1 md:flex-none bg-white text-center text-gray-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    Batal
                                </Link>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData({ kode_simaset: '', nama_simaset: '', nama_riil: '', satuan: 'Pcs', stok_awal: 0, is_active: true })}
                                className="text-gray-400 hover:text-gray-800 text-sm font-medium"
                            >
                                Kosongkan formulir
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                body { font-family: 'Telex', sans-serif; }
                input:focus, select:focus, textarea:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }
            ` }} />
        </AuthenticatedLayout>
    );
}
