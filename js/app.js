// ================================================================
// DOM REFERENCES
// ================================================================
const branchEl = document.getElementById('branch');
const semEl = document.getElementById('sem');
const subjectSelect = document.getElementById('subjectSelect');
const msgEl = document.getElementById('msg');
const subjectListEl = document.getElementById('subjectList');
const subjectBadge = document.getElementById('subjectBadge');

const DEFAULT_MSG = "🔍 Choose branch, semester &amp; subject to view video lectures.";
let hideTimer;

function showMessage(text, duration = 6000) {
  clearTimeout(hideTimer);
  msgEl.style.opacity = 1;
  msgEl.innerHTML = text;
  hideTimer = setTimeout(() => {
    msgEl.style.opacity = 0;
    setTimeout(() => {
      msgEl.innerHTML = DEFAULT_MSG;
      msgEl.style.opacity = 1;
    }, 300);
  }, duration);
}

// ================================================================
// STEP 1: BRANCH LIST (from data.js)
// ================================================================
function initBranches() {
  branchEl.innerHTML = '<option value="">Select Branch</option>';
  BRANCHES.forEach((b) => {
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = b.name;
    branchEl.appendChild(opt);
  });
}

// ================================================================
// STEP 2: SEMESTER LIST (depends on branch)
// ================================================================
function updateSemesters() {
  const branch = branchEl.value;
  semEl.innerHTML = '<option value="">Select Semester</option>';
  subjectSelect.innerHTML = '<option value="">Select Subject</option>';
  subjectSelect.disabled = true;

  if (!branch) {
    semEl.disabled = true;
    updateSubjectSection();
    return;
  }

  SEMESTERS.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = String(s);
    opt.textContent = `Semester ${s}`;
    semEl.appendChild(opt);
  });
  semEl.disabled = false;
  updateSubjectSection();
}

// ================================================================
// STEP 3: SUBJECT LIST + TAG CLOUD (depends on branch + semester)
// ================================================================
function updateSubjectSection() {
  const branch = branchEl.value;
  const sem = semEl.value;

  subjectSelect.innerHTML = '<option value="">Select Subject</option>';

  if (!branch || !sem) {
    subjectSelect.disabled = true;
    subjectListEl.innerHTML = `<span class="empty-subjects">Select branch &amp; semester to see subjects</span>`;
    subjectBadge.textContent = '—';
    return;
  }

  const subjects = (SUBJECTS[branch] && SUBJECTS[branch][sem]) || [];

  if (subjects.length === 0) {
    subjectSelect.disabled = true;
    subjectListEl.innerHTML = `<span class="empty-subjects">📭 No subjects added for this selection yet</span>`;
    subjectBadge.textContent = '0';
    return;
  }

  subjectBadge.textContent = subjects.length;
  subjectListEl.innerHTML = subjects.map((s) => `<span class="subject-tag">📖 ${s.name}</span>`).join('');

  subjects.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = s.name;
    subjectSelect.appendChild(opt);
  });
  subjectSelect.disabled = false;
}

branchEl.addEventListener('change', updateSemesters);
semEl.addEventListener('change', updateSubjectSection);

// ================================================================
// OPEN VIDEO PLAYLIST
// ================================================================
function getPlaylist(branch, sem, subjectIndex) {
  const subjects = SUBJECTS[branch] && SUBJECTS[branch][sem];
  if (!subjects || !subjects[subjectIndex]) return null;
  return subjects[subjectIndex];
}

document.getElementById('openBtn').onclick = () => {
  const b = branchEl.value;
  const s = semEl.value;
  const subIndex = subjectSelect.value;

  if (!b || !s) {
    showMessage("❌ Please select branch &amp; semester.", 6000);
    return;
  }
  if (subIndex === "") {
    showMessage("❌ Please select a subject from the dropdown.", 6000);
    return;
  }

  const subject = getPlaylist(b, s, subIndex);
  const branchName = BRANCHES.find((br) => br.id === b)?.name || b;

  if (!subject || !subject.playlistId || subject.playlistId === "REPLACE_WITH_PLAYLIST_ID") {
    showMessage(`❌ Playlist not added yet for "${subject ? subject.name : 'this subject'}" (${branchName} · Sem ${s})`, 7000);
    return;
  }

  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${subject.playlistId}`;
  const watchUrl = `https://www.youtube.com/playlist?list=${subject.playlistId}`;

  document.getElementById('videoModalTitle').textContent = `▶️ ${subject.name}`;
  document.getElementById('videoFrame').src = embedUrl;
  document.getElementById('openYoutubeBtn').onclick = () => window.open(watchUrl, '_blank', 'noopener');

  document.getElementById('videoModal').style.display = 'flex';
  document.getElementById('videoModal').classList.add('active');
  showMessage(`▶️ Playing ${subject.name} (${branchName} · Sem ${s})`, 5000);
};

// ================================================================
// CLOSE VIDEO MODAL
// ================================================================
function closeVideo() {
  document.getElementById('videoModal').classList.remove('active');
  document.getElementById('videoModal').style.display = 'none';
  document.getElementById('videoFrame').src = '';
}

document.getElementById('videoModal').addEventListener('click', function (e) {
  if (e.target === this) closeVideo();
});

// ================================================================
// DEVELOPER MODAL
// ================================================================
function closeDev() {
  document.getElementById('devModal').classList.remove('active');
  document.getElementById('devModal').style.display = 'none';
}

document.getElementById('devBtn').onclick = () => {
  document.getElementById('devModal').style.display = 'flex';
  document.getElementById('devModal').classList.add('active');
};

document.getElementById('devModal').addEventListener('click', function (e) {
  if (e.target === this) closeDev();
});

// ================================================================
// PWA INSTALL PROMPT
// ================================================================
let deferredPrompt = null;
let installInProgress = false;
const installBtn = document.getElementById('installBtn');

function isPWAStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.matchMedia('(display-mode: fullscreen)').matches ||
         window.navigator.standalone === true ||
         document.referrer.startsWith('android-app://');
}

function updateInstallButton() {
  if (!installBtn) return;
  if (isPWAStandalone()) {
    installBtn.innerHTML = "✅ App Mode Active";
    installBtn.style.background = "#16a34a";
    return;
  }
  if (localStorage.getItem('engg_study_installed') === 'yes') {
    installBtn.innerHTML = "✅ App Already Installed";
    installBtn.style.background = "#16a34a";
    return;
  }
  installBtn.innerHTML = "📲 Install App";
  installBtn.style.background = "#16a34a";
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installInProgress = false;
  localStorage.removeItem('engg_study_installed');
  updateInstallButton();
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installInProgress = false;
  localStorage.setItem('engg_study_installed', 'yes');
  updateInstallButton();
  showMessage("✅ App installed. Open it from your home screen icon.", 8000);
});

async function installPWA() {
  if (isPWAStandalone()) {
    showMessage("✅ You're already using the installed app.", 5000);
    return;
  }
  if (installInProgress) {
    showMessage("⏳ Installing...", 4000);
    return;
  }
  if (localStorage.getItem('engg_study_installed') === 'yes' && !deferredPrompt) {
    showMessage("✅ Already installed. Open it from your home screen icon.", 5000);
    return;
  }
  if (!deferredPrompt) {
    showMessage("ℹ️ Install isn't available right now. Try your browser menu → Add to Home Screen.", 8000);
    return;
  }
  const promptEvent = deferredPrompt;
  deferredPrompt = null;
  installInProgress = true;
  promptEvent.prompt();
  const choice = await promptEvent.userChoice;
  if (choice.outcome === 'accepted') {
    installBtn.innerHTML = "⏳ Installing...";
    showMessage("⏳ Installing the app...", 10000);
  } else {
    installInProgress = false;
    showMessage("❌ Install cancelled.", 4000);
    updateInstallButton();
  }
}

installBtn.addEventListener('click', installPWA);
window.addEventListener('DOMContentLoaded', updateInstallButton);
window.matchMedia('(display-mode: standalone)').addEventListener('change', updateInstallButton);

// ================================================================
// SERVICE WORKER REGISTRATION (PWA)
// ================================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      /* offline caching is a bonus, not a requirement — fail silently */
    });
  });
}

// ================================================================
// INIT
// ================================================================
initBranches();
updateSemesters();
