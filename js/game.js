/**
 * Game Engine Utama - Petualangan Penjelajah PAI
 * Mengatur:
 * - Navigasi Layar (Home, Peta Pulau, Gameplay Kuis, Gameplay Urutan, Gameplay Jodohkan, Cerdas Cermat, Sertifikat)
 * - Sistem Poin, Bintang, Combo Streak
 * - Confetti Selebrasi Canvas
 * - LocalStorage State Saver
 */

class PAIGameEngine {
    constructor() {
        this.data = window.PAI_DATA || PAI_DATA;
        this.sound = window.soundSystem;

        // Player Data State
        this.studentName = localStorage.getItem('pai_student_name') || 'Sahabat Cilik PAI';
        this.schoolName = localStorage.getItem('pai_school_name') || 'SD / MI Indonesia';
        this.totalScore = parseInt(localStorage.getItem('pai_total_score') || '0', 10);
        this.starsEarned = JSON.parse(localStorage.getItem('pai_stars_earned') || '{}');
        this.completedLevels = JSON.parse(localStorage.getItem('pai_completed_levels') || '[]');

        // Current Session State
        this.currentView = 'home';
        this.activeIsland = null;
        this.activeLevel = null;
        this.currentQuestionIndex = 0;
        this.currentLevelScore = 0;
        this.levelMistakes = 0;

        // Cerdas Cermat State
        this.ccQuestions = [];
        this.ccIndex = 0;
        this.ccScore = 0;
        this.ccCombo = 1;
        this.ccTimer = 15;
        this.ccTimerInterval = null;

        // Sequence / Matching Temp State
        this.sequenceUserOrder = [];
        this.matchSelectedLeft = null;
        this.matchMatchedPairs = 0;

        this.initUI();
        this.initConfetti();
        this.setupKeyboard();
    }

    initUI() {
        this.updateHeaderStats();
        this.renderIslandsGrid();
        this.showView('home');

        // BGM toggle button
        const btnMute = document.getElementById('btnMute');
        if (btnMute) {
            btnMute.addEventListener('click', () => {
                const muted = this.sound.toggleMute();
                btnMute.innerHTML = muted ? '🔇 Suara: Mati' : '🔊 Suara: Aktif';
            });
        }
    }

    updateHeaderStats() {
        const elScore = document.getElementById('statTotalScore');
        const elStars = document.getElementById('statTotalStars');
        const elRank = document.getElementById('statRankTitle');
        const elStudent = document.getElementById('statStudentName');

        let totalStars = 0;
        Object.values(this.starsEarned).forEach(s => totalStars += s);

        if (elScore) elScore.textContent = this.totalScore;
        if (elStars) elStars.textContent = `${totalStars} ⭐`;
        if (elStudent) elStudent.textContent = this.studentName;

        let rankTitle = 'Thalibul Ilmi (Pencari Ilmu)';
        if (totalStars >= 14) rankTitle = 'Khadimul Ummah (Teladan PAI Utama)';
        else if (totalStars >= 10) rankTitle = 'Farisul Hikmah (Ksatria Berilmu)';
        else if (totalStars >= 5) rankTitle = 'Bintang Madrasah';
        if (elRank) elRank.textContent = rankTitle;
    }

    saveState() {
        localStorage.setItem('pai_student_name', this.studentName);
        localStorage.setItem('pai_school_name', this.schoolName);
        localStorage.setItem('pai_total_score', this.totalScore.toString());
        localStorage.setItem('pai_stars_earned', JSON.stringify(this.starsEarned));
        localStorage.setItem('pai_completed_levels', JSON.stringify(this.completedLevels));
        this.updateHeaderStats();
    }

    showView(viewName) {
        this.currentView = viewName;
        const views = document.querySelectorAll('.game-view');
        views.forEach(v => v.classList.add('hidden'));

        const target = document.getElementById(`view-${viewName}`);
        if (target) {
            target.classList.remove('hidden');
        }

        // Auto trigger BGM upon first user movement
        if (this.sound && !this.sound.isMuted) {
            this.sound.startBGM();
        }
    }

    /* ========================================================
       RENDER PETA 5 PULAU
       ======================================================== */
    renderIslandsGrid() {
        const container = document.getElementById('islandsContainer');
        if (!container) return;
        container.innerHTML = '';

        this.data.islands.forEach((island, idx) => {
            let islandStars = 0;
            island.levels.forEach(lvl => {
                islandStars += (this.starsEarned[lvl.id] || 0);
            });
            const maxStars = island.levels.length * 3;

            const card = document.createElement('div');
            card.className = `game-card relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${island.themeColor} border-2 border-white/20 shadow-xl cursor-pointer hover:border-amber-400/80 transition-all duration-300`;
            card.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <span class="text-4xl filter drop-shadow">${island.icon}</span>
                    <span class="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-amber-300/30">
                        ${island.badge}
                    </span>
                </div>
                <h3 class="text-xl font-black text-white mb-2">${island.name}</h3>
                <p class="text-xs text-emerald-100/90 leading-relaxed mb-4">${island.desc}</p>
                <div class="flex items-center justify-between pt-2 border-t border-white/10">
                    <span class="text-xs text-amber-300 font-bold">⭐ ${islandStars} / ${maxStars} Bintang</span>
                    <span class="text-xs bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-xl transition">
                        Buka Misi ➔
                    </span>
                </div>
            `;
            card.addEventListener('click', () => {
                this.sound.playClick();
                this.openIsland(island);
            });
            container.appendChild(card);
        });
    }

    openIsland(island) {
        this.activeIsland = island;
        const titleEl = document.getElementById('islandDetailTitle');
        const iconEl = document.getElementById('islandDetailIcon');
        const descEl = document.getElementById('islandDetailDesc');
        const levelsContainer = document.getElementById('islandLevelsContainer');

        if (titleEl) titleEl.textContent = island.name;
        if (iconEl) iconEl.textContent = island.icon;
        if (descEl) descEl.textContent = island.desc;

        if (levelsContainer) {
            levelsContainer.innerHTML = '';
            island.levels.forEach((lvl, idx) => {
                const stars = this.starsEarned[lvl.id] || 0;
                let starStr = '';
                for (let i = 0; i < 3; i++) {
                    starStr += (i < stars) ? '⭐' : '☆';
                }

                const lvlCard = document.createElement('div');
                lvlCard.className = 'flex items-center justify-between bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 hover:border-amber-400 transition cursor-pointer';
                lvlCard.innerHTML = `
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black flex items-center justify-center text-lg">
                            ${idx + 1}
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-base">${lvl.title}</h4>
                            <span class="text-xs text-emerald-300 uppercase font-semibold">Tipe: ${lvl.type === 'quiz' ? 'Kuis Pilihan Ganda' : lvl.type === 'sequence' ? 'Urutkan Rukun/Ayat' : 'Cocokkan Pasangan'}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-base tracking-widest text-amber-300 mb-1">${starStr}</div>
                        <button class="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-4 py-2 rounded-xl shadow-md transition">
                            ${stars > 0 ? 'Main Lagi ▶' : 'Mulai ▶'}
                        </button>
                    </div>
                `;
                lvlCard.addEventListener('click', () => {
                    this.sound.playClick();
                    this.startLevel(lvl);
                });
                levelsContainer.appendChild(lvlCard);
            });
        }

        this.showView('island-detail');
    }

    /* ========================================================
       GAMEPLAY: LEVEL LOADER
       ======================================================== */
    startLevel(level) {
        this.activeLevel = level;
        this.currentQuestionIndex = 0;
        this.currentLevelScore = 0;
        this.levelMistakes = 0;

        if (level.type === 'quiz') {
            this.renderQuizQuestion();
            this.showView('gameplay-quiz');
        } else if (level.type === 'sequence') {
            this.renderSequenceLevel();
            this.showView('gameplay-sequence');
        } else if (level.type === 'match') {
            this.renderMatchLevel();
            this.showView('gameplay-match');
        }
    }

    /* ========================================================
       TIPE 1: KUIS PILIHAN GANDA
       ======================================================== */
    renderQuizQuestion() {
        const questions = this.activeLevel.questions;
        const q = questions[this.currentQuestionIndex];
        const total = questions.length;

        document.getElementById('quizHeaderIsland').textContent = `${this.activeIsland.icon} ${this.activeIsland.name}`;
        document.getElementById('quizHeaderLevel').textContent = this.activeLevel.title;
        document.getElementById('quizProgressText').textContent = `Soal ${this.currentQuestionIndex + 1} dari ${total}`;
        document.getElementById('quizProgressBar').style.width = `${((this.currentQuestionIndex + 1) / total) * 100}%`;
        document.getElementById('quizQuestionText').textContent = q.q;

        const optionsContainer = document.getElementById('quizOptionsContainer');
        optionsContainer.innerHTML = '';

        const feedbackBox = document.getElementById('quizFeedbackBox');
        feedbackBox.className = 'hidden';
        feedbackBox.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn w-full text-left bg-emerald-950/70 hover:bg-emerald-800/80 border-2 border-emerald-500/30 rounded-2xl p-4 transition-all duration-200 flex items-center gap-3 text-white font-medium text-sm md:text-base';
            btn.innerHTML = `
                <span class="w-8 h-8 rounded-lg bg-emerald-500/30 text-amber-300 font-bold flex items-center justify-center flex-shrink-0">
                    ${letters[idx]}
                </span>
                <span class="flex-1">${opt}</span>
            `;
            btn.addEventListener('click', () => this.handleQuizAnswer(idx, q.answer, q.explanation));
            optionsContainer.appendChild(btn);
        });
    }

    handleQuizAnswer(selectedIdx, correctIdx, explanation) {
        const buttons = document.querySelectorAll('.quiz-option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === correctIdx) {
                btn.classList.add('border-green-400', 'bg-green-600/40', 'text-green-100');
            } else if (idx === selectedIdx) {
                btn.classList.add('border-red-400', 'bg-red-600/40', 'text-red-100');
            }
        });

        const feedbackBox = document.getElementById('quizFeedbackBox');
        feedbackBox.classList.remove('hidden');

        if (selectedIdx === correctIdx) {
            this.sound.playCorrect();
            this.currentLevelScore += 20;
            this.triggerConfettiMini();
            feedbackBox.className = 'mt-4 p-4 rounded-2xl bg-green-900/60 border border-green-500/40 text-green-200 text-sm animate-fadeIn';
            feedbackBox.innerHTML = `
                <div class="font-bold text-green-300 mb-1">🎉 Maa Syaa Allah, Jawabanmu Tepat!</div>
                <div>${explanation}</div>
                <button id="btnNextQuiz" class="mt-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-5 py-2 rounded-xl text-sm shadow">
                    Lanjut Soal Berikutnya ➔
                </button>
            `;
        } else {
            this.sound.playWrong();
            this.levelMistakes++;
            feedbackBox.className = 'mt-4 p-4 rounded-2xl bg-red-900/60 border border-red-500/40 text-red-200 text-sm animate-fadeIn';
            feedbackBox.innerHTML = `
                <div class="font-bold text-red-300 mb-1">❌ Kurang Tepat, Perhatikan Penjelasan Ini:</div>
                <div>${explanation}</div>
                <button id="btnNextQuiz" class="mt-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-5 py-2 rounded-xl text-sm shadow">
                    Lanjut ➔
                </button>
            `;
        }

        document.getElementById('btnNextQuiz').addEventListener('click', () => {
            this.sound.playClick();
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex < this.activeLevel.questions.length) {
                this.renderQuizQuestion();
            } else {
                this.completeLevel();
            }
        });
    }

    /* ========================================================
       TIPE 2: SUSUN URUTAN (SEQUENCE)
       ======================================================== */
    renderSequenceLevel() {
        const lvl = this.activeLevel;
        document.getElementById('seqHeaderIsland').textContent = `${this.activeIsland.icon} ${this.activeIsland.name}`;
        document.getElementById('seqHeaderTitle').textContent = lvl.title;
        document.getElementById('seqInstruction').textContent = lvl.instruction;

        this.sequenceUserOrder = [];
        const poolContainer = document.getElementById('seqPoolContainer');
        const targetContainer = document.getElementById('seqTargetContainer');
        const checkBtn = document.getElementById('btnCheckSequence');

        poolContainer.innerHTML = '';
        targetContainer.innerHTML = '';
        checkBtn.classList.add('opacity-50', 'pointer-events-none');

        // Acak item untuk kolam pilihan
        const shuffled = [...lvl.items].sort(() => Math.random() - 0.5);

        shuffled.forEach(item => {
            const el = document.createElement('div');
            el.className = 'seq-item p-3.5 bg-emerald-950/80 border-2 border-emerald-500/40 hover:border-amber-400 rounded-2xl cursor-pointer text-white text-sm font-semibold flex items-center justify-between transition-all';
            el.innerHTML = `
                <div>
                    <div class="text-amber-300 font-bold">${item.text}</div>
                    <div class="text-xs text-emerald-200/80 mt-0.5">${item.translation}</div>
                </div>
                <span class="text-xs bg-amber-400 text-emerald-950 font-black px-2.5 py-1 rounded-lg ml-2">+ Pilih</span>
            `;
            el.addEventListener('click', () => {
                this.sound.playClick();
                this.addToSequence(item, el);
            });
            poolContainer.appendChild(el);
        });
    }

    addToSequence(item, poolElement) {
        if (this.sequenceUserOrder.find(x => x.id === item.id)) return;
        this.sequenceUserOrder.push(item);
        poolElement.classList.add('opacity-30', 'pointer-events-none');

        const targetContainer = document.getElementById('seqTargetContainer');
        const slot = document.createElement('div');
        slot.className = 'p-3 bg-amber-400/20 border border-amber-400/50 rounded-2xl flex items-center justify-between text-white text-sm animate-fadeIn';
        slot.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center">
                    ${this.sequenceUserOrder.length}
                </span>
                <div>
                    <span class="font-bold text-amber-200">${item.text}</span>
                    <span class="text-xs text-white/70 block">${item.translation}</span>
                </div>
            </div>
            <button class="text-xs text-red-300 hover:text-red-100 font-bold px-2 py-1 bg-red-950/40 rounded-lg">✕ Hapus</button>
        `;
        slot.querySelector('button').addEventListener('click', () => {
            this.sound.playClick();
            this.removeFromSequence(item, poolElement, slot);
        });
        targetContainer.appendChild(slot);

        // Jika semua sudah disusun, aktifkan tombol cek
        const checkBtn = document.getElementById('btnCheckSequence');
        if (this.sequenceUserOrder.length === this.activeLevel.items.length) {
            checkBtn.classList.remove('opacity-50', 'pointer-events-none');
            checkBtn.onclick = () => this.evaluateSequence();
        }
    }

    removeFromSequence(item, poolElement, slotElement) {
        this.sequenceUserOrder = this.sequenceUserOrder.filter(x => x.id !== item.id);
        poolElement.classList.remove('opacity-30', 'pointer-events-none');
        slotElement.remove();

        // Refresh urutan angka nomor
        const targetContainer = document.getElementById('seqTargetContainer');
        const slots = targetContainer.children;
        for (let i = 0; i < slots.length; i++) {
            const badge = slots[i].querySelector('span');
            if (badge) badge.textContent = i + 1;
        }

        const checkBtn = document.getElementById('btnCheckSequence');
        checkBtn.classList.add('opacity-50', 'pointer-events-none');
    }

    evaluateSequence() {
        const correct = this.activeLevel.items;
        let isAllCorrect = true;
        for (let i = 0; i < correct.length; i++) {
            if (this.sequenceUserOrder[i].id !== correct[i].id) {
                isAllCorrect = false;
                break;
            }
        }

        if (isAllCorrect) {
            this.sound.playCorrect();
            this.currentLevelScore = 100;
            this.triggerConfetti();
            alert('🎉 Maa Syaa Allah! Susunan urutanmu sempurna 100%!');
            this.completeLevel();
        } else {
            this.sound.playWrong();
            this.levelMistakes++;
            alert('❌ Masih ada urutan yang kurang tepat. Perhatikan kembali langkah atau susunan ayatnya ya!');
        }
    }

    /* ========================================================
       TIPE 3: COCOKKAN PASANGAN (MATCHING)
       ======================================================== */
    renderMatchLevel() {
        const lvl = this.activeLevel;
        document.getElementById('matchHeaderIsland').textContent = `${this.activeIsland.icon} ${this.activeIsland.name}`;
        document.getElementById('matchHeaderTitle').textContent = lvl.title;
        document.getElementById('matchInstruction').textContent = lvl.instruction;

        const leftCol = document.getElementById('matchLeftCol');
        const rightCol = document.getElementById('matchRightCol');
        leftCol.innerHTML = '';
        rightCol.innerHTML = '';

        this.matchSelectedLeft = null;
        this.matchMatchedPairs = 0;

        const shuffledRight = [...lvl.pairs].sort(() => Math.random() - 0.5);

        lvl.pairs.forEach((pair, idx) => {
            const btnLeft = document.createElement('button');
            btnLeft.className = 'match-left-btn w-full text-left p-4 bg-emerald-950/80 border-2 border-emerald-500/40 hover:border-amber-400 rounded-2xl text-white font-bold transition';
            btnLeft.textContent = pair.left;
            btnLeft.dataset.pairId = pair.left;
            btnLeft.addEventListener('click', () => {
                this.sound.playClick();
                document.querySelectorAll('.match-left-btn').forEach(b => b.classList.remove('border-amber-400', 'bg-amber-400/20'));
                btnLeft.classList.add('border-amber-400', 'bg-amber-400/20');
                this.matchSelectedLeft = btnLeft;
            });
            leftCol.appendChild(btnLeft);
        });

        shuffledRight.forEach(pair => {
            const btnRight = document.createElement('button');
            btnRight.className = 'match-right-btn w-full text-left p-4 bg-emerald-950/80 border-2 border-emerald-500/40 hover:border-amber-400 rounded-2xl text-emerald-100 text-sm font-medium transition';
            btnRight.textContent = pair.right;
            btnRight.dataset.expectedLeft = pair.left;
            btnRight.addEventListener('click', () => {
                if (!this.matchSelectedLeft) {
                    alert('👉 Pilih sifat/nama di kolom kiri terlebih dahulu!');
                    return;
                }
                const selectedLeftId = this.matchSelectedLeft.dataset.pairId;
                if (selectedLeftId === btnRight.dataset.expectedLeft) {
                    this.sound.playCorrect();
                    this.matchSelectedLeft.classList.add('bg-green-600/50', 'border-green-400', 'pointer-events-none');
                    btnRight.classList.add('bg-green-600/50', 'border-green-400', 'pointer-events-none');
                    this.matchSelectedLeft = null;
                    this.matchMatchedPairs++;

                    if (this.matchMatchedPairs === lvl.pairs.length) {
                        this.currentLevelScore = 100;
                        this.triggerConfetti();
                        setTimeout(() => {
                            alert('🎉 Mumtaz! Semua pasangan berhasil dicocokkan dengan benar!');
                            this.completeLevel();
                        }, 500);
                    }
                } else {
                    this.sound.playWrong();
                    this.levelMistakes++;
                    btnRight.classList.add('border-red-500', 'bg-red-600/40');
                    setTimeout(() => {
                        btnRight.classList.remove('border-red-500', 'bg-red-600/40');
                    }, 600);
                }
            });
            rightCol.appendChild(btnRight);
        });
    }

    /* ========================================================
       LEVEL COMPLETION & RATING
       ======================================================== */
    completeLevel() {
        this.sound.playFanfare();
        this.triggerConfetti();

        let stars = 3;
        if (this.levelMistakes === 1) stars = 2;
        else if (this.levelMistakes >= 2) stars = 1;

        const currentStar = this.starsEarned[this.activeLevel.id] || 0;
        if (stars > currentStar) {
            this.starsEarned[this.activeLevel.id] = stars;
        }

        if (!this.completedLevels.includes(this.activeLevel.id)) {
            this.completedLevels.push(this.activeLevel.id);
        }

        this.totalScore += this.currentLevelScore;
        this.saveState();

        // Render Layar Hasil
        document.getElementById('resultLevelTitle').textContent = this.activeLevel.title;
        document.getElementById('resultScoreEarned').textContent = `+${this.currentLevelScore}`;
        
        let starDisplay = '';
        for (let i = 0; i < 3; i++) {
            starDisplay += (i < stars) ? '⭐' : '☆';
        }
        document.getElementById('resultStars').textContent = starDisplay;

        const desc = stars === 3 ? 'Maa Syaa Allah! Pengetahuan PAI-mu luar biasa sempurna (Mumtaz)!' :
                     stars === 2 ? 'Alhamdulillah! Nilaimu sangat baik (Jayyid Jiddan), tingkatkan lagi!' :
                     'Terus bersemangat belajar, Insya Allah kamu bisa meraih 3 bintang penuh!';
        document.getElementById('resultDescription').textContent = desc;

        document.getElementById('btnResultContinue').onclick = () => {
            this.sound.playClick();
            this.openIsland(this.activeIsland);
        };
        document.getElementById('btnResultRetry').onclick = () => {
            this.sound.playClick();
            this.startLevel(this.activeLevel);
        };

        this.showView('level-result');
    }

    /* ========================================================
       MODE 2: CERDAS CERMAT TIMER (Kuis Kilat 15 Detik)
       ======================================================== */
    startCerdasCermat() {
        this.ccQuestions = [...this.data.cerdasCermatBank].sort(() => Math.random() - 0.5).slice(0, 5);
        this.ccIndex = 0;
        this.ccScore = 0;
        this.ccCombo = 1;

        document.getElementById('ccScoreDisplay').textContent = '0';
        document.getElementById('ccComboDisplay').textContent = 'x1';
        this.renderCerdasCermatQuestion();
        this.showView('cerdas-cermat');
    }

    renderCerdasCermatQuestion() {
        if (this.ccIndex >= this.ccQuestions.length) {
            this.finishCerdasCermat();
            return;
        }

        const q = this.ccQuestions[this.ccIndex];
        document.getElementById('ccCategoryBadge').textContent = q.category;
        document.getElementById('ccQuestionIndex').textContent = `Soal ${this.ccIndex + 1} / ${this.ccQuestions.length}`;
        document.getElementById('ccQuestionText').textContent = q.q;

        const optionsContainer = document.getElementById('ccOptionsContainer');
        optionsContainer.innerHTML = '';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-4 bg-emerald-950/80 hover:bg-emerald-800 border-2 border-emerald-500/40 rounded-2xl text-white font-medium text-sm md:text-base transition';
            btn.innerHTML = `<span class="font-bold text-amber-300 mr-2">[${idx + 1}]</span> ${opt}`;
            btn.addEventListener('click', () => this.handleCCAnswer(idx === q.answer));
            optionsContainer.appendChild(btn);
        });

        // Jalankan Timer 15 Detik
        this.ccTimer = 15;
        this.updateCCTimerUI();
        if (this.ccTimerInterval) clearInterval(this.ccTimerInterval);
        this.ccTimerInterval = setInterval(() => {
            this.ccTimer -= 0.1;
            if (this.ccTimer <= 0) {
                this.ccTimer = 0;
                this.updateCCTimerUI();
                clearInterval(this.ccTimerInterval);
                this.handleCCAnswer(false, true);
            } else {
                this.updateCCTimerUI();
            }
        }, 100);
    }

    updateCCTimerUI() {
        const bar = document.getElementById('ccTimerBar');
        const text = document.getElementById('ccTimerText');
        const pct = Math.max(0, (this.ccTimer / 15) * 100);
        if (bar) {
            bar.style.width = `${pct}%`;
            bar.style.backgroundColor = this.ccTimer < 4 ? '#EF4444' : this.ccTimer < 8 ? '#F59E0B' : '#10B981';
        }
        if (text) text.textContent = `${Math.ceil(this.ccTimer)}s`;

        if (this.ccTimer <= 3.5 && Math.floor(this.ccTimer * 10) % 5 === 0) {
            this.sound.playTick();
        }
    }

    handleCCAnswer(isCorrect, isTimeout = false) {
        clearInterval(this.ccTimerInterval);
        if (isCorrect) {
            this.sound.playCorrect();
            const points = 25 * this.ccCombo;
            this.ccScore += points;
            this.ccCombo++;
            this.triggerConfettiMini();
        } else {
            this.sound.playWrong();
            this.ccCombo = 1;
        }

        document.getElementById('ccScoreDisplay').textContent = this.ccScore;
        document.getElementById('ccComboDisplay').textContent = `x${this.ccCombo}`;

        setTimeout(() => {
            this.ccIndex++;
            this.renderCerdasCermatQuestion();
        }, 600);
    }

    finishCerdasCermat() {
        this.sound.playFanfare();
        this.totalScore += this.ccScore;
        this.saveState();
        alert(`🏆 Cerdas Cermat Selesai!\nSkor yang kamu dapatkan: ${this.ccScore} Poin!`);
        this.showView('home');
    }

    /* ========================================================
       GENERATOR SERTIFIKAT PRESTASI PAI
       ======================================================== */
    renderCertificateView() {
        let totalStars = 0;
        Object.values(this.starsEarned).forEach(s => totalStars += s);

        const nameInput = document.getElementById('certInputName');
        const schoolInput = document.getElementById('certInputSchool');
        if (nameInput) nameInput.value = this.studentName;
        if (schoolInput) schoolInput.value = this.schoolName;

        this.updateCertificatePreview();
        this.showView('certificate');
    }

    updateCertificatePreview() {
        const nameInput = document.getElementById('certInputName');
        const schoolInput = document.getElementById('certInputSchool');
        if (nameInput && nameInput.value.trim()) this.studentName = nameInput.value.trim();
        if (schoolInput && schoolInput.value.trim()) this.schoolName = schoolInput.value.trim();
        this.saveState();

        let totalStars = 0;
        Object.values(this.starsEarned).forEach(s => totalStars += s);

        document.getElementById('certPreviewName').textContent = this.studentName;
        document.getElementById('certPreviewSchool').textContent = this.schoolName;
        document.getElementById('certPreviewScore').textContent = `${this.totalScore} Pts`;
        document.getElementById('certPreviewStars').textContent = `${totalStars} / 45 ⭐`;

        let predicate = 'MUMTAZ (Istimewa)';
        if (totalStars < 10) predicate = 'JAYYID (Baik)';
        else if (totalStars < 25) predicate = 'JAYYID JIDDAN (Sangat Baik)';
        document.getElementById('certPreviewPredicate').textContent = predicate;

        const today = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('certPreviewDate').textContent = today;
    }

    printCertificate() {
        window.print();
    }

    /* ========================================================
       CONFETTI CANVAS ANIMATION
       ======================================================== */
    initConfetti() {
        this.confettiCanvas = document.getElementById('confettiCanvas');
        if (!this.confettiCanvas) return;
        this.confettiCtx = this.confettiCanvas.getContext('2d');
        this.confettiParticles = [];

        window.addEventListener('resize', () => {
            this.confettiCanvas.width = window.innerWidth;
            this.confettiCanvas.height = window.innerHeight;
        });
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
    }

    triggerConfetti(count = 90) {
        if (!this.confettiCanvas) return;
        const colors = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#FBBF24'];
        for (let i = 0; i < count; i++) {
            this.confettiParticles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 16 - 4,
                rotation: Math.random() * 360,
                rspeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }
        if (!this.confettiActive) {
            this.animateConfetti();
        }
    }

    triggerConfettiMini() {
        this.triggerConfetti(30);
    }

    animateConfetti() {
        if (!this.confettiCtx) return;
        this.confettiActive = true;
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
            const p = this.confettiParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravitasi
            p.rotation += p.rspeed;
            p.opacity -= 0.012;

            this.confettiCtx.save();
            this.confettiCtx.translate(p.x, p.y);
            this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
            this.confettiCtx.fillStyle = p.color;
            this.confettiCtx.globalAlpha = Math.max(0, p.opacity);
            this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            this.confettiCtx.restore();

            if (p.opacity <= 0 || p.y > this.confettiCanvas.height + 20) {
                this.confettiParticles.splice(i, 1);
            }
        }

        if (this.confettiParticles.length > 0) {
            requestAnimationFrame(() => this.animateConfetti());
        } else {
            this.confettiActive = false;
            this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        }
    }

    /* ========================================================
       KEYBOARD SHORTCUTS (1-4 / A-D)
       ======================================================== */
    setupKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (this.currentView === 'gameplay-quiz') {
                const keyMap = {
                    'Digit1': 0, 'KeyA': 0, 'Numpad1': 0,
                    'Digit2': 1, 'KeyB': 1, 'Numpad2': 1,
                    'Digit3': 2, 'KeyC': 2, 'Numpad3': 2,
                    'Digit4': 3, 'KeyD': 3, 'Numpad4': 3
                };
                if (e.code in keyMap) {
                    const btns = document.querySelectorAll('.quiz-option-btn');
                    const idx = keyMap[e.code];
                    if (btns[idx] && !btns[idx].disabled) {
                        btns[idx].click();
                    }
                }
            } else if (this.currentView === 'cerdas-cermat') {
                const keyMap = {
                    'Digit1': 0, 'KeyA': 0, 'Numpad1': 0,
                    'Digit2': 1, 'KeyB': 1, 'Numpad2': 1,
                    'Digit3': 2, 'KeyC': 2, 'Numpad3': 2,
                    'Digit4': 3, 'KeyD': 3, 'Numpad4': 3
                };
                if (e.code in keyMap) {
                    const btns = document.querySelectorAll('#ccOptionsContainer button');
                    const idx = keyMap[e.code];
                    if (btns[idx]) btns[idx].click();
                }
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new PAIGameEngine();
});
