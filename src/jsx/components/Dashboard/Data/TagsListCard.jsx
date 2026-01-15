import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReleasesListCard() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);
  const [deviceCounts, setDeviceCounts] = useState({});

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('devices')
          .select('version_name');

        if (error) throw error;

        const counts = {};
        data.forEach((d) => {
          // aplica el default aquí 👇
          const version = d.version_name || '1.50';
          if (!counts[version]) counts[version] = 0;
          counts[version]++;
        });
        setDeviceCounts(counts);

        // set de versiones únicas con default aplicado
        let versions = [...new Set(data.map((d) => d.version_name || '1.50'))];
        versions.sort((a, b) => parseFloat(b) - parseFloat(a)); // sort descending

        const results = [];
        for (const v of versions) {
          try {
            const resp = await fetch(
              `/.netlify/functions/getReleaseByTag?tag=${v}`
            );
            if (!resp.ok) {
              console.warn(`No release for ${v}`);
              continue;
            }
            const release = await resp.json();
            results.push(release);
          } catch (err) {
            console.error('Release fetch error', err);
          }
        }

        setReleases(results);
        if (results.length > 0) {
          setActiveTag(results[0].tag_name); // default first
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeRelease = releases.find((r) => r.tag_name === activeTag);

  return (
    <div className="card">
      <div className="card-header pb-2">
        <h4 className="text-black mb-0">Releases by Version</h4>
      </div>

      <div className="card-body">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : releases.length === 0 ? (
          <p className="text-muted">No releases found for these versions.</p>
        ) : (
          <div className="row">
            {/* Release content */}
            <div className="col-md-10">
              {activeRelease && (
                <div>
                  <p className="mb-1">
                    Published:{' '}
                    {activeRelease.published_at
                      ? new Date(
                          activeRelease.published_at
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>

                  {activeRelease.body && (
                    <div className="markdown-body small text-muted">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noreferrer" />
                          ),
                        }}
                      >
                        {activeRelease.body}
                      </ReactMarkdown>
                    </div>
                  )}

                  <a
                    href={activeRelease.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-dark"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              )}
            </div>

            {/* Vertical nav */}
            <div className="col-md-2 border-start">
              <div className="nav flex-column nav-pills">
                {releases.map((rel) => (
                  <button
                    key={rel.tag_name}
                    className={`nav-link text-start git-nav ${
                      activeTag === rel.tag_name ? 'active' : ''
                    }`}
                    onClick={() => setActiveTag(rel.tag_name)}
                  >
                    {rel.tag_name}{' '}
                    <span className="badge">
                      {deviceCounts[rel.tag_name] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
