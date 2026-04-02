// IR Team Page

const IRTeamPage = {
  onEnter() {
    this.refreshTeamTable();
  },

  onLeave() {
    // Team is modified via the table directly, no form to flush
  },

  refreshTeamTable() {
    const tbody = document.getElementById("team-tbody");
    tbody.innerHTML = "";

    window.planData.team.forEach((member, idx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.role}</td>
        <td>${member.phone}</td>
        <td>${member.email}</td>
        <td>
          <button type="button" class="delete-btn" data-idx="${idx}">✕</button>
        </td>
      `;
      row.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.preventDefault();
        window.planData.team.splice(idx, 1);
        this.refreshTeamTable();
      });
      tbody.appendChild(row);
    });
  },
};

// Event listeners
document.getElementById("add-member-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("team-name").value.trim();
  const role = document.getElementById("team-role").value.trim();
  const phone = document.getElementById("team-phone").value.trim();
  const email = document.getElementById("team-email").value.trim();

  if (name && role && phone && email) {
    window.planData.team.push({ name, role, phone, email });
    document.getElementById("team-form").reset();
    IRTeamPage.refreshTeamTable();
  }
});
