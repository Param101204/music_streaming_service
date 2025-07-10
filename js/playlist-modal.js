document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".add-button").forEach(btn => {
    const trackId = btn.dataset.track;
    const modal = document.getElementById(btn.dataset.modal);
    const form = modal.querySelector("form");

    btn.onclick = () => modal.style.display = 'block';
    modal.querySelector(".close").onclick = () => modal.style.display = 'none';
    form.onsubmit = async e => {
      e.preventDefault();
      const selected = Array.from(form.playlist_id)
        .filter(cb => cb.checked)
        .map(cb => ({ playlist_id: cb.value }));
      await fetch('/add-to-playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track_id: trackId, playlists: selected })
      });
      alert("Added!");
      modal.style.display = 'none';
    };
  });
});
// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
        modal.style.display = "none";
        }
    });
}