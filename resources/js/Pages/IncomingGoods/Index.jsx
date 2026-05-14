import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CustomButton from '@/Components/CustomButton';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Pagination from '@/Components/Pagination';

export default function Index({ transactions, currentMonth }) {
    const transactionsData = transactions.data;
    const [search, setSearch] = useState('');

    const filteredTransactions = transactionsData.filter(tx => {
        const searchLower = search.toLowerCase();
        const vendorMatch = tx.vendor?.name.toLowerCase().includes(searchLower);
        const itemMatch = tx.details.some(d => 
            d.item.nama_simaset.toLowerCase().includes(searchLower) ||
            d.item.kode_simaset.toLowerCase().includes(searchLower)
        );
        return vendorMatch || itemMatch;
    });
    const exportToCSV = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Barang Masuk');

        // 1. Judul
        worksheet.mergeCells('A1:F1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'LAPORAN BARANG MASUK';
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:F2');
        const periodCell = worksheet.getCell('A2');
        periodCell.value = `Periode: ${currentMonth}`;
        periodCell.alignment = { horizontal: 'center' };

        worksheet.mergeCells('A3:F3');
        const timeCell = worksheet.getCell('A3');
        timeCell.value = `Diunduh pada: ${new Date().toLocaleString('id-ID')}`;
        timeCell.alignment = { horizontal: 'center' };

        // 2. Header
        const headerRow = worksheet.addRow(["Tanggal", "Vendor", "Daftar Barang", "Total Qty", "Petugas", "Catatan"], 5);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF2563EB' }
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        // 3. Data
        filteredTransactions.forEach(tx => {
            const row = worksheet.addRow([
                tx.transaction_date,
                tx.vendor?.name || 'Unknown',
                tx.details.map(d => `${d.item.nama_simaset} (${d.quantity} ${d.item.satuan})`).join('\n'),
                tx.details.reduce((sum, d) => sum + d.quantity, 0),
                tx.user.name,
                tx.notes || ''
            ]);
            row.eachCell((cell, colNumber) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
                cell.alignment = { vertical: 'middle', wrapText: true };
                if (colNumber === 4) cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        // 4. Width
        worksheet.getColumn(1).width = 15;
        worksheet.getColumn(2).width = 25;
        worksheet.getColumn(3).width = 45;
        worksheet.getColumn(4).width = 12;
        worksheet.getColumn(5).width = 20;
        worksheet.getColumn(6).width = 30;

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Barang_Masuk_${currentMonth}.xlsx`);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Barang Masuk</h2>}
        >
            <Head title="Barang Masuk" />

            <div className="py-6">
                <div className="mb-4 flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm gap-4 no-print">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <input 
                            type="month" 
                            value={currentMonth}
                            onChange={(e) => window.location.href = route('incoming-goods.index', { month: e.target.value })}
                            className="border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-0 text-[14px] font-bold py-2.5 px-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
                        />

                        <div className="relative w-full sm:w-64">
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input 
                                type="text" 
                                placeholder="Cari Vendor atau Barang..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-0 text-[14px] py-2.5 w-full transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <CustomButton 
                            onClick={exportToCSV}
                            variant="success"
                            className="justify-center"
                        >
                            <i className="fas fa-file-excel mr-2"></i> Ekspor
                        </CustomButton>
                        <CustomButton 
                            href={route('incoming-goods.create')}
                            variant="blue"
                            className="justify-center"
                        >
                            <i className="fas fa-plus mr-2"></i> Catat Barang Masuk
                        </CustomButton>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
                    <div className="overflow-x-auto p-4 sm:p-6 scrollbar-hide">
                        <table className="min-w-full border-collapse border border-gray-300 whitespace-nowrap">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Tanggal</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Vendor</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Daftar Barang</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Total Qty</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Petugas</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border border-gray-300 uppercase">Catatan</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 border border-gray-300 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium border border-gray-300">
                                            {tx.transaction_date}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                                            <div className="font-bold">{tx.vendor ? tx.vendor.name : 'Unknown'}</div>
                                            {tx.vendor && <div className="text-sm text-gray-400">{tx.vendor.contact_person}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 border border-gray-300">
                                            <table className="w-full border-collapse">
                                                <tbody>
                                                    {tx.details.map((detail) => (
                                                        <tr key={detail.id} className="border-b border-gray-50 last:border-0">
                                                            <td className="py-1 pr-2 text-gray-900 font-medium">{detail.item.nama_simaset}</td>
                                                            <td className="py-1 px-2 text-center font-bold text-blue-600 w-12">{detail.quantity}</td>
                                                            <td className="py-1 pl-2 text-gray-400 text-sm w-16">{detail.item.satuan}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm font-bold text-blue-600 border border-gray-300">
                                            {tx.details.reduce((sum, d) => sum + d.quantity, 0)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                                            {tx.user.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 italic max-w-xs truncate border border-gray-300">
                                            {tx.notes || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center border border-gray-300">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => window.open(route('incoming-goods.print', tx.id), '_blank')}
                                                    className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                                    title="Cetak Bukti"
                                                >
                                                    <i className="fas fa-print"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-gray-500 italic">
                                            {search ? 'Tidak ada transaksi yang cocok dengan pencarian Anda.' : 'Belum ada data transaksi di bulan ini.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 pb-6">
                        <Pagination links={transactions.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
