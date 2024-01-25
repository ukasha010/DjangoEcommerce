import React from "react";

const UploadItem = () => {
  return (
    <div className="pt-[5rem] h-[38rem] items-center justify-center text-center">
      <input type="file" multiple onChange={handleAddImage} className="mb-4" />
      <button
        onClick={handleCancelAddImages}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default UploadItem;
