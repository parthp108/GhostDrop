import { deleteAllInbox, deleteTempId } from "../api";

function EmailActions({ emailId, onInboxChange }) {
  const handleDeleteAll = async () => {
    const ok = await deleteAllInbox(emailId);
    if (ok) {
      alert("✅ Inbox cleared!");
      onInboxChange(emailId);
    }
  };

  const handleDeleteId = async () => {
    const sure = window.confirm("Are you sure you want to delete this temp ID?");
    if (!sure) return;

    const ok = await deleteTempId(emailId);
    if (ok) {
      localStorage.removeItem("temp-email");
      alert("✅ ID deleted. Refresh to generate new.");
      window.location.reload();
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={handleDeleteAll}
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm"
      >
        🧹 Clear Inbox
      </button>

      <button
        onClick={handleDeleteId}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        ❌ Remove ID
      </button>
    </div>
  );
}

export default EmailActions;
