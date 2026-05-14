import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        phone: '',
        email: '',
        contact_person: '',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vendors.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Master Vendor</h2>}
        >
            <Head title="Tambah Vendor" />

            <div className="">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-400 h-2.5 w-full"></div>
                            <div className="p-8">
                                <h2 className="text-3xl font-normal text-gray-900 mb-4">Tambah Vendor Baru</h2>
                                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                    Silakan lengkapi data vendor atau supplier di bawah ini untuk ditambahkan ke sistem.
                                </p>
                            </div>
                        </div>

                        {/* Main Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
                            <div className="space-y-3">
                                <InputLabel htmlFor="name" value="Nama Vendor / Perusahaan" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Contoh: PT. Sumber Medika"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div className="space-y-3">
                                <InputLabel htmlFor="contact_person" value="Nama Contact Person" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="contact_person"
                                    value={data.contact_person}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('contact_person', e.target.value)}
                                />
                                {errors.contact_person && <div className="text-red-500 text-xs mt-1">{errors.contact_person}</div>}
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <InputLabel htmlFor="phone" value="No. Telepon" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="phone"
                                        value={data.phone}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                        placeholder="Jawaban Anda"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                </div>

                                <div className="space-y-3">
                                    <InputLabel htmlFor="email" value="Alamat Email" className="text-gray-900 text-[15px] font-medium" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                        placeholder="Jawaban Anda"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <InputLabel htmlFor="address" value="Alamat Kantor" className="text-gray-900 text-[15px] font-medium" />
                                <textarea
                                    id="address"
                                    value={data.address}
                                    className="w-full border-gray-200 rounded-lg shadow-sm focus:border-gray-500 focus:ring-0 text-[15px] py-2.5 px-4 bg-white min-h-[100px]"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('address', e.target.value)}
                                ></textarea>
                                {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
                            </div>
                        </div>

                        {/* Notes Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-3">
                            <InputLabel htmlFor="notes" value="Catatan Tambahan (Opsional)" className="text-gray-900 text-[15px] font-medium" />
                            <textarea
                                id="notes"
                                value={data.notes}
                                className="w-full border-gray-200 rounded-lg shadow-sm focus:border-gray-500 focus:ring-0 text-[15px] py-2.5 px-4 bg-white min-h-[100px]"
                                placeholder="Jawaban Anda"
                                onChange={(e) => setData('notes', e.target.value)}
                            ></textarea>
                            {errors.notes && <div className="text-red-500 text-xs mt-1">{errors.notes}</div>}
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
                                    href={route('vendors.index')}
                                    className="flex-1 md:flex-none bg-white text-center text-gray-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    Batal
                                </Link>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData({ name: '', address: '', phone: '', email: '', contact_person: '', notes: '' })}
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
