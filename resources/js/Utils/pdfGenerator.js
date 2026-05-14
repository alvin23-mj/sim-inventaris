import html2pdf from 'html2pdf.js';

export const generateTransactionPDF = (transaction, type) => {
    if (!transaction) return;

    const isOutgoing = type === 'outgoing';
    const title = isOutgoing ? 'Bukti Pengeluaran Barang' : 'Bukti Penerimaan Barang';
    const destinationLabel = isOutgoing ? 'Tujuan / Unit' : 'Vendor';
    const referenceValue = isOutgoing ? transaction.reference : (transaction.vendor?.name || '-');

    // Create a temporary container for PDF generation
    const element = document.createElement('div');
    element.style.padding = '30px';
    element.style.fontFamily = 'Telex, sans-serif';
    element.style.color = 'black';
    element.style.backgroundColor = 'white';
    element.style.width = '750px';

    element.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid black; padding-bottom: 10px;">
            <h2 style="text-transform: uppercase; margin: 0; font-size: 20px;">RUMAH SAKIT DAERAH NGANJUK</h2>
            <h3 style="display: inline-block; border-bottom: 1px solid black; padding-bottom: 4px; margin-top: 15px; font-size: 16px; font-weight: bold; text-transform: uppercase;">${title}</h3>
            <div style="text-align: right; margin-top: 5px;">
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 12px;">
            <div style="line-height: 1.6;">
                <div style="display: flex; gap: 20px;">
                    <span style="width: 120px; font-weight: bold;">Tanggal</span>
                    <span>: ${transaction.transaction_date}</span>
                </div>
                <div style="display: flex; gap: 20px;">
                    <span style="width: 120px; font-weight: bold;">${destinationLabel}</span>
                    <span>: ${referenceValue}</span>
                </div>
            </div>
            <div style="text-align: right; line-height: 1.6;">
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; border: 1px solid black; font-size: 12px; margin-bottom: 20px;">
            <thead>
                <tr>
                    <th style="border: 1px solid black; padding: 8px; width: 40px; text-align: center; vertical-align: middle;">No</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: left; vertical-align: middle;">Nama Barang</th>
                    <th style="border: 1px solid black; padding: 8px; width: 70px; text-align: center; vertical-align: middle;">Terima</th>
                    <th style="border: 1px solid black; padding: 8px; width: 70px; text-align: center; vertical-align: middle;">Keluar</th>
                    <th style="border: 1px solid black; padding: 8px; width: 70px; text-align: center; vertical-align: middle;">Sisa</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: left; vertical-align: middle;">Catatan</th>
                </tr>
            </thead>
            <tbody>
                ${transaction.details.map((detail, index) => `
                    <tr>
                        <td style="border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle;">${index + 1}</td>
                        <td style="border: 1px solid black; padding: 8px; font-weight: 500; vertical-align: middle;">
                            ${detail.item?.nama_simaset}
                            <div style="font-size: 10px; color: #666; margin-top: 2px;">${detail.item?.kode_simaset}</div>
                        </td>
                        <td style="border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle;">${!isOutgoing ? detail.quantity : '-'}</td>
                        <td style="border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle;">${isOutgoing ? detail.quantity : '-'}</td>
                        <td style="border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle;">-</td>
                        <td style="border: 1px solid black; padding: 8px; font-size: 10px; font-style: italic; vertical-align: middle;">${detail.notes || '-'}</td>
                    </tr>
                `).join('')}
                <tr style="font-weight: bold;">
                    <td colspan="2" style="border: 1px solid black; padding: 8px; text-align: right; vertical-align: middle;">Total</td>
                    <td style="border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle;">${!isOutgoing ? transaction.details.reduce((sum, d) => sum + d.quantity, 0) : '-'}</td>
                    <td style="border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle;">${isOutgoing ? transaction.details.reduce((sum, d) => sum + d.quantity, 0) : '-'}</td>
                    <td colspan="2" style="border: 1px solid black; padding: 8px;"></td>
                </tr>
            </tbody>
        </table>

        <p style="font-size: 11px; font-style: italic; margin-top: 10px;">Keterangan : Barang-barang tersebut telah diterima dalam keadaan baik dan lengkap</p>

        <div style="margin-top: 48px; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; font-size: 12px;">
            <div>
                <p style="visibility: hidden; margin-bottom: 4px;">Placeholder</p>
                <p>Mengetahui</p>
                <div style="height: 80px;"></div>
                <p style="font-weight: bold; text-transform: uppercase; margin-top: 4px;">............................</p>
            </div>
            <div>
                <p style="visibility: hidden; margin-bottom: 4px;">Placeholder</p>
                <p>${isOutgoing ? 'Yang Mengeluarkan' : 'Yang Menyerahkan'}</p>
                <div style="height: 80px; display: flex; align-items: center; justify-content: center;">
                    ${transaction.signature ? `<img src="${transaction.signature}" style="max-height: 80px; mix-blend-multiply;" />` : ''}
                </div>
                <p style="font-weight: bold; text-transform: uppercase; margin-top: 4px;">
                    ${isOutgoing ? transaction.user?.name : (transaction.vendor?.name || '-')}
                </p>
            </div>
            <div>
                <p style="margin-bottom: 4px;">Nganjuk, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p>Yang Menerima</p>
                <div style="height: 80px; display: flex; align-items: center; justify-content: center;">
                    ${transaction.recipient_signature ? `<img src="${transaction.recipient_signature}" style="max-height: 80px; mix-blend-multiply;" />` : ''}
                </div>
                <p style="font-weight: bold; text-transform: uppercase; margin-top: 4px;">
                    ${isOutgoing ? (transaction.recipient_name || '') : transaction.user?.name}
                </p>
            </div>
        </div>
    `;

    const opt = {
        margin:       0.2,
        filename:     `${title.replace(/ /g, '_')}_${transaction.id}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 3, useCORS: true, logging: false },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
};
