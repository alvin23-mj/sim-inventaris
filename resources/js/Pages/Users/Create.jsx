import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Manajemen Pengguna</h2>}
        >
            <Head title="Tambah Pengguna" />

            <div className="py-6 min-h-[calc(100vh-120px)]">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={submit} className="space-y-4">
                        {/* Title Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-400 h-2.5 w-full"></div>
                            <div className="p-8">
                                <h2 className="text-3xl font-normal text-gray-900 mb-4">Registrasi Pengguna Baru</h2>
                                <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                    Lengkapi formulir di bawah ini untuk menambahkan administrator atau petugas baru ke dalam sistem SIM Inventaris.
                                </p>
                            </div>
                        </div>

                        {/* Name Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-4">
                            <div className="space-y-3">
                                <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-4">
                            <div className="space-y-3">
                                <InputLabel htmlFor="email" value="Alamat Email" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>
                        </div>

                        {/* Password Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-4">
                            <div className="space-y-3">
                                <InputLabel htmlFor="password" value="Kata Sandi Akun" className="text-gray-900 text-[15px] font-medium" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    className="w-full !py-2.5 bg-white border-gray-200 focus:border-gray-500 focus:ring-0 transition-all text-[15px] !rounded-lg"
                                    placeholder="Jawaban Anda"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-2">
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gray-800 text-white px-10 py-2.5 rounded-lg font-bold hover:bg-gray-900 transition-all shadow-md disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <Link
                                    href={route('users.index')}
                                    className="bg-white text-gray-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200"
                                >
                                    Batal
                                </Link>
                            </div>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="text-gray-400 hover:text-gray-800 text-sm font-medium mt-4 md:mt-0"
                            >
                                Kosongkan formulir
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                body { font-family: 'Telex', sans-serif; }
                input:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }
            ` }} />
        </AuthenticatedLayout>
    );
}
