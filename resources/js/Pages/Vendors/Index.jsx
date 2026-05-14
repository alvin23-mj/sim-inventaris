import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import CustomButton from '@/Components/CustomButton';
import Pagination from '@/Components/Pagination';

export default function Index({ vendors }) {
    const vendorsData = vendors.data;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState(null);



    const editForm = useForm({
        name: '',
        address: '',
        phone: '',
        email: '',
        contact_person: '',
        notes: '',
    });



    const handleEdit = (e) => {
        e.preventDefault();
        editForm.put(route('vendors.update', editingVendor.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingVendor(null);
                editForm.reset();
            },
        });
    };

    const openEditModal = (vendor) => {
        setEditingVendor(vendor);
        editForm.setData({
            name: vendor.name,
            address: vendor.address || '',
            phone: vendor.phone || '',
            email: vendor.email || '',
            contact_person: vendor.contact_person || '',
            notes: vendor.notes || '',
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus vendor ini?')) {
            useForm().delete(route('vendors.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Master Vendor</h2>}
        >
            <Head title="Vendors" />

            <div className="py-6">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm gap-4">
                    <h3 className="text-lg font-medium text-gray-800">Daftar Vendor / Supplier</h3>
                    <CustomButton 
                        href={route('vendors.create')}
                        variant="blue"
                        className="w-full sm:w-auto justify-center"
                    >
                        <i className="fas fa-plus mr-2"></i> Tambah Vendor
                    </CustomButton>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
                    <div className="overflow-x-auto p-4 sm:p-6 scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300 whitespace-nowrap">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama Vendor</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Contact Person</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Telepon / Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Alamat</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Catatan</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {vendorsData.map((vendor) => (
                                    <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border border-gray-300">
                                            {vendor.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border border-gray-300">
                                            {vendor.contact_person || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 border border-gray-300">
                                            <div>{vendor.phone || '-'}</div>
                                            <div className="text-sm text-gray-400">{vendor.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate border border-gray-300">
                                            {vendor.address || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 border border-gray-300 italic">
                                            {vendor.notes || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <div className="flex items-center justify-center gap-4">
                                                <button 
                                                    onClick={() => openEditModal(vendor)} 
                                                    className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                                    title="Edit Vendor"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(vendor.id)} 
                                                    className="bg-white text-red-500 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all border border-red-100"
                                                    title="Hapus Vendor"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {vendorsData.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500 italic">
                                            Belum ada data vendor.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 pb-6">
                        <Pagination links={vendors.links} />
                    </div>
                </div>
            </div>



            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={handleEdit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Edit Vendor</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_name" value="Nama Vendor" />
                            <TextInput
                                id="edit_name"
                                value={editForm.data.name}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_contact_person" value="Contact Person" />
                            <TextInput
                                id="edit_contact_person"
                                value={editForm.data.contact_person}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('contact_person', e.target.value)}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_phone" value="No. Telepon" />
                            <TextInput
                                id="edit_phone"
                                value={editForm.data.phone}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('phone', e.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_email" value="Email" />
                            <TextInput
                                id="edit_email"
                                type="email"
                                value={editForm.data.email}
                                className="mt-1 block w-full"
                                onChange={(e) => editForm.setData('email', e.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_address" value="Alamat" />
                            <textarea
                                id="edit_address"
                                value={editForm.data.address}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={(e) => editForm.setData('address', e.target.value)}
                                rows="2"
                            ></textarea>
                        </div>
                        <div className="col-span-2">
                            <InputLabel htmlFor="edit_notes" value="Catatan Tambahan" />
                            <textarea
                                id="edit_notes"
                                value={editForm.data.notes}
                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                onChange={(e) => editForm.setData('notes', e.target.value)}
                                rows="2"
                            ></textarea>
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
