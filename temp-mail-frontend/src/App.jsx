import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [email, setEmail] = useState('');
  const [showInbox, setShowInbox] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  const generateEmail = async () => {
    const res = await axios.get('http://localhost:7070/generate-temp-email');
    setEmail(res.data.email);
    setShowInbox(false);
    setInbox([]);
  };

  const deleteTempEmailID = async () => {
    if (!email) return;
    const id = email.split('@')[0];
    try {
      await axios.delete(`http://localhost:7070/delete-id/${id}`);
      setEmail('');
      setInbox([]);
      setShowInbox(false);
      setSelectedMail(null);
      alert('🗑️ Email ID and inbox deleted.');
    } catch (err) {
      alert('❌ Failed to delete ID.');
    }
  };

  const openInbox = async () => {
    if (!email) return;
    const id = email.split('@')[0];
    const res = await axios.get(`http://localhost:7070/inbox/${id}`);
    setInbox(res.data);
    setShowInbox(true);
  };

  const deleteInbox = async () => {
    const id = email.split('@')[0];
    await axios.delete(`http://localhost:7070/inbox/${id}`);
    setInbox([]);
  };

  const deleteSingleEmail = async (index) => {
    const id = email.split('@')[0];
    try {
      await axios.delete(`http://localhost:7070/inbox/${id}/${index}`);
      const updatedInbox = [...inbox];
      updatedInbox.splice(index, 1);
      setInbox(updatedInbox);
    } catch (err) {
      alert('❌ Failed to delete this email.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#0d0d0d] overflow-x-hidden text-gray-100">
      {/* 🔳 Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[#0d0d0d] bg-[radial-gradient(circle_at_1px_1px,#222_1px,transparent_0)] [background-size:16px_16px]" />

      {/* 🔮 Gradient glow */}
      <div className="absolute top-0 w-full h-60 bg-gradient-to-r from-purple-800 via-gray-900 to-indigo-800 opacity-50 blur-2xl -z-10" />

      {/* 🔱 Logo */}
      <div className="text-center pt-12 mb-10 leading-tight z-10 font-orbitron">
        <h1 className="text-7xl md:text-8xl font-extrabold text-white tracking-wide drop-shadow-[4px_4px_0px_#000] transition duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_20px_#00ffff]">
          Ghost
        </h1>
        <h2 className="text-6xl md:text-7xl font-extrabold text-red-600 tracking-wide drop-shadow-[4px_4px_0px_#000] transition duration-300 hover:text-red-400 hover:drop-shadow-[0_0_20px_#ff0000]">
          Drop
        </h2>
      </div>

      {/* Main Panel */}
      <main className="w-full max-w-5xl px-6 pb-16">
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Email Display + Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.div
              onClick={() => {
                if (email) {
                  navigator.clipboard.writeText(email);
                  alert('📋 Email copied to clipboard!');
                }
              }}
              className="flex-1 bg-[#2a2a2a] rounded-xl px-4 py-3 font-mono text-lg shadow-inner border border-gray-700 cursor-pointer hover:bg-[#3a3a3a] transition"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {email || 'Your temp email will appear here...'}
            </motion.div>

            <motion.button
              onClick={generateEmail}
              className="f95-btn bg-blue-600 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
            >
              Generate
            </motion.button>

            <motion.button
              onClick={openInbox}
              disabled={!email}
              className="f95-btn bg-green-600 hover:bg-green-700"
              whileHover={{ scale: 1.05 }}
            >
              Inbox
            </motion.button>

            <motion.button
              onClick={deleteInbox}
              disabled={!email || inbox.length === 0}
              className="f95-btn bg-red-600 hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
            >
              Clear Inbox
            </motion.button>

            <motion.button
              onClick={deleteTempEmailID}
              disabled={!email}
              className="f95-btn bg-yellow-600 hover:bg-yellow-700"
              whileHover={{ scale: 1.05 }}
            >
              Delete ID
            </motion.button>
          </div>

          {/* Inbox Section */}
          <AnimatePresence mode="wait">
            {showInbox && (
              <motion.div
                key="inbox-panel"
                className="bg-[#252525] border border-gray-700 rounded-xl p-6"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
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
                        className="cursor-pointer bg-[#1f1f1f] rounded-lg p-4 border border-gray-700 hover:border-gray-500 transition relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <div className="font-semibold text-lg">{mail.subject || 'No Subject'}</div>
                        <div className="text-sm text-gray-300 mt-1 truncate">{mail.body}</div>
                        <div className="text-xs text-gray-500 mt-2">From: {mail.from}</div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent modal from opening
                            deleteSingleEmail(i);
                          }}
                          className="absolute top-2 right-3 text-red-500 text-sm hover:underline"
                        >
                          🗑️ Delete
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

      {/* 🧾 Modal for Selected Mail */}
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
