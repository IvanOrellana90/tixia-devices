import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { toast } from 'react-toastify';

const VisitTechniciansCard = ({ visitId }) => {
  const [technicians, setTechnicians] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    if (!visitId) return;
    fetchTechnicians();
  }, [visitId]);

  const fetchTechnicians = async () => {
    const { data, error } = await supabase
      .from('visit_technicians')
      .select(
        `
        user_id,
        role_in_visit,
        created_at,
        users (first_name, last_name, email)
      `
      )
      .eq('visit_id', visitId);
    if (error) {
      toast.error('Error loading technicians');
    } else {
      setTechnicians(data || []);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, email')
        .order('first_name', { ascending: true });
      if (error) {
        toast.error('Error loading users');
      } else {
        setUsersList(data || []);
      }
    };
    fetchUsers();
  }, []);

  const handleAddTechnician = async () => {
    try {
      const { error } = await supabase.from('visit_technicians').insert([
        {
          visit_id: visitId,
          user_id: selectedUserId,
          role_in_visit: newRole || null,
        },
      ]);
      if (error) throw error;

      toast.success('Technician added');
      setSelectedUserId('');
      setNewRole('');
      fetchTechnicians();
    } catch (err) {
      toast.error(`Error adding technician: ${err.message}`);
    }
  };

  const handleRemoveTechnician = async (userId) => {
    if (!window.confirm('Remove this technician?')) return;
    try {
      const { error } = await supabase
        .from('visit_technicians')
        .delete()
        .eq('visit_id', visitId)
        .eq('user_id', userId);
      if (error) throw error;
      toast.info('Technician removed');
      setTechnicians((prev) => prev.filter((t) => t.user_id !== userId));
    } catch (err) {
      toast.error(`Error removing technician: ${err.message}`);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Technicians Assigned</h5>
      </div>

      <div className="card-body">
        {technicians.length > 0 ? (
          <div className="table-responsive mb-3">
            <table className="table table-sm table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Assigned</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {technicians.map((t) => (
                  <tr key={t.user_id}>
                    <td>
                      {t.users?.first_name} {t.users?.last_name}
                    </td>
                    <td>{t.role_in_visit || '-'}</td>
                    <td>
                      {t.created_at
                        ? new Date(t.created_at).toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={() => handleRemoveTechnician(t.user_id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mb-3">No technicians assigned yet.</p>
        )}

        {/* Add form */}
        <div className="border-top pt-3">
          <h6 className="mb-2">Add Technician</h6>
          <div className="row align-items-end">
            <div className="col-md-5">
              <label>User</label>
              <select
                className="form-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select user</option>
                {usersList.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.first_name} {u.last_name} ({u.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label>Role</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Supervisor"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-outline-success btn-md w-100"
                onClick={handleAddTechnician}
                disabled={!selectedUserId}
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitTechniciansCard;
