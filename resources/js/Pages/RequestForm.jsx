import React, { useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SignaturePad from '@/Components/SignaturePad';

export default function RequestForm({ items = [], auth = {} }) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        unit_name: '',
        recipient_name: '',
        request_date: new Date().toISOString().split('T')[0],
        notes: '',
        signature: null,
        details: [{ item_id: '', quantity: 1, notes: '' }],
    });

    const signatureRef = useRef(null);

    const handleAddDetail = () => {
        setData('details', [...data.details, { item_id: '', quantity: 1, notes: '' }]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = data.details.filter((_, i) => i !== index);
        setData('details', newDetails);
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...data.details];
        newDetails[index][field] = value;
        setData('details', newDetails);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const latestSignature = signatureRef.current?.getSignature();
        transform((data) => ({ ...data, signature: latestSignature }));
        post(route('requests.store'), {
            onSuccess: () => {
                reset();
                signatureRef.current?.clear();
                alert('Permintaan barang berhasil dikirim!');
            }
        });
    };

    return (
        <>
            <Head title="Formulir Permintaan Barang - SIM Inventaris RSUD Nganjuk" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Telex&display=swap');
                * { box-sizing: border-box; }
                body { font-family: 'Telex', sans-serif; background: #F0F4F9; margin: 0; }
                input:focus, select:focus, textarea:focus {
                    outline: none !important;
                    border-color: #3B82F6 !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
                }
            `}</style>

            {/* Sticky Navbar */}
            <header style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid #E5E7EB',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}>
                <div style={{
                    maxWidth: '1100px', margin: '0 auto', padding: '0 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    height: '60px', boxSizing: 'border-box'
                }}>
                    {/* Brand */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                            <img src="/images/logo_rsud.jpeg" alt="RSUD Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ width: '1px', height: '24px', background: '#E2E8F0', margin: '0 4px' }}></div>
                        <span style={{ fontSize: '18px', color: '#1E293B', fontFamily: "'Telex', sans-serif" }}>SIM Inventaris</span>
                    </Link>

                    {/* Right */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link
                            href="/"
                            style={{
                                padding: '8px 16px', border: '1px solid #E2E8F0', color: '#475569',
                                textDecoration: 'none', fontSize: '14px', borderRadius: '6px',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                fontFamily: "'Telex', sans-serif", transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                        >
                            <i className="fa-solid fa-arrow-left"></i> Kembali
                        </Link>
                        {auth.user && (
                            <Link
                                href={route('dashboard')}
                                style={{
                                    padding: '8px 16px', background: '#2563EB', color: '#fff',
                                    textDecoration: 'none', fontSize: '14px', borderRadius: '6px',
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    fontFamily: "'Telex', sans-serif", transition: 'all 0.2s',
                                    boxShadow: '0 4px 6px -1px rgba(37,99,235,0.15)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#1D4ED8'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#2563EB'; }}
                            >
                                <i className="fa-solid fa-chart-line"></i> Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Page Header */}
            <div style={{
                background: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0',
                padding: '40px 24px',
            }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '32px', color: '#0F172A', margin: '0 0 12px 0' }}>
                        Formulir Permintaan Barang
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
                        Silakan lengkapi data pemohon, daftar barang beserta jumlah stok yang dibutuhkan, serta pengesahan tanda tangan digital kepala unit di bawah ini.
                    </p>
                </div>
            </div>

            {/* Form Body */}
            <div style={{ padding: '40px 24px', minHeight: 'calc(100vh - 300px)' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Identity Card */}
                        <div style={{
                            background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px',
                            padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            display: 'flex', flexDirection: 'column', gap: '24px'
                        }}>
                            <h2 style={{ fontSize: '16px', color: '#0F172A', margin: '0 0 4px 0', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
                                Informasi Pemohon
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <InputLabel htmlFor="unit_name" value="Nama Unit / Ruangan Kerja" />
                                <TextInput
                                    id="unit_name" value={data.unit_name}
                                    className="w-full !py-2.5 !rounded-lg border-gray-200"
                                    placeholder="Contoh: IGD, Rawat Inap Melati, Poli Gigi"
                                    onChange={e => setData('unit_name', e.target.value)} required
                                />
                                {errors.unit_name && <div style={{ color: '#DC2626', fontSize: '13px' }}><i className="fa-solid fa-triangle-exclamation"></i> {errors.unit_name}</div>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <InputLabel htmlFor="recipient_name" value="Nama Lengkap Pemohon (Penanggung Jawab)" />
                                <TextInput
                                    id="recipient_name" value={data.recipient_name}
                                    className="w-full !py-2.5 !rounded-lg border-gray-200"
                                    placeholder="Nama terang pemohon"
                                    onChange={e => setData('recipient_name', e.target.value)} required
                                />
                                {errors.recipient_name && <div style={{ color: '#DC2626', fontSize: '13px' }}><i className="fa-solid fa-triangle-exclamation"></i> {errors.recipient_name}</div>}
                            </div>


                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <InputLabel htmlFor="request_date" value="Tanggal Pengajuan Permintaan" />
                                <TextInput
                                    id="request_date" type="date" value={data.request_date}
                                    className="w-full !py-2.5 !rounded-lg border-gray-200"
                                    onChange={e => setData('request_date', e.target.value)} required
                                />
                                {errors.request_date && <div style={{ color: '#DC2626', fontSize: '13px' }}><i className="fa-solid fa-triangle-exclamation"></i> {errors.request_date}</div>}
                            </div>
                        </div>

                        {/* Items Card */}
                        <div style={{
                            background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px',
                            padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
                                <h2 style={{ fontSize: '16px', color: '#0F172A', margin: 0 }}>
                                    Daftar Barang Permintaan
                                </h2>
                                <button
                                    type="button" onClick={handleAddDetail}
                                    style={{
                                        background: '#EFF6FF', color: '#2563EB', border: '1px solid #DBEAFE',
                                        padding: '8px 16px', borderRadius: '6px', fontSize: '13px',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                        fontFamily: "'Telex', sans-serif", transition: 'all 0.15s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#DBEAFE'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#EFF6FF'}
                                >
                                    <i className="fa-solid fa-plus"></i> Tambah Item
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {data.details.map((detail, index) => (
                                    <div key={index} style={{
                                        padding: '20px', background: '#F8FAFC',
                                        borderRadius: '12px', border: '1px dashed #CBD5E1',
                                        display: 'flex', flexDirection: 'column', gap: '16px'
                                    }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                            {/* Select */}
                                            <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <InputLabel value={`Pilih Barang #${index + 1}`} />
                                                <select
                                                    value={detail.item_id}
                                                    onChange={e => handleDetailChange(index, 'item_id', e.target.value)}
                                                    style={{
                                                        width: '100%', border: '1px solid #E2E8F0', borderRadius: '8px',
                                                        padding: '10px 14px', background: '#FFFFFF', fontSize: '14px',
                                                        fontFamily: "'Telex', sans-serif", height: '42px', color: '#1E293B',
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                                    }}
                                                    required
                                                >
                                                    <option value="">Pilih Barang...</option>
                                                    {items.map(item => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.nama_simaset} (Stok: {item.stok} | {item.kode_simaset})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Quantity */}
                                            <div style={{ width: '120px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <InputLabel value="Jumlah" />
                                                    {data.details.length > 1 && (
                                                        <button type="button" onClick={() => handleRemoveDetail(index)}
                                                            style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '11px', cursor: 'pointer', fontFamily: "'Telex', sans-serif" }}>
                                                            Hapus
                                                        </button>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <TextInput
                                                        type="number" value={detail.quantity} min="1"
                                                        className="w-full !py-2.5 !rounded-lg border-gray-200"
                                                        onChange={e => handleDetailChange(index, 'quantity', e.target.value)} required
                                                    />
                                                    {data.details.length > 1 && (
                                                        <button type="button" onClick={() => handleRemoveDetail(index)}
                                                            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px', transition: 'color 0.15s' }}
                                                            onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                                                            onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                                                            <i className="fa-solid fa-trash-can" style={{ fontSize: '15px' }}></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <InputLabel value="Catatan Detail Item (Opsional)" />
                                            <textarea
                                                value={detail.notes || ''} onChange={e => handleDetailChange(index, 'notes', e.target.value)}
                                                style={{
                                                    width: '100%', border: '1px solid #E2E8F0', borderRadius: '8px',
                                                    padding: '10px 14px', fontSize: '13px', fontFamily: "'Telex', sans-serif",
                                                    minHeight: '60px', color: '#1E293B',
                                                }}
                                                placeholder="Contoh: Ukuran L, warna hitam, untuk printer unit IGD, dll."
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.details && <div style={{ color: '#DC2626', fontSize: '13px', marginTop: '12px' }}><i className="fa-solid fa-triangle-exclamation"></i> {errors.details}</div>}
                        </div>

                        {/* Signature Card */}
                        <div style={{
                            background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px',
                            padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                        }}>
                            <SignaturePad ref={signatureRef} label="Tanda Tangan Elektronik Pemohon / Kepala Unit" />
                            {errors.signature && <div style={{ color: '#DC2626', fontSize: '13px', marginTop: '8px' }}><i className="fa-solid fa-triangle-exclamation"></i> {errors.signature}</div>}
                        </div>

                        {/* Submit Bar */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '12px 8px', gap: '16px' }}>
                            <button
                                type="submit" disabled={processing}
                                style={{
                                    background: '#0F172A', color: '#FFFFFF', padding: '12px 32px',
                                    fontSize: '15px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                    boxShadow: '0 4px 6px -1px rgba(15,23,42,0.15)',
                                    fontFamily: "'Telex', sans-serif", transition: 'all 0.2s',
                                    opacity: processing ? 0.6 : 1
                                }}
                                onMouseEnter={e => { if (!processing) e.currentTarget.style.background = '#1E293B'; }}
                                onMouseLeave={e => { if (!processing) e.currentTarget.style.background = '#0F172A'; }}
                            >
                                {processing
                                    ? <span><i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Mengirim...</span>
                                    : <span>Kirim Permintaan <i className="fa-solid fa-paper-plane" style={{ marginLeft: '8px' }}></i></span>
                                }
                            </button>
                            <button
                                type="button" onClick={() => reset()}
                                style={{
                                    background: 'none', border: 'none', color: '#64748B', fontSize: '14px',
                                    cursor: 'pointer', fontFamily: "'Telex', sans-serif", transition: 'color 0.15s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
                                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
                            >
                                Kosongkan formulir
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Simple Footer */}
            <footer style={{
                background: '#0F172A', color: '#64748B',
                padding: '24px', textAlign: 'center', fontSize: '12px',
                fontFamily: "'Telex', sans-serif",
            }}>
                &copy; {new Date().getFullYear()} RS Daerah Nganjuk. Hak Cipta Dilindungi Undang-Undang.
            </footer>
        </>
    );
}
