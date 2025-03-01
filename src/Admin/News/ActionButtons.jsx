const ActionButtons = ({ id, onApprove, onReject }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={() => onApprove(id)}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
      >
        Publish
      </button>
      <button
        onClick={() => onReject(id)}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  );
};

export default ActionButtons;
