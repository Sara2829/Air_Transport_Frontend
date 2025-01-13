import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import AddAirUser from "./AddUser"; // AddAirUser modal
import EditAirUser from "./EditAirUser"; // EditAirUser modal

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AirUserPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Updated type to any[] for more flexibility
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any | null>(null); // Updated type to any

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/all`);
        console.log("Air users response:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching air users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleAddUser = (newUser: { username: string; email: string }) => {
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers((prevUsers) => [...prevUsers, newUserWithId]);
  };

  const handleEditUser = (user: any) => {
    console.log("Editing user:", user);
    setUserToEdit(user);
    setShowEditUserModal(true);
    
    
    console.log(showEditUserModal);
  };

  const handleUpdateUser = (updatedUser: { id: number; username: string; email: string }) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowEditUserModal(false);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`${API_URL}/auth/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete the user, please try again.");
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Air Users</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Users: {filteredUsers.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Air Users"
            value={search}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddUserModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New User
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          onClick={() => handleEditUser(user)}
                        >
                          <i className="ki-duotone ki-pencil fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <i className="ki-duotone ki-trash fs-3 text-danger">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddAirUser
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleAddUser}
        />
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <EditAirUser
        user={userToEdit}
          onClose={() => setShowEditUserModal(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};