import React from 'react'

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                    <p className="text-gray-700">{message}</p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
