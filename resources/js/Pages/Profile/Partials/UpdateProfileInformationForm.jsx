import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import CustomButton from '@/Components/CustomButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <i className="fas fa-user-circle text-blue-600"></i>
                    Informasi Profil
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Perbarui nama dan alamat email akun Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-700 font-bold mb-1" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-all"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-gray-700 font-bold mb-1" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-all"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                        <p className="text-sm text-yellow-800">
                            Email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-bold underline hover:text-yellow-900"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-bold text-green-600">
                                Link verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <CustomButton type="submit" variant="blue" processing={processing}>
                        <i className="fas fa-save mr-2"></i> Simpan Perubahan
                    </CustomButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-green-600">
                            <i className="fas fa-check-circle mr-1"></i> Profil Berhasil Diperbarui
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
