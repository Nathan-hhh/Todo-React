
export default function ToggleButton ({toggleBtn, handleToggle}) {
    return (
      <div className="filters btn-group">
      <button type="button" className="btn toggle-btn" aria-pressed={toggleBtn[0]} onClick={handleToggle} >
          <span>All</span>
      </button>
      <button type="button" className="btn toggle-btn" aria-pressed={toggleBtn[1]} onClick={handleToggle} >
          <span>Active</span>
      </button>
      <button type="button" className="btn toggle-btn" aria-pressed={toggleBtn[2]} onClick={handleToggle}>
          <span>Completed</span>
      </button>
    </div>
    )
  }