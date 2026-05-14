import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import CustomButton from '@/Components/CustomButton';
import Pagination from '@/Components/Pagination';

export default function Index({ users }) {
    const usersData = users.data;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('users.update', editingUser.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingUser(null);
                editForm.reset();
            },
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        editForm.setData({
            name: user.name,
            email: user.email,
            password: '',
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            import('@inertiajs/react').then(({ router }) => {
                router.delete(route('users.destroy', id));
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Manajemen Pengguna</h2>}
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-6">
                <div className="mb-4 flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800">Daftar Pengguna Sistem</h3>
                    <CustomButton 
                        href={route('users.create')}
                        variant="blue"
                    >
                        <i className="fas fa-user-plus mr-2"></i> Tambah Pengguna
                    </CustomButton>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
                    <div className="overflow-x-auto p-6">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Email</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-32">Role</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                 {usersData.map((user) => (
                                     <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border border-gray-300">
                                             {user.name}
                                         </td>
                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border border-gray-300">
                                             {user.email}
                                         </td>
                                         <td className="px-6 py-4 text-center border border-gray-300">
                                             <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                                                 Administrator
                                             </span>
                                         </td>
                                         <td className="px-6 py-4 text-center border border-gray-300">
                                             <div className="flex items-center justify-center gap-4">
                                                 <button 
                                                     onClick={() => openEditModal(user)} 
                                                     className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                                     title="Edit Pengguna"
                                                 >
                                                     <i className="fas fa-edit"></i>
                                                 </button>
                                                 <button 
                                                     onClick={() => handleDelete(user.id)} 
                                                     className="bg-white text-red-500 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all border border-red-100"
                                                     title="Hapus Pengguna"
                                                 >
                                                     <i className="fas fa-trash-alt"></i>
                                                 </button>
                                             </div>
                                         </td>
                                     </tr>
                                 ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 pb-6">
                        <Pagination links={users.links} />
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={handleEdit} className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <i className="fas fa-user-edit text-blue-600"></i> Edit Pengguna
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="edit_name" value="Nama Lengkap" className="font-bold text-gray-700 mb-1" />
                            <TextInput
                                id="edit_name"
                                value={editForm.data.name}
                                className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                required
                            />
                            <InputError message={editForm.errors.name} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_email" value="Email" className="font-bold text-gray-700 mb-1" />
                            <TextInput
                                id="edit_email"
                                type="email"
                                value={editForm.data.email}
                                className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                required
                            />
                            <InputError message={editForm.errors.email} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_password" value="Password (Kosongkan jika tidak diubah)" className="font-bold text-gray-700 mb-1" />
                            <TextInput
                                id="edit_password"
                                type="password"
                                value={editForm.data.password}
                                className="mt-1 block w-full bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                onChange={(e) => editForm.setData('password', e.target.value)}
                            />
                            <InputError message={editForm.errors.password} className="mt-1" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <CustomButton variant="secondary" onClick={() => setIsEditModalOpen(false)}>Batal</CustomButton>
                        <CustomButton variant="blue" type="submit" processing={editForm.processing}>Update Pengguna</CustomButton>
                    </div>
                </form>
            </Modal>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                body { font-family: 'Telex', sans-serif; }
            ` }} />
        </AuthenticatedLayout>
    );
}
