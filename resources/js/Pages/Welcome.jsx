import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const baseStyle = {
    fontFamily: "'Telex', sans-serif",
    fontSize: '14px',
    color: '#202124',
};

const staticCategories = [
    {
        id: 'atk',
        name: 'Alat Tulis Kantor',
        icon: 'fa-solid fa-pen-nib',
        color: '#8B5CF6',
        bgLight: '#F5F3FF',
        desc: 'Kertas HVS, pulpen, map, tinta printer, staples, binder clip, dan kebutuhan cetakan administrasi kantor unit.'
    },
    {
        id: 'alkes',
        name: 'Alat Kesehatan',
        icon: 'fa-solid fa-stethoscope',
        color: '#F59E0B',
        bgLight: '#FEF3C7',
        desc: 'Masker medis, sarung tangan steril, kasa roll, spuit/jarum suntik, dan bahan medis habis pakai (BMHP) lainnya.'
    },
    {
        id: 'cetak',
        name: 'Cetak & Formulir',
        icon: 'fa-solid fa-print',
        color: '#10B981',
        bgLight: '#ECFDF5',
        desc: 'Formulir rekam medis, berkas penunjang medis, lembar resep, map pasien, dan lembaran resmi RSUD.'
    },
    {
        id: 'rt',
        name: 'Rumah Tangga / RT',
        icon: 'fa-solid fa-broom',
        color: '#6366F1',
        bgLight: '#EEF2FF',
        desc: 'Cairan disinfektan, sabun cuci tangan, tisu hand-towel, plastik sampah medis, dan cairan pembersih.'
    }
];

export default function Welcome({ auth = {} }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="SIM Inventaris - Portal Permintaan Barang & Inventaris RSUD Nganjuk" />

            <style>
                {`
                    /* Modern Premium Layout Styles */
                    .hero-outer {
                        background: #FFFFFF;
                        border-bottom: 1px solid #E2E8F0;
                    }
                    .hero-container {
                        max-width: 1100px;
                        margin: 0 auto;
                        padding: 60px 24px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 48px;
                        box-sizing: border-box;
                    }
                    @media (max-width: 768px) {
                        .hero-container {
                            flex-direction: column-reverse;
                            padding: 40px 16px;
                            text-align: center;
                            gap: 32px;
                        }
                    }
                    .hero-text-content {
                        flex: 1;
                        text-align: left;
                    }
                    @media (max-width: 768px) {
                        .hero-text-content {
                            text-align: center;
                        }
                    }
                    .hero-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        background: #EFF6FF;
                        color: #2563EB;
                        padding: 6px 14px;
                        border-radius: 6px;
                        font-size: 12px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        margin-bottom: 20px;
                        border: 1px solid #DBEAFE;
                    }
                    @media (max-width: 768px) {
                        .hero-badge {
                            margin: 0 auto 20px auto;
                        }
                    }
                    .hero-main-title {
                        font-size: 38px;
                        line-height: 1.25;
                        color: #0F172A;
                        margin: 0 0 16px 0;
                    }
                    @media (max-width: 768px) {
                        .hero-main-title {
                            font-size: 28px;
                        }
                    }
                    .hero-main-subtitle {
                        font-size: 15px;
                        color: #475569;
                        line-height: 1.6;
                        margin: 0 0 28px 0;
                    }
                    .hero-cta-btn {
                        background: #2563EB;
                        color: #fff;
                        border: none;
                        padding: 12px 28px;
                        font-size: 15px;
                        font-family: 'Telex', sans-serif;
                        font-weight: 500;
                        border-radius: 6px;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.1);
                        transition: all 0.2s ease;
                        text-decoration: none;
                    }
                    .hero-cta-btn:hover {
                        background: #1D4ED8;
                        transform: translateY(-1px);
                        box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.15);
                    }
                    .hero-image-side {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .hero-lottie-side {
                        width: 100%;
                        max-width: 480px;
                        aspect-ratio: 1.2;
                    }

                    /* Categories Section */
                    .cat-outer {
                        padding: 60px 0;
                        background: #F8FAFC;
                        border-bottom: 1px solid #E2E8F0;
                    }
                    .cat-container {
                        max-width: 1100px;
                        margin: 0 auto;
                        padding: 0 24px;
                        box-sizing: border-box;
                    }
                    .cat-header {
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    .cat-title {
                        font-size: 24px;
                        color: #0F172A;
                        margin: 0 0 8px 0;
                    }
                    .cat-subtitle {
                        font-size: 14px;
                        color: #64748B;
                        margin: 0;
                    }
                    .cat-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                        gap: 20px;
                    }
                    .cat-card {
                        background: #fff;
                        border: 1px solid #E2E8F0;
                        border-radius: 12px;
                        padding: 24px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        box-sizing: border-box;
                    }
                    .cat-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.04);
                    }
                    .cat-card-icon {
                        width: 48px;
                        height: 48px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                        margin-bottom: 16px;
                    }
                    .cat-card-title {
                        font-size: 21px;
                        color: #0F172A;
                        margin: 0 0 12px 0;
                    }
                    .cat-card-desc {
                        font-size: 15px;
                        color: #64748B;
                        line-height: 1.6;
                        margin: 0;
                    }
                    .cat-card-action {
                        font-size: 13px;
                        color: #2563EB;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        transition: gap 0.2s;
                        margin-top: auto;
                        padding-top: 16px;
                    }
                    .cat-card:hover .cat-card-action {
                        gap: 10px;
                    }

                    /* Steps/Tata Cara Section */
                    .steps-outer {
                        background: #F1F5F9;
                        padding: 60px 0;
                        border-bottom: 1px solid #E2E8F0;
                    }
                    .steps-container {
                        max-width: 1100px;
                        margin: 0 auto;
                        padding: 0 24px;
                        box-sizing: border-box;
                    }
                    .steps-header {
                        text-align: center;
                        margin-bottom: 48px;
                    }
                    .steps-title {
                        font-size: 24px;
                        color: #0F172A;
                        margin: 0 0 8px 0;
                    }
                    .steps-subtitle {
                        font-size: 14px;
                        color: #64748B;
                        margin: 0;
                    }
                    .steps-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                        gap: 24px;
                        position: relative;
                        margin-top: 16px;
                    }
                    .step-card {
                        background: #F8FAFC;
                        border: 1px solid #E2E8F0;
                        border-radius: 12px;
                        padding: 24px;
                        text-align: center;
                        position: relative;
                        box-sizing: border-box;
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    }
                    .step-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.03);
                    }

                    /* Barcode scan animation */
                    @keyframes scanLine {
                        0%   { top: 8px; opacity: 1; }
                        48%  { opacity: 1; }
                        50%  { top: calc(100% - 8px); opacity: 0.7; }
                        52%  { opacity: 1; }
                        100% { top: 8px; opacity: 1; }
                    }
                    .barcode-scan-wrapper {
                        position: relative;
                        width: 44px;
                        height: 44px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    .barcode-bars {
                        display: flex;
                        align-items: flex-end;
                        gap: 2px;
                        height: 30px;
                    }
                    .barcode-bars span {
                        display: block;
                        background: #2563EB;
                        border-radius: 1px;
                        width: 3px;
                    }
                    .scan-line {
                        position: absolute;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background: linear-gradient(90deg, transparent 0%, #EF4444 20%, #EF4444 80%, transparent 100%);
                        animation: scanLine 1.8s ease-in-out infinite;
                        box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
                        border-radius: 2px;
                    }
                    .step-number {
                        position: absolute;
                        top: -15px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 30px;
                        height: 30px;
                        background: #2563EB;
                        color: #fff;
                        border-radius: 6px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
                    }
                    .step-icon-wrapper {
                        width: 50px;
                        height: 50px;
                        border-radius: 10px;
                        background: #EFF6FF;
                        color: #2563EB;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        margin: 10px auto 16px auto;
                    }
                    .step-card-title {
                        font-size: 21px;
                        color: #0F172A;
                        margin: 0 0 12px 0;
                    }
                    .step-card-desc {
                        font-size: 15px;
                        color: #64748B;
                        line-height: 1.6;
                        margin: 0;
                    }

                    /* Form Outer Styles */
                    .form-outer {
                        padding: 60px 0;
                        background: #F0F4F9;
                    }
                    .form-container {
                        max-width: 760px;
                        margin: 0 auto;
                        padding: 0 24px;
                        box-sizing: border-box;
                    }

                    /* Responsive Navbar Styles */
                    .nav-middle {
                        display: flex;
                        align-items: center;
                        gap: 24px;
                    }
                    .nav-right {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    .nav-hamburger {
                        display: none;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: #475569;
                        font-size: 18px;
                        padding: 8px;
                    }
                    .mobile-dropdown-menu {
                        display: none;
                        background: #fff;
                        border-bottom: 1px solid #E2E8F0;
                        padding: 16px;
                        flex-direction: column;
                        gap: 16px;
                        position: absolute;
                        top: 60px;
                        left: 0;
                        right: 0;
                        z-index: 40;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    }
                    @media (max-width: 768px) {
                        .nav-middle {
                            display: none;
                        }
                        .nav-right {
                            display: none;
                        }
                        .nav-hamburger {
                            display: block;
                        }
                        .mobile-dropdown-menu.active {
                            display: flex;
                        }
                    }

                    /* Input styling overrides to avoid browser native focus rings and enforce borders */
                    input:focus, select:focus, textarea:focus {
                        outline: none !important;
                        border-color: #3B82F6 !important;
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
                    }
                `}
            </style>

            <div style={{ ...baseStyle, minHeight: '100vh', background: '#F0F4F9' }}>
                {/* Header Navbar */}
                <header style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid #E5E7EB',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                        {/* Left: Logo & Brand */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '34px', height: '34px',
                                borderRadius: '6px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                                overflow: 'hidden'
                            }}>
                                <img src="/images/logo_rsud.jpeg" alt="RSUD Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ width: '1px', height: '24px', background: '#E2E8F0', margin: '0 4px' }}></div>
                            <div>
                                <div style={{ fontWeight: '400', fontSize: '18px', color: '#1E293B', lineHeight: 1 }}>SIM Inventaris</div>
                            </div>
                        </div>

                        {/* Middle: Links */}
                        <div className="nav-middle">
                            <Link
                                href={route('requests.create')}
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '15px',
                                    color: '#475569',
                                    fontFamily: "'Telex', sans-serif",
                                    padding: '8px 4px',
                                    transition: 'color 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
                                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                            >
                                Form Permintaan
                            </Link>
                        </div>

                        {/* Right: Auth Dashboard / Login */}
                        <div className="nav-right">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    style={{
                                        padding: '8px 16px',
                                        background: '#2563EB',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '15px',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.15)',
                                        fontFamily: "'Telex', sans-serif",
                                        borderRadius: '6px',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = '#1D4ED8';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = '#2563EB';
                                        e.currentTarget.style.transform = 'none';
                                    }}
                                >
                                    <i className="fa-solid fa-chart-line"></i>
                                    Dashboard Admin
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #E2E8F0',
                                        color: '#475569',
                                        textDecoration: 'none',
                                        fontSize: '15px',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontFamily: "'Telex', sans-serif",
                                        borderRadius: '6px',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = '#F8FAFC';
                                        e.currentTarget.style.borderColor = '#CBD5E1';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = '#E2E8F0';
                                    }}
                                >
                                    <i className="fa-solid fa-lock"></i>
                                    Login Admin
                                </Link>
                            )}
                        </div>

                        {/* Hamburger Button */}
                        <button
                            className="nav-hamburger"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Navigation Menu"
                        >
                            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                        </button>

                        {/* Mobile Dropdown Panel */}
                        <div className={`mobile-dropdown-menu ${mobileMenuOpen ? 'active' : ''}`}>
                            <Link
                                href={route('requests.create')}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '15px',
                                    color: '#475569',
                                    fontFamily: "'Telex', sans-serif",
                                    padding: '8px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textAlign: 'left',
                                    width: '100%',
                                }}
                            >
                                <i className="fa-solid fa-file-signature"></i>
                                Form Permintaan
                            </Link>
                            <hr style={{ border: 0, borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    style={{
                                        padding: '10px',
                                        background: '#2563EB',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '15px',
                                        textAlign: 'center',
                                        fontFamily: "'Telex', sans-serif",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <i className="fa-solid fa-chart-line"></i>
                                    Dashboard Admin
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #E2E8F0',
                                        color: '#475569',
                                        textDecoration: 'none',
                                        fontSize: '15px',
                                        textAlign: 'center',
                                        fontFamily: "'Telex', sans-serif",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        borderRadius: '6px',
                                    }}
                                >
                                    <i className="fa-solid fa-lock"></i>
                                    Login Admin
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="hero-outer">
                    <div className="hero-container">
                        <div className="hero-text-content">
                            <span className="hero-badge">
                                Portal Permintaan Inventaris RSUD
                            </span>
                            <h1 className="hero-main-title">
                                Permintaan Stok Barang Cepat & Teratur
                            </h1>
                            <p className="hero-main-subtitle">
                                Ajukan permintaan alat tulis kantor, alat kesehatan habis pakai, cetakan formulir, maupun kebutuhan logistik rumah tangga ruangan Anda dengan mudah. Proses persetujuan cepat dan terpantau.
                            </p>
                            <Link
                                href="/permintaan"
                                className="hero-cta-btn"
                            >
                                Buat Permintaan Baru <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                        <div className="hero-image-side">
                            <div className="hero-lottie-side">
                                <lottie-player
                                    src="/inventory.json"
                                    background="transparent"
                                    speed="1"
                                    loop
                                    autoplay
                                ></lottie-player>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Steps Section */}
                <section className="steps-outer">
                    <div className="steps-container">
                        <div className="steps-header">
                            <h2 className="steps-title">Alur Proses Permintaan Barang</h2>
                            <p className="steps-subtitle">Tata cara lengkap pengajuan permintaan barang inventaris di RSUD Nganjuk</p>
                        </div>

                        <div className="steps-grid">
                            {/* Step 1 */}
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <div className="step-icon-wrapper">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <h3 className="step-card-title">Hubungi SIMRS</h3>
                                <p className="step-card-desc">
                                    Peminta dari unit kerja menghubungi petugas SIMRS melalui telepon atau datang langsung untuk mengajukan kebutuhan barang.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <div className="step-icon-wrapper">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <h3 className="step-card-title">Pengecekan Stok</h3>
                                <p className="step-card-desc">
                                    Petugas SIMRS mengecek ketersediaan barang di gudang inventaris. Jika tersedia, proses dilanjutkan ke tahap berikutnya.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <div className="step-icon-wrapper" style={{ background: '#EFF6FF', overflow: 'visible' }}>
                                    <div className="barcode-scan-wrapper">
                                        <div className="barcode-bars">
                                            <span style={{ height: '24px' }}></span>
                                            <span style={{ height: '16px' }}></span>
                                            <span style={{ height: '28px' }}></span>
                                            <span style={{ height: '20px' }}></span>
                                            <span style={{ height: '30px' }}></span>
                                            <span style={{ height: '14px' }}></span>
                                            <span style={{ height: '26px' }}></span>
                                            <span style={{ height: '18px' }}></span>
                                            <span style={{ height: '22px' }}></span>
                                        </div>
                                        <div className="scan-line"></div>
                                    </div>
                                </div>
                                <h3 className="step-card-title">Scan Barcode</h3>
                                <p className="step-card-desc">
                                    Barang yang tersedia di-scan menggunakan barcode scanner untuk pencatatan identitas unik dan pelacakan distribusi secara akurat.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="step-card">
                                <div className="step-number">4</div>
                                <div className="step-icon-wrapper">
                                    <i className="fa-solid fa-file-pen"></i>
                                </div>
                                <h3 className="step-card-title">Isi Formulir</h3>
                                <p className="step-card-desc">
                                    Peminta mengisi formulir permintaan secara lengkap, termasuk identitas unit, daftar barang, dan tanda tangan kepala unit.
                                </p>
                            </div>

                            {/* Step 5 */}
                            <div className="step-card">
                                <div className="step-number">5</div>
                                <div className="step-icon-wrapper">
                                    <i className="fa-solid fa-box-open"></i>
                                </div>
                                <h3 className="step-card-title">Barang Diterima</h3>
                                <p className="step-card-desc">
                                    Barang diserahkan kepada peminta dan dicatat sebagai keluar dari gudang. Permintaan selesai dan terdokumentasi sistem.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Deep Dark Premium Footer */}
                <footer style={{
                    background: '#0F172A',
                    color: '#94A3B8',
                    padding: '64px 24px 32px',
                    fontFamily: "'Telex', sans-serif",
                    borderTop: '1px solid #1E293B',
                }}>
                    <div style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '40px',
                        marginBottom: '48px',
                    }}>
                        {/* Column 1: Brand Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '8px',
                                    background: '#FFFFFF',
                                    padding: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}>
                                    <img src="/images/logo_rsud.jpeg" alt="RSUD Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontSize: '20px', fontWeight: 'normal', color: '#F1F5F9' }}>SIM Inventaris</span>
                            </div>
                            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94A3B8', margin: 0 }}>
                                Sistem Informasi Manajemen Inventaris & Logistik RS Daerah Nganjuk terpadu untuk mendukung kelancaran operasional pelayanan kesehatan di seluruh unit secara cepat, transparan, dan profesional.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <a href="https://rsud.nganjukkab.go.id" target="_blank" rel="noopener noreferrer" style={{
                                    width: '32px', height: '32px', borderRadius: '50%', background: '#1E293B',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F1F5F9',
                                    textDecoration: 'none', transition: 'all 0.2s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.transform = 'none'; }}>
                                    <i className="fa-solid fa-globe" style={{ fontSize: '14px' }}></i>
                                </a>
                                <a href="tel:0358321818" style={{
                                    width: '32px', height: '32px', borderRadius: '50%', background: '#1E293B',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F1F5F9',
                                    textDecoration: 'none', transition: 'all 0.2s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#10B981'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.transform = 'none'; }}>
                                    <i className="fa-solid fa-phone" style={{ fontSize: '14px' }}></i>
                                </a>
                                <a href="mailto:rsudnganjuk@gmail.com" style={{
                                    width: '32px', height: '32px', borderRadius: '50%', background: '#1E293B',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F1F5F9',
                                    textDecoration: 'none', transition: 'all 0.2s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.transform = 'none'; }}>
                                    <i className="fa-solid fa-envelope" style={{ fontSize: '14px' }}></i>
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Tautan Pintar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 style={{ fontSize: '15px', color: '#F1F5F9', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tautan Pintar</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li>
                                    <Link
                                        href={route('requests.create')}
                                        style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none', transition: 'color 0.15s', fontFamily: "'Telex', sans-serif" }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                                    >
                                        Form Permintaan Barang
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('login')} style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none', transition: 'color 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                                        Login Administrasi
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Contact & Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 style={{ fontSize: '15px', color: '#F1F5F9', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kontak & Alamat</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: '1.6' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <i className="fa-solid fa-location-dot" style={{ color: '#F1F5F9', marginTop: '4px' }}></i>
                                    <span>Jl. Dr. Soetomo No. 62 Nganjuk, Jawa Timur, Indonesia</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <i className="fa-solid fa-phone" style={{ color: '#F1F5F9', marginTop: '2px' }}></i>
                                    <span>(0358) 321818</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <i className="fa-solid fa-envelope" style={{ color: '#F1F5F9', marginTop: '2px' }}></i>
                                    <span>rsudnganjuk@nganjukkab.go.id</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer bottom */}
                    <div style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        paddingTop: '32px',
                        borderTop: '1px solid #1E293B',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: '#64748B',
                        gap: '16px',
                    }}>
                        <span>&copy; {new Date().getFullYear()} RS Daerah Nganjuk. Hak Cipta Dilindungi Undang-Undang.</span>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Kebijakan Privasi</a>
                            <a href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Syarat & Ketentuan</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
