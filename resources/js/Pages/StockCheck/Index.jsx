import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CustomButton from '@/Components/CustomButton';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Pagination from '@/Components/Pagination';

export default function Index({ items, currentMonth }) {
    const itemsData = items.data;
    const [search, setSearch] = useState('');

    const filteredItems = itemsData.filter(item => 
        item.kode_simaset.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_simaset.toLowerCase().includes(search.toLowerCase())
    );
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Stok Barang');

        // 1. Tambahkan Judul & Info
        worksheet.mergeCells('A1:H1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'LAPORAN STOK BARANG';
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:H2');
        const periodCell = worksheet.getCell('A2');
        periodCell.value = `Periode: ${currentMonth}`;
        periodCell.alignment = { horizontal: 'center' };

        worksheet.mergeCells('A3:H3');
        const timeCell = worksheet.getCell('A3');
        timeCell.value = `Diunduh pada: ${new Date().toLocaleString('id-ID')}`;
        timeCell.alignment = { horizontal: 'center' };

        // 2. Tambahkan Header Tabel
        const headerRow = worksheet.addRow(["No", "Kode Simaset", "Nama Barang", "Stok Awal", "Masuk", "Keluar", "Stok Akhir", "Satuan"], 5);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2563EB' } // Blue-600
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // 3. Tambahkan Data
        filteredItems.forEach((item, index) => {
            const row = worksheet.addRow([
                index + 1,
                item.kode_simaset,
                item.nama_simaset,
                item.stok_awal,
                item.masuk || 0,
                item.keluar || 0,
                item.stok_akhir,
                item.satuan
            ]);
            row.eachCell((cell, colNumber) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                // Align numbers to center
                if ([1, 4, 5, 6, 7, 8].includes(colNumber)) {
                    cell.alignment = { horizontal: 'center' };
                }
            });
        });

        // 4. Atur Lebar Kolom
        worksheet.getColumn(1).width = 5;  // No
        worksheet.getColumn(2).width = 25; // Kode
        worksheet.getColumn(3).width = 40; // Nama
        worksheet.getColumn(4).width = 12; // Awal
        worksheet.getColumn(5).width = 12; // Masuk
        worksheet.getColumn(6).width = 12; // Keluar
        worksheet.getColumn(7).width = 12; // Akhir
        worksheet.getColumn(8).width = 12; // Satuan

        // 5. Simpan File
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Laporan_Stok_${currentMonth}.xlsx`);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Cek Stok Barang</h2>}
        >
            <Head title="Cek Stok" />

            <div className="py-6">
                <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm gap-4 no-print">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <input 
                            type="month" 
                            value={currentMonth}
                            onChange={(e) => window.location.href = route('stock-check.index', { month: e.target.value })}
                            className="border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-0 text-[14px] font-bold py-2.5 px-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
                        />

                        <div className="relative w-full sm:w-64">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input 
                                type="text" 
                                placeholder="Cari Kode atau Nama..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-0 text-[14px] py-2.5 w-full transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <CustomButton 
                            onClick={handleExport}
                            variant="success"
                            className="w-full justify-center"
                        >
                            <i className="fas fa-file-excel mr-2"></i> Ekspor Excel
                        </CustomButton>
                    </div>
                </div>

                <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
                    <div className="p-4 sm:p-6 overflow-x-auto scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300 whitespace-nowrap sm:whitespace-normal">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">No</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Kode Simaset</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Nama Barang (Simaset)</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase bg-gray-50">Stok Awal</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-green-600 border border-gray-300 uppercase bg-green-50/30">Masuk</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-red-600 border border-gray-300 uppercase bg-red-50/30">Keluar</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase bg-blue-50">Stok Akhir</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Satuan</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredItems.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
                                        <td className="px-4 py-3 border border-gray-300 text-center text-gray-500">{items.from + index}</td>
                                        <td className="px-4 py-3 border border-gray-300 font-bold text-gray-900">{item.kode_simaset}</td>
                                        <td className="px-4 py-3 border border-gray-300">
                                            <div className="font-medium text-gray-900">{item.nama_simaset}</div>
                                        </td>
                                        <td className="px-4 py-3 border border-gray-300 text-center font-semibold text-gray-600 bg-gray-50/30">{item.stok_awal}</td>
                                        <td className="px-4 py-3 border border-gray-300 text-center font-semibold text-green-600 bg-green-50/10">{item.masuk || '-'}</td>
                                        <td className="px-4 py-3 border border-gray-300 text-center font-semibold text-red-600 bg-red-50/10">{item.keluar || '-'}</td>
                                        <td className="px-4 py-3 border border-gray-300 text-center font-bold text-blue-700 bg-blue-50/30">{item.stok_akhir}</td>
                                        <td className="px-4 py-3 border border-gray-300 text-center text-gray-500">{item.satuan}</td>
                                    </tr>
                                ))}
                                {filteredItems.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-10 text-center text-gray-500 italic">
                                            {search ? 'Tidak ada barang yang cocok dengan pencarian Anda.' : 'Belum ada data barang.'}
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
        </AuthenticatedLayout>
    );
}
