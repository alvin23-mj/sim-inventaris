import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-8">
                <h2 className="text-2xl font-normal text-gray-900">Lupa Password?</h2>
                <p className="text-gray-500 text-sm mt-2">
                    Beritahu kami alamat email Anda dan kami akan mengirimkan tautan reset password.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full !rounded-lg border-gray-200 focus:border-gray-500 focus:ring-0"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Masukkan alamat email..."
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition-all shadow-md disabled:opacity-50"
                    >
                        {processing ? 'Mengirim...' : 'Kirim Link Reset'}
                    </button>
                    
                    <Link
                        href={route('login')}
                        className="block text-center mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Kembali ke Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
