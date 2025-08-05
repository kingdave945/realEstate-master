import { useEffect, useState } from "react";
import "./Messages.css";
import { getMessages } from "../../Api"; 
import { getUserDetails } from "../../Api/saveDetails";

interface User {
  fullName?: string;
  userName?: string;
  email?: string;
  [key: string]: any;
}

interface Message {
  id: string;
  user: User;
  content: string;
  dateSent: string;
  reply: string;
}

export default function Messages() {
  // Get the logged-in agent
  const user = getUserDetails("agent");
  const agentEmail = user?.email;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

 useEffect(() => {
  const fetchMessages = async () => {
    if (!agentEmail) return;

    setLoading(true);
    try {
      const data = await getMessages(agentEmail, page);
      setMessages(data.data || []);
      setTotalPages(data.pageSize ? Math.ceil((data.totalCount || 0) / data.pageSize) : 1);
    } catch (error) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };
  fetchMessages();
}, [agentEmail, page]);

  return (
    <div className="limiter">
      <h1 style={{ marginBottom: "0px" }}>Messages</h1>
      <div className="container-table100">
        <div className="wrap-table100">
          <table className="messages-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Message Content</th>
                <th>Date Created</th>
                <th>Reply</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : messages.length > 0 ? (
                messages.map((msg, idx) => (
                  <tr key={msg.id || idx}>
                    <td>
                      {msg.user?.fullName ||
                        msg.user?.userName ||
                        msg.user?.email ||
                        ""}
                    </td>
                    <td>{msg.content}</td>
                    <td>
                      {msg.dateSent
                        ? new Date(msg.dateSent).toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      <span className="badge badge-replied">
                        {msg.reply ? "Replied" : "Reply"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            className="Page"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 16,
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              style={{ marginRight: 8 }}
            >
              Previous
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              style={{ marginLeft: 8 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
