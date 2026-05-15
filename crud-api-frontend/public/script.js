const form = document.getElementById("student-form");
const editIdInput = document.getElementById("edit-id");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");
const tbody = document.getElementById("student-rows");
const messageEl = document.getElementById("message");
const emptyHint = document.getElementById("empty-hint");
const refreshBtn = document.getElementById("refresh-btn");

function setMessage(text, isError) {
  messageEl.textContent = text || "";
  messageEl.classList.toggle("error", Boolean(isError));
}

function resetFormToAdd() {
  form.reset();
  editIdInput.value = "";
  formTitle.textContent = "Add student";
  submitBtn.textContent = "Add student";
  cancelBtn.classList.add("hidden");
}

function startEdit(student) {
  editIdInput.value = student._id;
  nameInput.value = student.name;
  ageInput.value = student.age;
  courseInput.value = student.course;
  formTitle.textContent = "Update student";
  submitBtn.textContent = "Update student";
  cancelBtn.classList.remove("hidden");
  setMessage("");
}

async function loadStudents() {
  setMessage("");
  const res = await fetch("/students");
  if (!res.ok) {
    setMessage("Could not load students.", true);
    return;
  }
  const students = await res.json();
  tbody.innerHTML = "";

  if (students.length === 0) {
    emptyHint.classList.remove("hidden");
    return;
  }
  emptyHint.classList.add("hidden");

  for (const s of students) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(String(s.age))}</td>
      <td>${escapeHtml(s.course)}</td>
      <td>
        <button type="button" data-action="edit" data-id="${escapeAttr(s._id)}">Edit</button>
        <button type="button" data-action="delete" data-id="${escapeAttr(s._id)}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

tbody.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const id = btn.getAttribute("data-id");
  const action = btn.getAttribute("data-action");

  if (action === "edit") {
    const tr = btn.closest("tr");
    const cells = tr.querySelectorAll("td");
    startEdit({
      _id: id,
      name: cells[0].textContent,
      age: Number(cells[1].textContent),
      course: cells[2].textContent,
    });
    return;
  }

  if (action === "delete") {
    if (!confirm("Delete this student?")) return;
    const res = await fetch("/students/" + encodeURIComponent(id), { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.message || "Delete failed.", true);
      return;
    }
    setMessage("Student deleted.");
    if (editIdInput.value === id) resetFormToAdd();
    loadStudents();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMessage("");

  const payload = {
    name: nameInput.value.trim(),
    age: Number(ageInput.value),
    course: courseInput.value.trim(),
  };

  const id = editIdInput.value;
  const isUpdate = Boolean(id);

  const res = await fetch(isUpdate ? "/students/" + encodeURIComponent(id) : "/students", {
    method: isUpdate ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    setMessage(data.message || "Request failed.", true);
    return;
  }

  setMessage(isUpdate ? "Student updated." : "Student added.");
  resetFormToAdd();
  loadStudents();
});

cancelBtn.addEventListener("click", () => {
  resetFormToAdd();
  setMessage("Edit cancelled.");
});

refreshBtn.addEventListener("click", () => {
  loadStudents();
});

loadStudents();
