import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import CustomButton from '@/Components/CustomButton';
import Pagination from '@/Components/Pagination';

export default function Index({ items }) {
    const itemsData = items.data;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);



    const editForm = useForm({
        kode_simaset: '',
        nama_simaset: '',
        nama_riil: '',
        satuan: 'Pcs',
        stok_awal: 0,
        is_active: true,
    });



    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('item-codes.update', editingItem.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingItem(null);
                editForm.reset();
            },
        });
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        editForm.setData({
            kode_simaset: item.kode_simaset,
            nama_simaset: item.nama_simaset,
            nama_riil: item.nama_riil,
            satuan: item.satuan,
            stok_awal: item.stok_awal,
            is_active: !!item.is_active,
        });
        setIsEditModalOpen(true);
    };

    const handleToggleStatus = (id) => {
        import('@inertiajs/react').then(({ router }) => {
            router.post(route('item-codes.toggle-status', id));
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kode barang ini?')) {
            import('@inertiajs/react').then(({ router }) => {
                router.delete(route('item-codes.destroy', id));
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Master Kode Barang</h2>}
        >
            <Head title="Kode Barang" />

            <div className="py-6">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm gap-4">
                    <h3 className="text-lg font-medium text-gray-800">Daftar Kode Barang Simaset</h3>
                    <CustomButton
                        href={route('item-codes.create')}
                        variant="blue"
                        className="w-full sm:w-auto justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i> Tambah Kode Barang
                    </CustomButton>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
                    <div className="overflow-x-auto p-4 sm:p-6 scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300 whitespace-nowrap">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Kode Simaset</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama Simaset</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama Riil</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-24">Satuan</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-32">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {itemsData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 border border-gray-300 text-center text-gray-900 text-sm font-bold">{item.kode_simaset}</td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <div className="font-semibold text-sm">{item.nama_simaset}</div>
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <div className="text-sm text-gray-600 font-bold">{item.nama_riil}</div>
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300 text-center text-sm text-gray-500">{item.satuan}</td>
                                        <td className="px-6 py-4 border border-gray-300 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(item.id)}
                                                className={`flex items-center gap-2 mx-auto px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all shadow-sm ${item.is_active
                                                        ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200'
                                                    }`}
                                            >
                                                <i className={`fas ${item.is_active ? 'fa-check-circle' : 'fa-times-circle'} text-sm`}></i>
                                                {item.is_active ? 'Aktif' : 'Nonaktif'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                                    title="Edit Kode Barang"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-white text-red-500 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all border border-red-100"
                                                    title="Hapus Kode Barang"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {itemsData.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500 italic border border-gray-300">
                                            Belum ada data barang.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 pb-6">
                        <Pagination links={items.links} />
                    </div>
                </div>
            </div>



            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={handleEdit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Edit Kode Barang</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_kode_simaset" value="Kode Barang Simaset" />
                            <TextInput
                                id="edit_kode_simaset"
                                value={editForm.data.kode_simaset}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('kode_simaset', e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_nama_simaset" value="Nama Barang Simaset" />
                            <TextInput
                                id="edit_nama_simaset"
                                value={editForm.data.nama_simaset}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('nama_simaset', e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_nama_riil" value="Nama Barang Riil" />
                            <TextInput
                                id="edit_nama_riil"
                                value={editForm.data.nama_riil}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('nama_riil', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_satuan" value="Satuan" />
                            <TextInput
                                id="edit_satuan"
                                value={editForm.data.satuan}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('satuan', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_stok_awal" value="Stok Awal Sistem" />
                            <TextInput
                                id="edit_stok_awal"
                                type="number"
                                value={editForm.data.stok_awal}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('stok_awal', e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-2 flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="edit_is_active"
                                checked={editForm.data.is_active}
                                onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            />
                            <InputLabel htmlFor="edit_is_active" value="Status Aktif (Tampil di Form Permintaan)" className="!mb-0 cursor-pointer" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <CustomButton variant="secondary" onClick={() => setIsEditModalOpen(false)}>Batal</CustomButton>
                        <CustomButton variant="blue" type="submit" processing={editForm.processing}>Update</CustomButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
