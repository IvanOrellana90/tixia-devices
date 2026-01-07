import React, { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AccessDirectionAlerts = ({ clientDb }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!clientDb) return;
      setLoading(true);
      try {
        const res = await fetch('/.netlify/functions/getDirectionMetrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_db: clientDb }),
        });

        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const rows = await res.json();
        setData(rows || []);
      } catch (error) {
        console.error(error);
        toast.error('Error loading access flow');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientDb]);

  const {
    totalEntries,
    totalExits,
    totalEvents,
    entryPct,
    exitPct,
  } = useMemo(() => {
    let entries = 0;
    let exits = 0;

    data.forEach((item) => {
      const count = Number(item.count || 0);
      const id = Number(item.id);

      if ([1, 4, 5].includes(id)) entries += count;
      if ([2, 6].includes(id)) exits += count;
    });

    const total = entries + exits;

    return {
      totalEntries: entries,
      totalExits: exits,
      totalEvents: total,
      entryPct: total > 0 ? (entries / total) * 100 : 0,
      exitPct: total > 0 ? (exits / total) * 100 : 0,
    };
  }, [data]);

  if (loading) {
    return (
      <div className="d-flex align-items-center mb-3 text-muted">
        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
        Loading access flow...
      </div>
    );
  }

  if (!loading && data.length === 0) return null;

  return (
    <div className="row">
      {/* ENTRIES */}
      <div className="col-xl-6 col-xxl-6 col-lg-6 col-sm-6 mb-3">
        <div role="alert" className="fade left-icon-big alert alert-success show h-100">
          <div className="media">
            <div className="alert-left-icon-big">
              <span className="me-3">
                <FontAwesomeIcon icon={faArrowRightToBracket} size="2x" />
              </span>
            </div>

            <div className="media-body flex-1">
              <h4 className="alert-heading mb-1">Total Entries</h4>

              <p className="mb-0">
                Accumulated entries:{' '}
                <strong>{totalEntries.toLocaleString()}</strong>
              </p>

              <small className="d-block opacity-75">
                <strong>Percentage:</strong>{' '}
                {entryPct.toFixed(1)}%
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* EXITS */}
      <div className="col-xl-6 col-xxl-6 col-lg-6 col-sm-6 mb-3">
        <div role="alert" className="fade left-icon-big alert alert-danger show h-100">
          <div className="media">
            <div className="alert-left-icon-big">
              <span className="me-3">
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
              </span>
            </div>

            <div className="media-body flex-1">
              <h4 className="alert-heading mb-1">Total Exits</h4>

              <p className="mb-0">
                Accumulated exits:{' '}
                <strong>{totalExits.toLocaleString()}</strong>
              </p>

              <small className="d-block opacity-75">
                <strong>Percentage:</strong>{' '}
                {exitPct.toFixed(1)}%
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDirectionAlerts;
