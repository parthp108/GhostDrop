import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7070';

export default function App() {
  const [email, setEmail] = useState('');
  const [showInbox, setShowInbox] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  const generateEmail = async () => {
    try {
      console.log("API Base URL:", API);

      const res = await axios.get(`${API}/generate-temp-email`);
      setEmail(res.data.email);
      setInbox([]);
      setShowInbox(false);
    } catch (err) {
      alert('❌ Failed to generate email');
    }
  };

  const openInbox = async () => {
    try {
      if (!email) return;
      const id = email.split('@')[0];
      const res = await axios.get(`${API}/inbox/${id}`);
      setInbox(res.data);
      setShowInbox(true);
    } catch (err) {
      alert('❌ Could not fetch inbox');
    }
  };

  const deleteInbox = async () => {
    try {
      const id = email.split('@')[0];
      await axios.delete(`${API}/inbox/${id}`);
      setInbox([]);
    } catch (err) {
      alert('❌ Failed to clear inbox');
    }
  };

  const deleteTempEmailID = async () => {
    try {
      const id = email.split('@')[0];
      await axios.delete(`${API}/delete-id/${id}`);
      setEmail('');
      setInbox([]);
      setShowInbox(false);
      setSelectedMail(null);
      alert('🗑️ Email ID and inbox deleted.');
    } catch (err) {
      alert('❌ Failed to delete ID.');
    }
  };

  const deleteSingleEmail = async (index) => {
    try {
      const id = email.split('@')[0];
      await axios.delete(`${API}/inbox/${id}/${index}`);
      const updatedInbox = [...inbox];
      updatedInbox.splice(index, 1);
      setInbox(updatedInbox);
    } catch (err) {
      alert('❌ Failed to delete this email.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#0d0d0d] text-gray-100">
      <div className="absolute inset-0 -z-10 bg-[#0d0d0d] bg-[radial-gradient(circle_at_1px_1px,#222_1px,transparent_0)] [background-size:16px_16px]" />
      <div className="absolute top-0 w-full h-60 bg-gradient-to-r from-purple-800 via-gray-900 to-indigo-800 opacity-50 blur-2xl -z-10" />

      <div className="text-center pt-12 mb-10 font-orbitron">
        <h1 className="text-7xl font-extrabold text-white hover:text-cyan-300">
          Ghost
        </h1>
        <h2 className="text-6xl font-extrabold text-red-600 hover:text-red-400">
          Drop
        </h2>
      </div>

      <main className="w-full max-w-5xl px-6 pb-16">
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <motion.div
              onClick={() => email && navigator.clipboard.writeText(email)}
              className="flex-1 bg-[#2a2a2a] rounded-xl px-4 py-3 font-mono text-lg shadow-inner border border-gray-700 cursor-pointer hover:bg-[#3a3a3a]"
            >
              {email || 'Your temp email will appear here...'}
            </motion.div>

            <motion.button onClick={generateEmail} className="f95-btn bg-blue-600 hover:bg-blue-700">
              Generate
            </motion.button>

            <motion.button onClick={openInbox} disabled={!email} className="f95-btn bg-green-600 hover:bg-green-700">
              Inbox
            </motion.button>

            <motion.button onClick={deleteInbox} disabled={!email || inbox.length === 0} className="f95-btn bg-red-600 hover:bg-red-700">
              Clear Inbox
            </motion.button>

            <motion.button onClick={deleteTempEmailID} disabled={!email} className="f95-btn bg-yellow-600 hover:bg-yellow-700">
              Delete ID
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {showInbox && (
              <motion.div
                key="inbox"
                className="bg-[#252525] border border-gray-700 rounded-xl p-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                {inbox.length === 0 ? (
                  <p className="text-gray-400 italic">No emails yet.</p>
                ) : (
                  <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
                    {inbox.map((mail, i) => (
                      <motion.li
                        key={i}
                        onClick={() => setSelectedMail(mail)}
                        className="bg-[#1f1f1f] border border-gray-700 p-4 rounded-lg relative cursor-pointer hover:border-gray-500"
                      >
                        <div className="font-semibold text-lg">{mail.subject || 'No Subject'}</div>
                        <div className="text-sm text-gray-300 truncate">{mail.body}</div>
                        <div className="text-xs text-gray-500 mt-2">From: {mail.from}</div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSingleEmail(i);
                          }}
                          className="absolute top-2 right-3 text-red-500 text-sm hover:underline"
                        >
                          🗑️
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {selectedMail && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] border border-gray-600 p-6 rounded-xl max-w-xl w-full space-y-4 relative">
            <button
              onClick={() => setSelectedMail(null)}
              className="absolute top-2 right-3 text-white text-2xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white">{selectedMail.subject || 'No Subject'}</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{selectedMail.body}</p>
            <div className="text-sm text-gray-500">From: {selectedMail.from}</div>
          </div>
        </div>
      )}
    </div>
  );
}
