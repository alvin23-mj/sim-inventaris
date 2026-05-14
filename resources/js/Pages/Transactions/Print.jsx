import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import CustomButton from '@/Components/CustomButton';
import { generateTransactionPDF } from '@/Utils/pdfGenerator';

export default function Print({ transaction, type }) {
    if (!transaction) return null;

    const isOutgoing = type === 'outgoing';
    const title = isOutgoing ? 'Bukti Pengeluaran Barang' : 'Bukti Penerimaan Barang';
    const destinationLabel = isOutgoing ? 'Tujuan / Unit' : 'Vendor';
    const referenceValue = isOutgoing ? transaction.reference : (transaction.vendor?.name || '-');

    const handleDownload = () => {
        const element = document.getElementById('print-area');
        const opt = {
            margin:       0.2,
            filename:     `${title.replace(/ /g, '_')}_${transaction.id}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 3, useCORS: true, logging: false },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        import('html2pdf.js').then((html2pdf) => {
            html2pdf.default().set(opt).from(element).save();
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 print:p-0 print:bg-white">
            <Head title={`Cetak - ${transaction.id}`} />
            
            {/* Toolbar - hidden when printing */}
            <div className="max-w-[750px] mx-auto mb-8 flex justify-between items-center print:hidden">
                <div className="flex gap-2">
                    <CustomButton variant="secondary" onClick={() => window.close()}>
                        Tutup Tab
                    </CustomButton>
                </div>
                <CustomButton variant="blue" onClick={handleDownload}>
                    <i className="fas fa-download mr-2"></i> Unduh PDF
                </CustomButton>
            </div>

            {/* Document Area */}
            <div id="print-area" className="w-[750px] bg-white p-[30px] mx-auto text-black shadow-xl print:shadow-none print:mx-0" style={{ fontFamily: 'Telex, sans-serif' }}>
                {/* Header Template */}
                <div className="text-center mb-8 border-b-2 border-black pb-2">
                    <h2 className="text-[20px] font-bold uppercase">RUMAH SAKIT DAERAH NGANJUK</h2>
                    <h3 className="text-[16px] font-bold mt-4 inline-block border-b border-black pb-1 uppercase">{title}</h3>
                    <div className="text-right mt-2">
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex justify-between mb-8 text-[12px]">
                    <div className="space-y-1">
                        <div className="flex gap-4">
                            <span className="w-32 font-bold">Tanggal</span>
                            <span>: {transaction.transaction_date}</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-32 font-bold">{destinationLabel}</span>
                            <span>: {referenceValue}</span>
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                    </div>
                </div>

                {/* Main Table */}
                <table className="w-full border-collapse border border-black text-[12px] mb-4">
                    <thead>
                        <tr>
                            <th className="border border-black p-2 w-10 text-center font-bold align-middle">No</th>
                            <th className="border border-black p-2 text-left font-bold align-middle">Nama Barang</th>
                            <th className="border border-black p-2 w-20 text-center font-bold align-middle">Terima</th>
                            <th className="border border-black p-2 w-20 text-center font-bold align-middle">Keluar</th>
                            <th className="border border-black p-2 w-20 text-center font-bold align-middle">Sisa</th>
                            <th className="border border-black p-2 text-left font-bold align-middle">Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction.details.map((detail, index) => (
                            <tr key={index}>
                                <td className="border border-black p-2 text-center align-middle">{index + 1}</td>
                                <td className="border border-black p-2 font-medium align-middle">
                                    {detail.item?.nama_simaset}
                                    <div className="text-[10px] text-gray-500 mt-0.5 font-normal">{detail.item?.kode_simaset}</div>
                                </td>
                                <td className="border border-black p-2 text-center align-middle">
                                    {!isOutgoing ? detail.quantity : '-'}
                                </td>
                                <td className="border border-black p-2 text-center align-middle">
                                    {isOutgoing ? detail.quantity : '-'}
                                </td>
                                <td className="border border-black p-2 text-center align-middle">-</td>
                                <td className="border border-black p-2 text-[10px] italic align-middle">
                                    {detail.notes || '-'}
                                </td>
                            </tr>
                        ))}
                        <tr className="font-bold">
                            <td colSpan="2" className="border border-black p-2 text-right align-middle">Total</td>
                            <td className="border border-black p-2 text-center align-middle">{!isOutgoing ? transaction.details.reduce((sum, d) => sum + d.quantity, 0) : '-'}</td>
                            <td className="border border-black p-2 text-center align-middle">{isOutgoing ? transaction.details.reduce((sum, d) => sum + d.quantity, 0) : '-'}</td>
                            <td colSpan="2" className="border border-black p-2"></td>
                        </tr>
                    </tbody>
                </table>

                {/* Note */}
                <p className="mt-2 text-[11px] italic">Keterangan : Barang-barang tersebut telah diterima dalam keadaan baik dan lengkap</p>

                {/* Signatures */}
                <div className="mt-12 grid grid-cols-3 text-[12px] text-center">
                    <div>
                        <p className="invisible mb-1">Placeholder</p>
                        <p>Mengetahui</p>
                        <div className="h-20"></div>
                        <p className="font-bold uppercase mt-1">............................</p>
                    </div>
                    <div>
                        <p className="invisible mb-1">Placeholder</p>
                        <p>{isOutgoing ? 'Yang Mengeluarkan' : 'Yang Menyerahkan'}</p>
                        <div className="h-20 flex items-center justify-center">
                            {transaction.signature ? (
                                <img src={transaction.signature} alt="Signature" className="max-h-20 mix-blend-multiply" />
                            ) : (
                                <div className="h-20"></div>
                            )}
                        </div>
                        <p className="font-bold uppercase mt-1">
                            {isOutgoing ? transaction.user?.name : (transaction.vendor?.name || '-')}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1">Nganjuk, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p>Yang Menerima</p>
                        <div className="h-20 flex items-center justify-center">
                            {transaction.recipient_signature ? (
                                <img src={transaction.recipient_signature} alt="Recipient Signature" className="max-h-20 mix-blend-multiply" />
                            ) : (
                                <div className="h-20"></div>
                            )}
                        </div>
                        <p className="font-bold uppercase mt-1">
                            {isOutgoing ? (transaction.recipient_name || '') : transaction.user?.name}
                        </p>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                @media print {
                    body { background: white; }
                    .print-hidden { display: none; }
                }
            ` }} />
        </div>
    );
}
