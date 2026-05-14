import React, { useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import CustomButton from '@/Components/CustomButton';
import SignaturePad from '@/Components/SignaturePad';

export default function Welcome({ items, auth }) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        unit_name: '',
        recipient_name: '',
        request_date: new Date().toISOString().split('T')[0],
        notes: '',
        signature: null,
        details: [{ item_id: '', quantity: 1, notes: '' }],
    });

    const signatureRef = useRef(null);

    const handleAddDetail = () => {
        setData('details', [...data.details, { item_id: '', quantity: 1, notes: '' }]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = data.details.filter((_, i) => i !== index);
        setData('details', newDetails);
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...data.details];
        newDetails[index][field] = value;
        setData('details', newDetails);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const latestSignature = signatureRef.current?.getSignature();

        transform((data) => ({
            ...data,
            signature: latestSignature
        }));

        post(route('requests.store'), {
            onSuccess: () => {
                reset();
                signatureRef.current?.clear();
                alert('Permintaan berhasil dikirim!');
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] font-telex text-[14px]">
            <Head title="SIM Inventaris - Permintaan Barang" />

            {/* Header / Navbar */}
            {/* Header / Navbar */}
            <nav className="bg-white border-b border-gray-200 py-3 px-4 sm:px-8 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <img src="/images/logo_rsud.jpeg" alt="Logo RSUD" className="h-8 sm:h-10 w-auto" />
                        <h1 className="font-bold text-gray-900 leading-tight text-[16px] sm:text-[18px]">SIM Inventaris</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-gray-500 hover:text-gray-900 font-bold transition-colors text-[13px] sm:text-[14px]">
                                <i className="fas fa-tachometer-alt mr-1 sm:mr-2"></i> <span className="hidden sm:inline">Dashboard Admin</span>
                            </Link>
                        ) : (
                            <Link href={route('login')} className="bg-white text-gray-600 px-3 sm:px-4 py-1.5 rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200 text-[11px] sm:text-xs">
                                <i className="fas fa-lock mr-1 sm:mr-2"></i> Login Admin
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <div className="py-6 sm:py-8 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-400 h-2.5 w-full"></div>
                            <div className="p-6 sm:p-8">
                                <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-4">Portal Permintaan Barang</h2>
                                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                    Silakan isi formulir di bawah ini untuk mengajukan permintaan stok barang atau alat kesehatan bagi unit/ruangan Anda.
                                </p>
                            </div>
                        </div>

                        {/* Identity Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
                            <div className="grid md:grid-cols-1 gap-6 sm:gap-8">
                                <div className="space-y-3">
                                    <InputLabel htmlFor="unit_name" value="Nama Unit / Ruangan" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="unit_name"
                                        value={data.unit_name}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                        placeholder="Contoh: IGD, Rawat Inap A"
                                        onChange={(e) => setData('unit_name', e.target.value)}
                                        required
                                    />
                                    {errors.unit_name && <div className="text-red-500 text-xs mt-1">{errors.unit_name}</div>}
                                </div>

                                <div className="space-y-3">
                                    <InputLabel htmlFor="recipient_name" value="Nama Lengkap Pemohon" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="recipient_name"
                                        value={data.recipient_name}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                        placeholder="Jawaban Anda"
                                        onChange={(e) => setData('recipient_name', e.target.value)}
                                        required
                                    />
                                    {errors.recipient_name && <div className="text-red-500 text-xs mt-1">{errors.recipient_name}</div>}
                                </div>

                                <div className="space-y-3">
                                    <InputLabel htmlFor="request_date" value="Tanggal Permintaan" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="request_date"
                                        type="date"
                                        value={data.request_date}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 text-[15px] !rounded-lg"
                                        onChange={(e) => setData('request_date', e.target.value)}
                                        required
                                    />
                                    {errors.request_date && <div className="text-red-500 text-xs mt-1">{errors.request_date}</div>}
                                </div>
                            </div>
                        </div>

                        {/* Items Section Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-[16px] font-medium text-gray-900">Daftar Barang yang Diminta</h3>
                                <button
                                    type="button"
                                    onClick={handleAddDetail}
                                    className="w-full sm:w-auto text-gray-600 hover:text-gray-900 text-[13px] font-bold flex items-center justify-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <i className="fas fa-plus text-blue-500"></i> Tambah Item
                                </button>
                            </div>

                            <div className="space-y-10">
                                {data.details.map((detail, index) => (
                                    <div key={index} className="space-y-4 p-4 rounded-xl border border-dashed border-gray-200">
                                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                                            <div className="w-full flex-1">
                                                <InputLabel value={`Barang #${index + 1}`} className="text-gray-900 text-[14px] font-medium mb-2" />
                                                <select
                                                    value={detail.item_id}
                                                    onChange={(e) => handleDetailChange(index, 'item_id', e.target.value)}
                                                    className="w-full border-gray-200 rounded-lg shadow-sm focus:border-gray-500 focus:ring-0 text-[14px] py-2.5 px-4 bg-white"
                                                    required
                                                >
                                                    <option value="">Pilih Barang...</option>
                                                    {items.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.nama_simaset} ({item.kode_simaset})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-full sm:w-24">
                                                <div className="flex justify-between items-center mb-2">
                                                    <InputLabel value="Jumlah" className="text-gray-900 text-[14px] font-medium !mb-0" />
                                                    {data.details.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDetail(index)}
                                                            className="sm:hidden text-red-500 transition-all text-xs font-bold"
                                                        >
                                                            Hapus Item
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <TextInput
                                                        type="number"
                                                        value={detail.quantity}
                                                        className="w-full !py-2.5 !rounded-lg !px-3"
                                                        onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
                                                        required
                                                        min="1"
                                                    />
                                                    {data.details.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDetail(index)}
                                                            className="hidden sm:block text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                                                        >
                                                            <i className="fas fa-trash-alt text-[16px]"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <InputLabel value="Catatan Item" className="text-gray-900 text-[14px] font-medium mb-2" />
                                            <textarea
                                                value={detail.notes}
                                                onChange={(e) => handleDetailChange(index, 'notes', e.target.value)}
                                                className="w-full border-gray-200 rounded-lg shadow-sm focus:border-gray-500 focus:ring-0 text-[13px] py-2.5 px-4 bg-white min-h-[80px]"
                                                placeholder="Catatan khusus..."
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.details && <div className="text-red-500 text-xs mt-4">{errors.details}</div>}
                        </div>

                        {/* Signature Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <SignaturePad
                                ref={signatureRef}
                                label="Tanda Tangan Kepala Unit / Pemohon"
                            />
                            {errors.signature && <div className="text-red-500 text-xs mt-2">{errors.signature}</div>}
                        </div>

                        {/* Submit Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center py-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-800 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-900 transition-all shadow-md disabled:opacity-50"
                            >
                                {processing ? 'Mengirim...' : 'Kirim'}
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="text-gray-500 hover:text-gray-800 text-sm font-medium mt-4 md:mt-0"
                            >
                                Kosongkan formulir
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 text-center">
                <p className="text-gray-400 text-[11px]">
                    Formulir ini dibuat di dalam sistem internal SIM Inventaris.
                </p>
                <p className="text-gray-400 text-[11px] mt-1 font-bold">
                    &copy; 2026 RS Daerah Nganjuk. All Rights Reserved.
                </p>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                body { font-family: 'Telex', sans-serif; }
                input:focus, select:focus, textarea:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }
            ` }} />
        </div>
    );
}
