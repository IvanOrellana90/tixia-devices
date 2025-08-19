import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconBubble = ({
  active,
  icon,
  title,
  onText,
  offText,
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-circle ${className}`}
      style={{ width: 36, height: 36, position: 'relative', cursor: 'pointer' }}
      onClick={() => setOpen((o) => !o)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-label={title}
      title={active ? onText : offText} // fallback nativo
    >
      <FontAwesomeIcon icon={icon} />

      {open && (
        <div
          className="shadow border rounded p-2 bg-white text-dark small"
          style={{
            position: 'absolute',
            zIndex: 30,
            bottom: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: 200,
          }}
          role="dialog"
          aria-live="polite"
        >
          <div className={`${active ? 'text-info-emphasis' : 'text-warning-emphasis'}`}>
            {active ? onText : offText}
          </div>

          {/* Flechita */}
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid white',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default IconBubble;
