import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import CustomButton from '@/Components/CustomButton';

export default function Create({ items, vendors }) {
    const { data, setData, post, processing, errors } = useForm({
        vendor_id: '',
        transaction_date: new Date().toISOString().split('T')[0],
        notes: '',
        details: [{ item_id: '', quantity: 1, notes: '' }],
    });

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
        post(route('incoming-goods.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Catat Barang Masuk</h2>}
        >
            <Head title="Catat Barang Masuk" />

            <div className="">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-400 h-2.5 w-full"></div>
                            <div className="p-8">
                                <h2 className="text-3xl font-normal text-gray-900 mb-4">Transaksi Barang Masuk</h2>
                                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                    Gunakan formulir ini untuk mencatat penerimaan barang dari vendor atau supplier ke gudang inventaris.
                                </p>
                            </div>
                        </div>

                        {/* Transaction Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
                            <div className="space-y-3">
                                <InputLabel htmlFor="vendor_id" value="Pilih Vendor / Supplier" className="text-gray-900 text-[15px] font-medium" />
                                <select
                                    id="vendor_id"
                                    value={data.vendor_id}
                                    onChange={(e) => setData('vendor_id', e.target.value)}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    required
                                >
                                    <option value="">Pilih Vendor...</option>
                                    {vendors.map((v) => (
                                        <option key={v.id} value={v.id}>{v.name}</option>
                                    ))}
                                </select>
                                {errors.vendor_id && <div className="text-red-500 text-xs mt-1">{errors.vendor_id}</div>}
                            </div>

                            <div className="space-y-3">
                                <InputLabel htmlFor="transaction_date" value="Tanggal Penerimaan" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="transaction_date"
                                    type="date"
                                    value={data.transaction_date}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    onChange={(e) => setData('transaction_date', e.target.value)}
                                    required
                                />
                                {errors.transaction_date && <div className="text-red-500 text-xs mt-1">{errors.transaction_date}</div>}
                            </div>
                        </div>

                        {/* Items Section Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-[16px] font-medium text-gray-900">Daftar Barang yang Masuk</h3>
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
                                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg px-4"
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
                                                placeholder="Batch No, Expire Date, atau keterangan lainnya..."
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.details && <div className="text-red-500 text-xs mt-4">{errors.details}</div>}
                        </div>

                        {/* Global Notes Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-3">
                            <InputLabel htmlFor="notes" value="Keterangan Transaksi (Opsional)" className="text-gray-900 text-[15px] font-medium" />
                            <textarea
                                id="notes"
                                value={data.notes}
                                className="w-full border-gray-200 rounded-lg shadow-sm focus:border-gray-500 focus:ring-0 text-[15px] py-2.5 px-4 bg-white min-h-[100px]"
                                placeholder="Jawaban Anda"
                                onChange={(e) => setData('notes', e.target.value)}
                            ></textarea>
                        </div>

                        {/* Submit Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center py-6">
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gray-800 text-white px-10 py-2.5 rounded-lg font-bold hover:bg-gray-900 transition-all shadow-md disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                                </button>
                                <Link
                                    href={route('incoming-goods.index')}
                                    className="bg-white text-gray-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    Batal
                                </Link>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData({ vendor_id: '', transaction_date: new Date().toISOString().split('T')[0], notes: '', details: [{ item_id: '', quantity: 1, notes: '' }] })}
                                className="text-gray-400 hover:text-gray-800 text-sm font-medium mt-4 md:mt-0"
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
