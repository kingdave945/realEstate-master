
import "../Admin/Admin.css";

const stats = {
  totalListings: 42,
  activeUsers: 15,
  messages: 8,
};

const users = [
  { id: 1, name: "Jane Doe", email: "jane@example.com", status: "Active" },
  { id: 2, name: "John Smith", email: "john@example.com", status: "Inactive" },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
  },
];

export default function Admin() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="adminStats">
        <div className="admin-stats">
          <div className="admin-stat-card">
            <h2>Total Listings</h2>
            <p className="admin-stat-value">{stats.totalListings}</p>
          </div>
          <div className="admin-stat-card">
            <h2>Active Users</h2>
            <p className="admin-stat-value">{stats.activeUsers}</p>
          </div>
          <div className="admin-stat-card">
            <h2>Messages</h2>
            <p className="admin-stat-value">{stats.messages}</p>
          </div>
        </div>
      </div>

      <h2 className="admin-users-title">Users</h2>
      <div className="Table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
