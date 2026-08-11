/* ==========================================================================
   UNIFIT MAIN APPLICATION CONTROLLER & SPA ROUTER
   UI bindings, section routing, toast engine & onboarding wizard
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Demo User Data if empty
  UniFitAuth.initDemoUserIfEmpty();

  // Global Toast Function
  window.showUniFitToast = function(message, type = "green") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: #4ADE80;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Section Routing System
  window.showSection = function(sectionId) {
    const sections = document.querySelectorAll(".app-section");
    sections.forEach(s => s.classList.remove("active"));

    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Highlight active nav links
      document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("onclick") && link.getAttribute("onclick").includes(sectionId)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Trigger section specific renderers
      if (sectionId === "dashboard-section") renderDashboard();
      if (sectionId === "exercise-bank-section") renderExerciseBank();
      if (sectionId === "evolution-section") renderEvolutionSection();
      if (sectionId === "admin-section") renderAdminPanel();
    }
  };

  // Navbar Scroll Background Toggle
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // Modal Open/Close Controls
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  };

  // --- ONBOARDING WIZARD HANDLER ---
  let currentStep = 1;
  const onboardingData = {
    name: "", age: 25, gender: "Masculino", height: 175, weight: 70,
    experience: "Iniciante", goal: "Hipertrofia", daysPerWeek: 4,
    timePerWorkout: 60, location: "Academia", injuries: ["Nenhuma"]
  };

  window.nextStep = function(step) {
    // Collect step data
    if (step === 1) {
      onboardingData.name = document.getElementById("ob-name")?.value || "Atleta";
      onboardingData.age = parseInt(document.getElementById("ob-age")?.value) || 25;
      onboardingData.gender = document.getElementById("ob-gender")?.value || "Masculino";
      onboardingData.height = parseFloat(document.getElementById("ob-height")?.value) || 175;
      onboardingData.weight = parseFloat(document.getElementById("ob-weight")?.value) || 70;
    }

    document.querySelectorAll(".ob-step").forEach(el => el.style.display = "none");
    currentStep = step + 1;
    const nextEl = document.getElementById(`ob-step-${currentStep}`);
    if (nextEl) nextEl.style.display = "block";
  };

  window.prevStep = function(step) {
    document.querySelectorAll(".ob-step").forEach(el => el.style.display = "none");
    currentStep = step - 1;
    const prevEl = document.getElementById(`ob-step-${currentStep}`);
    if (prevEl) prevEl.style.display = "block";
  };

  window.selectOption = function(btnElement, key, value) {
    const parent = btnElement.parentElement;
    parent.querySelectorAll(".option-card-btn").forEach(b => b.classList.remove("selected"));
    btnElement.classList.add("selected");
    onboardingData[key] = value;
  };

  window.submitOnboarding = function() {
    UniFitAuth.register(onboardingData);
    closeModal("onboarding-modal");
    showUniFitToast("🔥 Treino personalizado gerado com sucesso por Inteligência Artificial!", "green");
    showSection("dashboard-section");
  };

  // --- DASHBOARD RENDERER ---
  function renderDashboard() {
    const user = UniFitAuth.getCurrentUser();
    if (!user) return;

    document.getElementById("dash-user-name").innerText = user.name.split(" ")[0];
    document.getElementById("dash-weight").innerText = `${user.weight} kg`;
    document.getElementById("dash-goal").innerText = user.goal;

    const bmiInfo = UniFitAlgorithm.calculateBMI(user.weight, user.height);
    document.getElementById("dash-bmi").innerText = `${bmiInfo.bmi} (${bmiInfo.category})`;

    const gData = UniFitGamification.getGamificationData();
    const lvlInfo = UniFitGamification.calculateLevel(gData.xp);

    document.getElementById("dash-level-title").innerText = `Nível ${lvlInfo.level} • ${lvlInfo.title}`;
    document.getElementById("dash-streak").innerText = `${gData.streakDays} Dias`;

    const xpBar = document.getElementById("dash-xp-progress");
    if (xpBar) xpBar.style.width = `${lvlInfo.percentage}%`;

    // Render Workout of the Day Card
    const rawPlan = localStorage.getItem(UniFitAuth.STORAGE_KEYS.PLAN);
    if (rawPlan) {
      const plan = JSON.parse(rawPlan);
      const todayWorkout = plan.daysPlan[0];

      document.getElementById("today-workout-title").innerText = todayWorkout.title || todayWorkout.dayName;
      document.getElementById("today-workout-desc").innerText = `${todayWorkout.exercises.length} Exercícios • Divisão ${plan.splitName}`;

      const listContainer = document.getElementById("today-workout-exercises-list");
      if (listContainer) {
        listContainer.innerHTML = todayWorkout.exercises.map(ex => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: rgba(30, 41, 59, 0.4); border-radius: 8px; margin-bottom: 0.5rem;">
            <div>
              <div style="font-weight: 600; color: #FFFFFF;">${ex.name}</div>
              <div style="font-size: 0.8rem; color: #9CA3AF;">${ex.sets} Séries x ${ex.reps} reps | Carga Sugerida: ${ex.suggestedWeightKg}kg</div>
            </div>
            <span class="badge badge-green">${ex.category}</span>
          </div>
        `).join("");
      }
    }
  }

  // --- WORKOUT PLAYER HANDLER ---
  window.startTodayWorkoutSession = function() {
    const rawPlan = localStorage.getItem(UniFitAuth.STORAGE_KEYS.PLAN);
    if (!rawPlan) return;
    const plan = JSON.parse(rawPlan);
    const dayPlan = plan.daysPlan[0];

    workoutSessionInstance.startWorkout(dayPlan);
    renderWorkoutPlayerScreen();
    showSection("workout-player-section");
  };

  function renderWorkoutPlayerScreen() {
    const ex = workoutSessionInstance.getCurrentExercise();
    if (!ex) return;

    document.getElementById("player-ex-name").innerText = ex.name;
    document.getElementById("player-ex-category").innerText = ex.category;
    document.getElementById("player-ex-equipment").innerText = ex.equipment;
    document.getElementById("player-ex-visual").innerHTML = ex.svgIllustration || "";

    const instructionsEl = document.getElementById("player-ex-instructions");
    if (instructionsEl) {
      instructionsEl.innerHTML = ex.instructions.map(inst => `<li>${inst}</li>`).join("");
    }

    // Render set logger table
    const tbody = document.getElementById("player-sets-tbody");
    if (tbody) {
      tbody.innerHTML = ex.loggedSets.map((s, idx) => `
        <tr class="${s.completed ? 'completed' : ''}">
          <td style="font-weight: 700;">Série ${s.setNumber}</td>
          <td>
            <input type="number" class="form-control" style="width: 80px; padding: 0.4rem;" id="set-weight-${idx}" value="${s.weightKg}"> kg
          </td>
          <td>
            <input type="number" class="form-control" style="width: 80px; padding: 0.4rem;" id="set-reps-${idx}" value="${s.repsDone}"> reps
          </td>
          <td>
            <button class="btn btn-sm ${s.completed ? 'btn-primary' : 'btn-secondary'}" onclick="handleToggleSet(${idx})">
              ${s.completed ? '<i class="fa-solid fa-check"></i> Concluído' : 'Concluir'}
            </button>
          </td>
        </tr>
      `).join("");
    }

    updateWorkoutProgressBar();
  }

  window.handleToggleSet = function(setIdx) {
    const exIdx = workoutSessionInstance.currentExerciseIndex;
    const weightVal = document.getElementById(`set-weight-${setIdx}`)?.value;
    const repsVal = document.getElementById(`set-reps-${setIdx}`)?.value;

    const isCompleted = workoutSessionInstance.toggleSetCompletion(exIdx, setIdx, weightVal, repsVal);

    if (isCompleted) {
      // Trigger visual timer
      startRestTimerVisual(workoutSessionInstance.timerTotalSeconds);
    }

    renderWorkoutPlayerScreen();
  };

  function startRestTimerVisual(seconds) {
    const timerBox = document.getElementById("player-rest-timer-box");
    if (timerBox) timerBox.style.display = "flex";

    const circleProgress = document.getElementById("timer-circle-progress");
    const circumference = 2 * Math.PI * 45; // r=45

    if (circleProgress) {
      circleProgress.style.strokeDasharray = circumference;
    }

    workoutSessionInstance.startRestTimer(seconds, (remaining, total) => {
      document.getElementById("timer-display-text").innerText = `${remaining}s`;
      if (circleProgress) {
        const offset = circumference - (remaining / total) * circumference;
        circleProgress.style.strokeDashoffset = offset;
      }
    }, () => {
      showUniFitToast("⚡ Tempo de descanso finalizado! Hora da próxima série!", "green");
      if (timerBox) timerBox.style.display = "none";
    });
  }

  window.nextExercise = function() {
    if (workoutSessionInstance.currentExerciseIndex < workoutSessionInstance.activeWorkout.exercises.length - 1) {
      workoutSessionInstance.currentExerciseIndex++;
      renderWorkoutPlayerScreen();
    }
  };

  window.prevExercise = function() {
    if (workoutSessionInstance.currentExerciseIndex > 0) {
      workoutSessionInstance.currentExerciseIndex--;
      renderWorkoutPlayerScreen();
    }
  };

  function updateWorkoutProgressBar() {
    const pct = workoutSessionInstance.calculateTotalProgress();
    const bar = document.getElementById("workout-session-progress-bar");
    if (bar) bar.style.width = `${pct}%`;
    document.getElementById("workout-session-progress-text").innerText = `${pct}% Concluído`;
  }

  window.finishCurrentWorkoutSession = function() {
    const result = workoutSessionInstance.finishWorkoutSession();
    if (result) {
      showUniFitToast(`🎉 TREINO CONCLUÍDO! +${result.xpEarned} XP GANHOS!`, "green");
      showSection("dashboard-section");
    }
  };

  // --- EXERCISE BANK RENDERER ---
  function renderExerciseBank(categoryFilter = "Todos") {
    const grid = document.getElementById("exercise-bank-grid");
    if (!grid) return;

    let items = EXERCISES_DATABASE;
    if (categoryFilter !== "Todos") {
      items = items.filter(ex => ex.category === categoryFilter);
    }

    grid.innerHTML = items.map(ex => `
      <div class="glass-card feature-card" onclick="openExerciseDetailModal('${ex.id}')">
        <div style="height: 120px; background: rgba(15,23,42,0.6); border-radius: 12px; display:flex; align-items:center; justify-content:center; margin-bottom: 1rem;">
          ${ex.svgIllustration}
        </div>
        <span class="badge badge-green" style="margin-bottom: 0.5rem;">${ex.category}</span>
        <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">${ex.name}</h3>
        <div style="font-size: 0.85rem; color: #9CA3AF;">Equipamento: ${ex.equipment} • Nível: ${ex.level}</div>
      </div>
    `).join("");
  }

  window.filterExerciseCategory = function(btnElement, catName) {
    document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.remove("btn-primary"));
    document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.add("btn-secondary"));
    btnElement.classList.remove("btn-secondary");
    btnElement.classList.add("btn-primary");

    renderExerciseBank(catName);
  };

  window.openExerciseDetailModal = function(exId) {
    const ex = EXERCISES_DATABASE.find(e => e.id === exId);
    if (!ex) return;

    document.getElementById("ex-modal-title").innerText = ex.name;
    document.getElementById("ex-modal-category").innerText = ex.category;
    document.getElementById("ex-modal-equipment").innerText = ex.equipment;
    document.getElementById("ex-modal-visual").innerHTML = ex.svgIllustration;

    document.getElementById("ex-modal-instructions").innerHTML = ex.instructions.map(i => `<li>${i}</li>`).join("");
    document.getElementById("ex-modal-mistakes").innerHTML = ex.commonMistakes.map(m => `<li>${m}</li>`).join("");

    openModal("exercise-detail-modal");
  };

  // --- EVOLUTION & MEASUREMENTS RENDERER ---
  function renderEvolutionSection() {
    UniFitEvolution.renderWeightChart("weightEvolutionChart");

    const historyList = JSON.parse(localStorage.getItem("unifit_history") || "[]");
    const historyTbody = document.getElementById("workout-history-tbody");

    if (historyTbody) {
      historyTbody.innerHTML = historyList.map(h => `
        <tr>
          <td>${new Date(h.date).toLocaleDateString("pt-BR")}</td>
          <td style="font-weight:600; color:#FFFFFF;">${h.workoutTitle}</td>
          <td>${h.durationMinutes} min</td>
          <td>${h.totalTonnageKg} kg</td>
          <td><span class="badge badge-green">+${h.xpEarned} XP</span></td>
        </tr>
      `).join("");
    }
  }

  // --- AI CHATBOT HANDLER ---
  window.toggleAIChatWindow = function() {
    const chatWin = document.getElementById("ai-chat-window");
    if (chatWin) chatWin.classList.toggle("active");
  };

  window.sendAIChatMessage = function() {
    const input = document.getElementById("ai-chat-input");
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = "";

    const msgContainer = document.getElementById("ai-chat-messages-container");
    if (msgContainer) {
      // Append user bubble
      msgContainer.innerHTML += `
        <div class="chat-bubble chat-bubble-user">${userText}</div>
      `;

      // Get AI response
      const aiReply = UniFitAIAssistant.getResponse(userText);

      setTimeout(() => {
        msgContainer.innerHTML += `
          <div class="chat-bubble chat-bubble-ai">${aiReply.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</div>
        `;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 400);
    }
  };

  window.sendQuickAIQuery = function(queryText) {
    const input = document.getElementById("ai-chat-input");
    if (input) {
      input.value = queryText;
      sendAIChatMessage();
    }
  };

  // --- ADMIN PANEL RENDERER ---
  function renderAdminPanel() {
    const metrics = UniFitAdmin.getAdminMetrics();
    document.getElementById("admin-stat-users").innerText = metrics.totalUsers.toLocaleString("pt-BR");
    document.getElementById("admin-stat-active").innerText = metrics.activeWorkoutsToday.toLocaleString("pt-BR");
    document.getElementById("admin-stat-plans").innerText = metrics.plansGenerated.toLocaleString("pt-BR");

    const users = UniFitAdmin.getMockUsers();
    const tbody = document.getElementById("admin-users-tbody");
    if (tbody) {
      tbody.innerHTML = users.map(u => `
        <tr>
          <td style="font-weight:600; color:#FFFFFF;">${u.name}</td>
          <td>${u.email}</td>
          <td><span class="badge badge-green">${u.plan}</span></td>
          <td>Nível ${u.level}</td>
          <td><span class="badge badge-green">${u.status}</span></td>
        </tr>
      `).join("");
    }
  }

  // Initial Section Route
  showSection("landing-section");
});
