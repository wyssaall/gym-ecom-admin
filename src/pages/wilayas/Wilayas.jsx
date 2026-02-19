import React, { useState, useEffect } from "react";
import wilayaService from "../../services/WilayaService";
import ConfirmModal from "../../components/ConfirmModal";

function Wilayas() {
  const [wilayas, setWilayas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [wilayaToEdit, setWilayaToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wilayaToDelete, setWilayaToDelete] = useState(null);

  const [addForm, setAddForm] = useState({ name: "", code: "", shippingPrice: "" });
  const [editForm, setEditForm] = useState({ name: "", code: "", shippingPrice: "" });

  const fetchWilayas = async () => {
    try {
      setLoading(true);
      const data = await wilayaService.getAll();
      setWilayas(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des wilayas.");
      setWilayas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWilayas();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await wilayaService.create({
        name: addForm.name.trim(),
        code: addForm.code ? Number(addForm.code) : undefined,
        shippingPrice: addForm.shippingPrice !== "" ? Number(addForm.shippingPrice) : 0,
      });
      setAddForm({ name: "", code: "", shippingPrice: "" });
      setShowAddModal(false);
      fetchWilayas();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Erreur création");
    }
  };

  const handleEditClick = (w) => {
    setWilayaToEdit(w);
    setEditForm({
      name: w.name || "",
      code: w.code != null ? w.code : "",
      shippingPrice: w.shippingPrice != null ? w.shippingPrice : "",
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!wilayaToEdit) return;
    try {
      await wilayaService.update(wilayaToEdit._id, {
        name: editForm.name.trim(),
        code: editForm.code !== "" ? Number(editForm.code) : undefined,
        shippingPrice: editForm.shippingPrice !== "" ? Number(editForm.shippingPrice) : 0,
      });
      setShowEditModal(false);
      setWilayaToEdit(null);
      fetchWilayas();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Erreur mise à jour");
    }
  };

  const handleDeleteClick = (w) => {
    setWilayaToDelete(w);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!wilayaToDelete) return;
    try {
      await wilayaService.delete(wilayaToDelete._id);
      setWilayas(wilayas.filter((x) => x._id !== wilayaToDelete._id));
      setShowDeleteModal(false);
      setWilayaToDelete(null);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Erreur suppression");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <p className="text-gray-600">Chargement des wilayas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Wilayas</h1>
        <p className="text-gray-500 text-sm">Gérer les wilayas et les prix de livraison (DA)</p>
      </div>

      {error && (
        <p className="mb-4 text-center text-red-600">{error}</p>
      )}

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix livraison (DA)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wilayas.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                  Aucune wilaya. Ajoutez-en une.
                </td>
              </tr>
            ) : (
              wilayas.map((w) => (
                <tr key={w._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{w.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{w.code != null ? w.code : "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{w.shippingPrice ?? 0} DA</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(w)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition shadow-sm"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(w)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition shadow-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition font-medium shadow-md"
        >
          Ajouter une wilaya
        </button>
      </div>

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nouvelle wilaya</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="ex: Alger"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code (optionnel)</label>
                <input
                  type="number"
                  value={addForm.code}
                  onChange={(e) => setAddForm((f) => ({ ...f, code: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="ex: 16"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix livraison (DA) *</label>
                <input
                  type="number"
                  min="0"
                  value={addForm.shippingPrice}
                  onChange={(e) => setAddForm((f) => ({ ...f, shippingPrice: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="ex: 800"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEditModal && wilayaToEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Modifier la wilaya</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code (optionnel)</label>
                <input
                  type="number"
                  value={editForm.code}
                  onChange={(e) => setEditForm((f) => ({ ...f, code: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix livraison (DA) *</label>
                <input
                  type="number"
                  min="0"
                  value={editForm.shippingPrice}
                  onChange={(e) => setEditForm((f) => ({ ...f, shippingPrice: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setWilayaToEdit(null); }}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setWilayaToDelete(null); }}
        onConfirm={confirmDelete}
        title="Supprimer la wilaya"
        message={`Voulez-vous vraiment supprimer "${wilayaToDelete?.name}" ?`}
      />
    </div>
  );
}

export default Wilayas;
