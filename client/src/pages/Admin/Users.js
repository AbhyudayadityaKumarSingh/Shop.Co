import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-users');
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Edit user
  const handleEditUser = (id) => {
    console.log('Edit user', id);
  };
  

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${id}`);
      if (data.success) {
        // Remove the user from the state
        toast.success('User deleted successfully');
        setUsers(prevUsers => prevUsers.filter(u => u._id !== id));
        console.log('User deleted successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'Dashboard - All Users'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>All Users</h1>
            <table className='table table-bordered'>
              <thead className='thead-light '>
                <tr>
                  <th scope='col'>S.No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Role</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <th scope='row'>{i + 1}</th>
                    <td>{u?.name}</td>
                    <td>{u?.email}</td>
                    <td>{u?.address}</td>
                    <td>{u?.role === 1 ? <strong> Admin </strong> : "User"}</td>
                    <td>
                      <button className='btn btn-warning'>
                        Edit
                      </button>
                      <button className='btn btn-danger ms-2' onClick={() => handleDeleteUser(u._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
