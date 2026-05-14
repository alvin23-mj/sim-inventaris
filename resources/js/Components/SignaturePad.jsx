import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import CustomButton from '@/Components/CustomButton';

const SignaturePad = forwardRef(({ onSave, onClear, label = "Tanda Tangan Digital" }, ref) => {
    const sigCanvas = useRef(null);
    const [preview, setPreview] = React.useState(null);

    useImperativeHandle(ref, () => ({
        getSignature: () => {
            if (sigCanvas.current.isEmpty()) return null;
            return sigCanvas.current.toDataURL('image/png');
        },
        clear: () => {
            clear();
        }
    }));

    const clear = () => {
        sigCanvas.current.clear();
        setPreview(null);
        if (onClear) onClear();
    };

    const handleEnd = () => {
        const dataURL = sigCanvas.current.toDataURL('image/png');
        setPreview(dataURL);
        if (onSave) onSave(dataURL);
    };

    const saveManual = () => {
        if (sigCanvas.current.isEmpty()) {
            alert('Tanda tangan masih kosong!');
            return;
        }
        const dataURL = sigCanvas.current.toDataURL('image/png');
        setPreview(dataURL);
        if (onSave) onSave(dataURL);
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-tight">
                    {label}
                </label>
                {preview && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold animate-pulse">
                        <i className="fas fa-check-circle mr-1"></i> Tersimpan
                    </span>
                )}
            </div>
            
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-white overflow-hidden group hover:border-blue-400 transition-colors shadow-inner">
                <SignatureCanvas 
                    ref={sigCanvas}
                    canvasProps={{
                        style: { width: '100%', height: '200px' },
                        className: "cursor-crosshair"
                    }}
                    onEnd={handleEnd}
                />
                
                {!preview && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="text-center">
                            <i className="fas fa-pen-nib text-4xl mb-2"></i>
                            <p className="text-xs font-bold uppercase">Goreskan Tanda Tangan</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-center">
                <button 
                    type="button"
                    onClick={clear}
                    className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-red-100"
                >
                    <i className="fas fa-eraser"></i> Hapus & Tanda Tangan Ulang
                </button>
                
                {preview && (
                    <div className="flex items-center gap-2 text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 animate-pulse">
                        <i className="fas fa-check-circle"></i> Tanda tangan terekam otomatis
                    </div>
                )}
            </div>
        </div>
    );
});

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
