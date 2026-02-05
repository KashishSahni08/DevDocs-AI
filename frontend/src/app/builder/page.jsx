"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { marked } from "marked";
import { Plus, Send, Pencil, Trash2 } from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function Builder() {
  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [templates, setTemplates] = useState([]);
const [loadingTemplates, setLoadingTemplates] = useState(true);

const [showTemplateModal, setShowTemplateModal] = useState(false);
const [editingTemplate, setEditingTemplate] = useState(null);

const [tplName, setTplName] = useState("");
const [tplPrompt, setTplPrompt] = useState("");
const defaultQuickTemplates = [
  "API documentation ",
  "Getting Started Guide",
  "Document a React component",
  "Component Library Guide",
];
  const API = "http://localhost:5000";

  /* ================= USER ================= */

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);
  const fetchTemplates = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/template`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTemplates(res.data);
  } catch (err) {
    console.error("Template fetch error:", err);
  } finally {
    setLoadingTemplates(false);
  }
};

useEffect(() => {
  fetchTemplates();
}, []);
const deleteTemplate = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/template/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTemplates();
  } catch (err) {
    alert("Delete failed");
  }
};
const saveTemplate = async () => {
  const token = localStorage.getItem("token");

  try {
    if (editingTemplate) {
      await axios.put(
        `${API}/template/${editingTemplate._id}`,
        { name: tplName, prompt: tplPrompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      await axios.post(
        `${API}/template`,
        { name: tplName, prompt: tplPrompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    setShowTemplateModal(false);
    fetchTemplates();
  } catch (err) {
    alert("Save failed");
  }
};

  /* ================= HISTORY ================= */

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
  marked.setOptions({
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  });
}, []);

  async function loadHistory() {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/chat`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setHistory(Array.isArray(res.data) ? res.data : []);
  }

  /* ================= AUTOSCROLL ================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ================= CREATE CHAT ================= */

  async function newChat() {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API}/chat`,
      { title: "New Documentation" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setActiveChat(res.data._id);
    setMessages([]);

    loadHistory();

    return res.data._id;
  }

  /* ================= OPEN CHAT ================= */

  async function openChat(id) {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/chat/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setActiveChat(id);
    setMessages(res.data.messages || []);
  }

  /* ================= SEND ================= */

  async function sendMessage() {
    if (!input.trim()) return;

    let chatId = activeChat;
    if (!chatId) chatId = await newChat();

    const token = localStorage.getItem("token");

    const userMsg = { role: "user", content: input };

    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/doc/generate-docs`,
        { prompt: input, chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMsg = {
        role: "assistant",
        content: res.data.generateDocs,
      };

      setMessages((p) => [...p, aiMsg]);

     // save user message first
await axios.post(
  `${API}/chat/${chatId}/message`,
  { message: userMsg },
  { headers: { Authorization: `Bearer ${token}` } }
);

// save ai message
await axios.post(
  `${API}/chat/${chatId}/message`,
  { message: aiMsg },
  { headers: { Authorization: `Bearer ${token}` } }
);
      loadHistory();
    } finally {
      setLoading(false);
    }
  }


  /* ================= UPLOAD ================= */

  async function handleUpload(e) {
    const files = [...e.target.files];
    if (!files.length) return;

    const token = localStorage.getItem("token");

    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));

    const res = await axios.post(`${API}/upload`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setInput(res.data.combinedText || "");
  }

  /* ================= RENAME ================= */

  async function renameChat(id) {
  const title = prompt("Rename chat:");
  if (!title) return;

  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `${API}/chat/${id}`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await loadHistory();
  } catch (err) {
    console.error("Rename failed:", err);
    alert("Rename failed");
  }
}

  /* ================= DELETE ================= */

  async function deleteChat(id) {
  if (!confirm("Delete chat?")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/chat/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (activeChat === id) {
      setActiveChat(null);
      setMessages([]);
    }

    await loadHistory();
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Delete failed");
  }
}

  /* ================= SAVE ================= */

  function saveHTML() {
    const html = marked.parse(
      messages
        .filter((m) => m.role === "assistant")
        .map((m) => m.content)
        .join("\n\n")
    );

    const blob = new Blob([html], { type: "text/html" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "documentation.html";
    a.click();
  }

  function savePDF() {
    const win = window.open("", "_blank");

    win.document.write(
      marked.parse(
        messages
          .filter((m) => m.role === "assistant")
          .map((m) => m.content)
          .join("\n\n")
      )
    );

    win.print();
  }

  /* ================= LOGOUT ================= */

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
function TemplateItem({ tpl, onClick, onEdit, onDelete }) {
  return (
    <div className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5 cursor-pointer">

      <div
        onClick={onClick}
        className="flex-1 text-sm truncate"
      >
        📄 {tpl.name}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100">

        <button onClick={onEdit}>✏️</button>

        <button
          onClick={onDelete}
          className="text-red-400"
        >
          🗑
        </button>

      </div>

    </div>
  );
} 
async function runQuickTemplate(prompt) {
  let chatId = activeChat;
  if (!chatId) chatId = await newChat();

  const token = localStorage.getItem("token");

  const userMsg = { role: "user", content: prompt };

  // show user msg
  setMessages((p) => [...p, userMsg]);

  // ✅ CLEAR textarea
  setInput("");

  setLoading(true);

  try {
    const res = await axios.post(
      `${API}/doc/generate-docs`,
      { prompt, chatId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const aiMsg = {
      role: "assistant",
      content: res.data.generateDocs,
    };

    setMessages((p) => [...p, aiMsg]);

    await axios.post(
      `${API}/chat/${chatId}/message`,
      { message: userMsg },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await axios.post(
      `${API}/chat/${chatId}/message`,
      { message: aiMsg },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadHistory();
  } catch (err) {
    console.error("Quick template error:", err);
    alert("Generation failed");
  } finally {
    setLoading(false);
  }
}
   

   
  /* ======================================================== */

  
return (
    <div className="h-screen grid grid-cols-[260px_1fr] bg-[#020617] text-white">

      {/* ================= SIDEBAR ================= */}
      <aside className="bg-[#050c18] border-r border-white/10 flex flex-col">

        <div className="p-5">

          <h2 className="font-semibold text-lg mb-4 bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            DevDocsAI
          </h2>

          <button
            onClick={newChat}
            className="w-full py-2 mb-4 rounded bg-white/5 hover:bg-white/10"
          >
            ➕ New Chat
          </button>

          {/* QUICK ACTIONS */}
          <div>

            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
              Quick Actions
            </p>

            <div className="space-y-05">

              {defaultQuickTemplates.map((t) => (
                <button
                  key={t}
                  onClick={() => runQuickTemplate(t)}
                  className="w-full flex items-center gap-2 px-3 py-1.5
                             text-xs text-left rounded-md
                             text-white/80 hover:text-white
                             hover:bg-white/5 transition"
                >
                 <span className="truncate">{t}</span>
                </button>
              ))}

            </div>

            <button
              onClick={() => {
                setEditingTemplate(null);
                setTplName("");
                setTplPrompt("");
                setShowTemplateModal(true);
              }}
              className="mt-3 text-xs opacity-60 hover:opacity-100"
            >
              ➕ New Template
            </button>

            <div className="mt-4 border-t border-white/10" />

          </div>

          {/* HISTORY */}
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
              History
            </p>
          </div>

        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">

{history.map((item) => (
  <div
    key={item._id}
    className={`flex gap-2 p-2 rounded items-center ${
      activeChat === item._id
        ? "bg-blue-600/20"
        : "hover:bg-white/5"
    }`}
  >
    {/* OPEN CHAT */}
    <button
      onClick={() => openChat(item._id)}
      className="flex-1 truncate text-left"
    >
      {item.title}
    </button>

    {/* RENAME */}
    <Pencil
      size={14}
      className="cursor-pointer opacity-60 hover:opacity-100"
      onClick={(e) => {
        e.stopPropagation(); // ✅ VERY IMPORTANT
        renameChat(item._id);
      }}
    />

    {/* DELETE */}
    <Trash2
      size={14}
      className="cursor-pointer text-red-400"
      onClick={(e) => {
        e.stopPropagation(); // ✅ VERY IMPORTANT
        deleteChat(item._id);
      }}
    />
  </div>
))}        

        </div>

        {/* USER */}
        <div className="border-t border-white/10 p-4 flex items-center gap-3">

          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
            {user?.name?.[0]}
          </div>

          <div className="flex-1">
            <p className="text-sm">{user?.name}</p>
            <p className="text-xs opacity-60">{user?.email}</p>
          </div>

          <button onClick={logout} className="text-red-400 text-xs">
            Logout
          </button>

        </div>

      </aside>
   

      {/* ================= MAIN ================= */}
      <main className="flex flex-col h-screen relative">

        {/* TOP BAR */}
        <header className="sticky top-0 z-20 bg-[#020617] border-b border-white/10 px-6 py-3 flex justify-between">

          <span className="font-medium text-lg">
            {history.find((h) => h._id === activeChat)?.title ||
              ""}
          </span>

          <div className="relative">

            <button
              onClick={() => setShowSaveMenu((p) => !p)}
              className=" bg-linear-to-r from-[hsl(199_89%_48%)] to-[hsl(280_80%_60%)] px-3 py-2 rounded text-sm hover:bg-white/10"
            >
              Save ▾
            </button>

            {showSaveMenu && (
              <div className="absolute right-0 mt-2 bg-[#0b1220] border border-white/10 rounded overflow-hidden">

                <button
                  onClick={saveHTML}
                  className="block px-4 py-2 hover:bg-white/10 w-full text-left"
                >
                  HTML
                </button>

                <button
                  onClick={savePDF}
                  className="block px-4 py-2 hover:bg-white/10 w-full text-left"
                >
                  PDF
                </button>

              </div>
            )}

          </div>

        </header>

        {/* ================= CHAT ================= */}
        <div className="flex-1 overflow-y-auto px-6 no-scrollbar">

          <div
            className={`max-w-3xl mx-auto space-y-6 ${
              messages.length === 0 && !loading
                ? "flex flex-col items-center justify-center min-h-[70vh]"
                : ""
            }`}
          >

            {/* EMPTY STATE */}
            {messages.length === 0 && !loading && (
              <>
                <div className="text-center space-y-3">
                  <h1 className="text-4xl font-semibold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    How can I help you document today?
                  </h1>

                  <p className=" mt-5 text-sm opacity-60 max-w-md mx-auto">
                    Paste code, upload files, or describe your project — I’ll
                    generate clean, professional documentation for you.
                  </p>
                 </div>

                {/* QUICK ACTIONS */}  
  <div className="grid grid-cols-2 gap-4 mt-10">  
    {[  
    "Write API documentation for a REST endpoint",  
      "Create a getting-started guide",  
      "Generate a tutorial with examples",  
      "Document a React component",  
    ].map((t) => (  
      <button  
        key={t}  
        onClick={() => setInput(t)}  
        className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl p-4 text-sm text-left transition"  
      >  
        {t}  
      </button>  
    ))}  
  </div>  
          </>  
            )}

            {/* MESSAGES */}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3   rounded-2xl prose prose-invert whitespace-pre-wrap-break-word overflow-x-auto ${
                    m.role === "user"
                      ? "bg-blue-600/30 rounded-br-sm"
                      : "bg-[#0b1220] rounded-bl-sm"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html:
                      m.role === "assistant"
                        ? marked.parse(m.content)
                        : m.content,
                  }}
                />
              </div>
            ))}

            {loading && (
              <div className="text-sm opacity-50">Generating…</div>
            )}

            <div ref={bottomRef} />

          </div>

        </div>

        {/* ================= INPUT ================= */}
        <div className="sticky bottom-0 w-full bg-linear-to-t from-[#020617] via-[#020617]/95 to-transparent">

          <div className="mx-auto max-w-3xl px-4 pb-6 pt-6">

            <div className="flex items-center gap-2 bg-[#0b1220] border border-white/10 rounded-xl p-2 shadow-xl">

              {/* UPLOAD */}
              <label className="cursor-pointer p-2 rounded-lg hover:bg-white/10">
                <Plus size={22} />
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleUpload}
                />
              </label>

              {/* TEXTAREA */}
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                placeholder="Ask me to generate documentation..."
                className="flex-1 resize-none bg-transparent outline-none px-3 py-2 text-base md:text-lg leading-relaxed  placeholder:text-white/50 max-h-40 min-h-12 no-scrollbar"
              />

              {/* SEND */}
              <button
                onClick={sendMessage}
                disabled={loading}
                className=" bg-linear-to-r from-[hsl(199_89%_48%)] to-[hsl(280_80%_60%)] hover:bg-white/50 p-2 rounded-xl disabled:opacity-50 no-scrollbar"
              >
                <Send size={22} />
              </button>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
}