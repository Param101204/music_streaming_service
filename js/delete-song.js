document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".del-button").forEach(btn => {
    btn.onclick = async () => {
      const trackId = btn.dataset.track;
      const playlist = btn.dataset.playlist;
      const res = await fetch(`/deleteSong/${trackId}-${playlist}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) location.reload();
    };
  });
});
