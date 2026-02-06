const EditModal = ({
  isOpen,
  type,
  isCreating,
  formData,
  customFields,
  updating,
  onClose,
  onInputChange,
  onAddCustomField,
  onRemoveCustomField,
  onUpdateCustomField,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-xl">
        {/* Header - Fixed */}
        <div className="shrink-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h3 className="text-xl font-bold text-gray-900">
            {isCreating ? 'Create New' : 'Edit'} {type === 'service' ? 'Service Offering' : 'Add-on'}
          </h3>
          <button
            onClick={onClose}
            disabled={updating}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Name and Price Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {type === 'service' ? 'Service' : 'Add-on'} Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  disabled={updating}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-gray-50 text-sm"
                  placeholder={`Enter ${type === 'service' ? 'service' : 'add-on'} name`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={onInputChange}
                  disabled={updating}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-gray-50 text-sm"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onInputChange}
                disabled={updating}
                rows="2"
                className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-gray-50 resize-none text-sm"
                placeholder="Enter description"
              />
            </div>

            {/* Service-specific fields */}
            {type === 'service' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Delivery Type
                  </label>
                  <input
                    type="text"
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={onInputChange}
                    disabled={updating}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-gray-50 text-sm"
                    placeholder="e.g., Digital, Physical, Dry + processed vocals"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Min Time (days)
                  </label>
                  <input
                    type="number"
                    name="deliveryTimeMin"
                    value={formData.deliveryTimeMin}
                    onChange={onInputChange}
                    disabled={updating}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-gray-50 text-sm"
                    placeholder="Min"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Max Time (days)
                  </label>
                  <input
                    type="number"
                    name="deliveryTimeMax"
                    value={formData.deliveryTimeMax}
                    onChange={onInputChange}
                    disabled={updating}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-gray-50 text-sm"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>
            )}

            {/* Custom Fields Section - For both services and add-ons */}
            <div className="border-t pt-5 mt-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-bold text-gray-900">
                  Custom Fields
                </h4>
                <button
                  type="button"
                  onClick={onAddCustomField}
                  disabled={updating}
                  className="px-4 py-2 bg-primary text-white rounded-full text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  + Add Field
                </button>
              </div>
              
              {customFields.length > 0 ? (
                <div className="space-y-2.5">
                  {customFields.map((field, index) => (
                    <div key={index} className="flex gap-2.5 items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={field.key}
                          onChange={(e) => onUpdateCustomField(index, 'key', e.target.value)}
                          disabled={updating}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-white text-sm"
                          placeholder="Field name"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => onUpdateCustomField(index, 'value', e.target.value)}
                          disabled={updating}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:bg-white text-sm"
                          placeholder="Value"
                          maxLength="200"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveCustomField(index)}
                        disabled={updating}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 shrink-0"
                        title="Remove field"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-gray-500 text-xs font-medium">No custom fields</p>
                  <p className="text-gray-400 text-xs mt-0.5">Click "Add Field" button above</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Action Buttons - Fixed */}
        <div className="shrink-0 bg-gray-50 border-t px-6 py-4 flex gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            disabled={updating}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={updating}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {updating ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isCreating ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              isCreating ? 'Create' : 'Update'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
