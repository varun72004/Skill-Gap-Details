/* ==========================================================================
   SkillGap AI — Premium Interactive Core Script (app.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CANVAS NEURAL NETWORK PARTICLE SYSTEM
       ========================================================================== */
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    const maxDistance = 120; // Maximum distance to draw a line connection
    
    // Resize Canvas dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Particle Blueprints
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            // Cyan or Purple glowing nodes
            this.color = Math.random() > 0.5 ? "rgba(0, 242, 254, 0.4)" : "rgba(185, 39, 252, 0.3)";
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary checks
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // Populate particle nodes list
    function initParticles() {
        particlesArray = [];
        const count = Math.floor((canvas.width * canvas.height) / 16000); // Responsive count
        const finalCount = Math.min(Math.max(count, 30), 80); // Cap within boundary values
        for (let i = 0; i < finalCount; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Draw lines between nodes
    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.hypot(dx, dy);
                
                if (distance < maxDistance) {
                    const alpha = (1 - (distance / maxDistance)) * 0.12;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw deep spatial grid layer (static background lines)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.005)";
        ctx.lineWidth = 0.5;
        const gridSpacing = 80;
        for (let x = 0; x < canvas.width; x += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    
    // Re-initialize particles on major window modifications
    window.addEventListener("resize", () => {
        initParticles();
    });

    /* ==========================================================================
       2. MOUSE-FOLLOWING SPOTLIGHT GLOW EFFECT
       ========================================================================== */
    const spotlightCards = document.querySelectorAll(".card-spotlight");
    
    spotlightCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    /* ==========================================================================
       3. RESPONSIVE MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenuBtn.classList.toggle("open");
        
        // Animated hamburger morphing
        const spans = mobileMenuBtn.querySelectorAll("span");
        if (mobileMenuBtn.classList.contains("open")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -7px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            mobileMenuBtn.classList.remove("open");
            mobileMenuBtn.querySelectorAll("span").forEach(s => s.style.transform = "none");
            mobileMenuBtn.querySelectorAll("span")[1].style.opacity = "1";
        });
    });

    /* ==========================================================================
       4. INTERSECTION OBSERVER FOR FADE-IN ENTRANCES
       ========================================================================== */
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       5. INTERACTIVE RESUME ANALYZER SANDBOX MODULE
       ========================================================================== */
    
    // Sandbox Mock Data Store
    const sandboxData = {
        swe: {
            filename: "alex_rivers_resume.pdf",
            score: 84,
            rating: "Highly Competitive Profile",
            assessment: "The NLP parsing model identified excellent base syntax, language alignments, and database structures. Minimal gap exists surrounding modern automated Docker deployment pipelines and system scalability layouts.",
            documentText: `<strong>ALEX RIVERS</strong>
Full-Stack Software Engineer | Rivers.dev@email.com

<strong>[Summary]</strong>
High-performance engineer with 2+ years of experience structuring APIs and designing responsive web systems. Specialized in Python ecosystems.

<strong>[Core Competencies]</strong>
• Front-End: <span class="extracted">React.js</span>, HTML5, CSS3, Javascript (ES6)
• Back-End: <span class="extracted">FastAPI</span>, RESTful APIs, Node.js
• Databases: <span class="extracted">PostgreSQL</span>, MongoDB, Redis
• Tooling: <span class="extracted">Git & GitHub</span>, Postman, Linux

<strong>[Experience]</strong>
Backend developer at StackLabs. Engineered 14 async endpoints using <span class="extracted">Python</span> and FastAPI, lowering server responses by 22%. Constructed state components in React.js for operational dashboard modules.

<strong>[Missing / Gaps]</strong>
No exposure to <span class="missing">Docker</span> containers, <span class="missing">CI/CD Pipelines</span>, or scalable <span class="missing">System Design</span> configurations listed.`,
            skills: ["React.js", "FastAPI", "PostgreSQL", "Git & GitHub", "Python", "RESTful APIs"],
            missing: ["Docker Containers", "CI/CD Automation", "System Design Patterns"],
            radarLabels: ["Frontend UI", "Backend Architecture", "Systems & Scaling", "Database Design", "Testing/Tooling"],
            radarData: [92, 85, 45, 90, 78],
            roadmap: [
                {
                    icon: "🐋",
                    title: "Docker Containerization",
                    desc: "Containerize your FastAPI application using a multi-stage Dockerfile to align with professional cloud standardizations.",
                    linkText: "Read Docker Quickstart Guide",
                    linkUrl: "https://docs.docker.com/get-started/"
                },
                {
                    icon: "🚀",
                    title: "CI/CD Pipeline Setup",
                    desc: "Configure automated testing and continuous integration using GitHub Actions. Create build verifications.",
                    linkText: "Configure GitHub Actions",
                    linkUrl: "https://github.com/features/actions"
                },
                {
                    icon: "📐",
                    title: "System Scaling & Microservices",
                    desc: "Review basic concepts on vertical vs horizontal scaling, load balancers, and distributed cache models.",
                    linkText: "Study System Design Primer",
                    linkUrl: "https://github.com/donnemartin/system-design-primer"
                }
            ]
        },
        ds: {
            filename: "sarah_chen_resume.pdf",
            score: 71,
            rating: "Solid Technical Foundation",
            assessment: "Highly skilled in quantitative model training, regression arrays, and raw relational operations. Critical gaps exist surrounding text taxonomy architectures, parsing networks, and localized containerized deployment strategies.",
            documentText: `<strong>SARAH CHEN</strong>
Data Scientist & Quantitative Analyst | Chen.datasci@email.com

<strong>[Summary]</strong>
Analytic data professional specializing in model evaluation, training matrices, and statistical pipeline developments.

<strong>[Technical Competencies]</strong>
• Programming: <span class="extracted">Python</span>, SQL, R
• Machine Learning: <span class="extracted">Scikit-learn</span>, Linear Regression, KNN
• Databases: <span class="extracted">MySQL</span>, SQLite
• Libraries: Pandas, NumPy, Matplotlib

<strong>[Experience]</strong>
Data Analyst at FinMetrics. Constructed prediction classifiers using Python and Scikit-learn, yielding a 9% increase in analytical precision metrics. Standardized complex MySQL tables.

<strong>[Missing / Gaps]</strong>
Lacks required operational competencies in Natural Language Processing (<span class="missing">spaCy</span>, <span class="missing">NLTK</span>), Deep Learning, or containerized deployments (<span class="missing">Docker</span>).`,
            skills: ["Python", "Scikit-learn", "MySQL", "Pandas & Numpy", "Statistical Modeling"],
            missing: ["spaCy NLP", "NLTK Entity Training", "Docker Ingestion", "Deep Learning Models"],
            radarLabels: ["Mathematical Modeling", "Machine Learning", "Data Engineering", "NLP Engineering", "Deployment Operations"],
            radarData: [95, 82, 65, 35, 20],
            roadmap: [
                {
                    icon: "🧠",
                    title: "Natural Language Processing (NLP) with spaCy",
                    desc: "Master rule-based and statistics-based Named Entity Recognition (NER) models to extract structured parameters.",
                    linkText: "Explore spaCy Course",
                    linkUrl: "https://course.spacy.io/"
                },
                {
                    icon: "📊",
                    title: "NLTK Tokenization & Stemming",
                    desc: "Review text normalizations, corpus processing, and tokenizing syntax models for clean NLP pipeline inputs.",
                    linkText: "Read NLTK Documentation",
                    linkUrl: "https://www.nltk.org/"
                },
                {
                    icon: "🐋",
                    title: "ML Model Container Ingestion",
                    desc: "Containerize trained classifiers to deploy models as accessible, high-performance web microservices.",
                    linkText: "Dockerize Python Apps",
                    linkUrl: "https://docs.docker.com/language/python/"
                }
            ]
        },
        devops: {
            filename: "marcus_vance_resume.pdf",
            score: 62,
            rating: "Intermediate Operational Profile",
            assessment: "Possesses strong foundational configurations of server environments, Linux shell utilities, and basic Docker files. Significant skill gaps exist in scalable cluster operations, automated continuous pipelines, and telemetry systems.",
            documentText: `<strong>MARCUS VANCE</strong>
Systems Operator & Support Engineer | Vance.ops@email.com

<strong>[Summary]</strong>
System administrator with 3+ years managing virtual architectures, server maintenance arrays, and basic terminal configurations.

<strong>[Operational Core]</strong>
• Scripting: <span class="extracted">Python</span>, Bash Shell scripting
• Architecture: Linux servers, VirtualBox, VMWare
• Tools: <span class="extracted">Git & GitHub</span>, SSH, Nginx
• Containers: <span class="extracted">Docker</span> (Basic composing)

<strong>[Experience]</strong>
Support Admin at CloudOps Ltd. Configured local VM clusters; wrote bash scripts reducing routine logs cleanups by 4 hours weekly. Set up simple Docker containers for development environments.

<strong>[Missing / Gaps]</strong>
No active mentions of clustered schedulers (<span class="missing">Kubernetes</span>), orchestration configurations (<span class="missing">AWS CloudFormation</span>), continuous pipelines (<span class="missing">CI/CD Pipelines</span>), or telemetry systems (<span class="missing">Prometheus Monitoring</span>).`,
            skills: ["Python", "Docker Containers", "Git & GitHub", "Linux Shell", "Nginx web servers"],
            missing: ["Kubernetes Clustering", "AWS CloudFormation", "CI/CD Orchestration", "Prometheus Telemetry"],
            radarLabels: ["Cloud Systems", "IaC Configurations", "Container Orchestration", "CI/CD Systems", "Observability/Logging"],
            radarData: [55, 42, 60, 45, 30],
            roadmap: [
                {
                    icon: "☸",
                    title: "Kubernetes Cluster Management",
                    desc: "Understand pods, deployment services, and distributed ingress configurations to manage clustered containerized assets.",
                    linkText: "Learn Kubernetes Basics",
                    linkUrl: "https://kubernetes.io/docs/tutorials/kubernetes-basics/"
                },
                {
                    icon: "📜",
                    title: "Infrastructure as Code (AWS CloudFormation)",
                    desc: "Learn to declare cloud resources in structured template forms to automate deployment environments.",
                    linkText: "Study CloudFormation Guides",
                    linkUrl: "https://aws.amazon.com/cloudformation/"
                },
                {
                    icon: "📈",
                    title: "Prometheus Observability metrics",
                    desc: "Integrate dashboard metric monitoring and alert management layers to maintain runtime service reliability.",
                    linkText: "Study Prometheus Setup",
                    linkUrl: "https://prometheus.io/docs/introduction/overview/"
                }
            ]
        }
    };
    
    // DOM Selectors
    const roleBtns = document.querySelectorAll(".role-btn");
    const btnScan = document.getElementById("btn-trigger-scan");
    const docFilename = document.getElementById("sandbox-filename");
    const docText = document.getElementById("document-text");
    const terminalLogs = document.getElementById("terminal-logs");
    const reportEmpty = document.getElementById("report-empty");
    const reportActive = document.getElementById("report-active");
    
    const circularFillBar = document.getElementById("circular-fill-bar");
    const scoreText = document.getElementById("score-text");
    const matchRating = document.getElementById("match-rating");
    const assessmentP = document.getElementById("assessment-p");
    
    const extractedPills = document.getElementById("extracted-pills");
    const missingPills = document.getElementById("missing-pills");
    const roadmapItems = document.getElementById("roadmap-items");
    const laser = document.getElementById("laser");
    
    let activeRole = "swe";
    let chartInstance = null;
    
    // Set Initial Document Text on Load
    function loadPresetProfile(role) {
        const data = sandboxData[role];
        docFilename.textContent = data.filename;
        docText.innerHTML = data.documentText;
        
        // Strip colors/extracted/missing tags for initial state
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.documentText;
        
        // Make matching/extracted skills look normal initially (representing a raw document before system analysis)
        tempDiv.querySelectorAll(".extracted, .missing").forEach(el => {
            el.className = ""; // Remove classification highlights
        });
        docText.innerHTML = tempDiv.innerHTML;
        
        // Reset terminal
        terminalLogs.innerHTML = `<span class="term-line prompt">[SYSTEM]: Selected template: <strong>${data.filename}</strong>. Ready to initialize parsing scan.</span>`;
    }
    
    // Initial Load
    loadPresetProfile("swe");
    
    // Handle Role Button Selector
    roleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("active")) return;
            
            // Toggle active classes
            roleBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            activeRole = btn.getAttribute("data-role");
            loadPresetProfile(activeRole);
            
            // Hide previous active report, show empty state
            reportActive.classList.add("hidden");
            reportEmpty.classList.remove("hidden");
        });
    });
    
    // Trigger Automated Scanner Simulation
    btnScan.addEventListener("click", () => {
        btnScan.disabled = true;
        btnScan.textContent = "Scanning Engine Processing...";
        
        // Clear empty state immediately, but keep report hidden during scan animation
        reportEmpty.classList.add("hidden");
        reportActive.classList.add("hidden");
        
        // Start horizontal laser scan animation
        laser.classList.add("scanning");
        
        // Clear terminal
        terminalLogs.innerHTML = "";
        
        // Simulated terminal logs lines
        const data = sandboxData[activeRole];
        const logLines = [
            { text: `[SYSTEM]: Ingesting file stream: ${data.filename}... OK`, delay: 100, type: "system" },
            { text: `[PARSER]: Extracting layout metadata blocks... PDF elements decoded.`, delay: 400, type: "system" },
            { text: `[NLP]: Extracting keyword embeddings via customized Named Entity Recognition models...`, delay: 700, type: "nlp" },
            { text: `[NLP]: Success! Resolved skills taxonomy against 4,200 standard entities.`, delay: 1000, type: "nlp" },
            { text: `[ML MODEL]: Cross-referencing profiles against ${activeRole === 'swe' ? 'Software Engineer' : activeRole === 'ds' ? 'Data Scientist' : 'DevOps Engineer'} market requirements.`, delay: 1300, type: "system" },
            { text: `[SYSTEM]: Generating match metrics and career path recommendations...`, delay: 1600, type: "system" },
            { text: `[CORE]: Completed parse sequence! Initializing visual telemetry interface.`, delay: 1900, type: "system" }
        ];
        
        logLines.forEach(line => {
            setTimeout(() => {
                const span = document.createElement("span");
                span.className = `term-line ${line.type}`;
                span.innerHTML = line.text;
                terminalLogs.appendChild(span);
                terminalLogs.scrollTop = terminalLogs.scrollHeight; // Auto-scroll logs
            }, line.delay);
        });
        
        // Animate parsed keywords within the raw text document
        setTimeout(() => {
            docText.innerHTML = data.documentText; // Re-load document with highlighted spans
        }, 800);
        
        // Complete Scan Animation and Render Report Panel
        setTimeout(() => {
            // End laser
            laser.classList.remove("scanning");
            btnScan.disabled = false;
            btnScan.textContent = "Parse Resume & Generate Report";
            
            // Show active report panel with smooth fade in
            reportActive.classList.remove("hidden");
            
            // Render all active analytical components
            renderReport(data);
        }, 2200);
    });
    
    // Core Report Telemetry Render Function
    function renderReport(data) {
        
        /* 1. Score Circle Progress Animation */
        const finalScore = data.score;
        scoreText.textContent = "0%";
        
        // Math representation: circle perimeter is 2 * PI * r = 2 * 3.1416 * 50 = 314.16
        const strokeMaxOffset = 314.16;
        circularFillBar.style.strokeDashoffset = strokeMaxOffset;
        
        let currentCount = 0;
        const speed = 15; // Animation speed modifier
        
        const countInterval = setInterval(() => {
            currentCount++;
            if (currentCount >= finalScore) {
                currentCount = finalScore;
                clearInterval(countInterval);
            }
            scoreText.textContent = `${currentCount}%`;
            
            // Map score percentage to strokeDashoffset
            const mappedOffset = strokeMaxOffset - (strokeMaxOffset * currentCount) / 100;
            circularFillBar.style.strokeDashoffset = mappedOffset;
        }, speed);
        
        /* 2. Update Header Text Metadatas */
        matchRating.textContent = data.rating;
        
        // Dynamic styling for match rating
        if (data.score >= 80) {
            matchRating.className = "text-glow-cyan";
        } else if (data.score >= 70) {
            matchRating.className = "text-glow-purple";
        } else {
            matchRating.className = "text-glow-purple";
            matchRating.style.color = "var(--warning)";
            matchRating.style.textShadow = "0 0 10px rgba(255, 179, 0, 0.4)";
        }
        
        assessmentP.textContent = data.assessment;
        
        /* 3. Extracted & Missing Tag Lists Ingestion */
        extractedPills.innerHTML = "";
        data.skills.forEach(skill => {
            const pill = document.createElement("span");
            pill.className = "pill pill-green";
            pill.textContent = skill;
            extractedPills.appendChild(pill);
        });
        
        missingPills.innerHTML = "";
        data.missing.forEach(skill => {
            const pill = document.createElement("span");
            pill.className = "pill pill-red";
            pill.textContent = skill;
            missingPills.appendChild(pill);
        });
        
        /* 4. Actionable Roadmap Drawer Ingestion */
        roadmapItems.innerHTML = "";
        data.roadmap.forEach(item => {
            const row = document.createElement("div");
            row.className = "roadmap-item card-spotlight";
            row.innerHTML = `
                <span class="roadmap-icon">${item.icon}</span>
                <div class="roadmap-text">
                    <strong>${item.title}</strong>
                    <p>${item.desc}</p>
                    <a href="${item.linkUrl}" target="_blank" class="roadmap-link">${item.linkText} →</a>
                </div>
            `;
            roadmapItems.appendChild(row);
        });
        
        // Re-apply spotlight cursor handles to newly generated dynamic roadmap items
        const newSpotlights = roadmapItems.querySelectorAll(".card-spotlight");
        newSpotlights.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });

        /* 5. Chart.js Visualization Render */
        if (chartInstance) {
            chartInstance.destroy(); // Clear previous instance
        }
        
        const chartCtx = document.getElementById("sandbox-chart").getContext("2d");
        
        // Modern custom styling colors for dynamic chart grid line layers
        Chart.defaults.color = "rgba(143, 162, 196, 0.7)";
        Chart.defaults.font.family = "Outfit";
        
        chartInstance = new Chart(chartCtx, {
            type: "radar",
            data: {
                labels: data.radarLabels,
                datasets: [{
                    label: "Candidate Skill Level (%)",
                    data: data.radarData,
                    backgroundColor: "rgba(0, 242, 254, 0.15)",
                    borderColor: "rgba(0, 242, 254, 0.85)",
                    borderWidth: 2,
                    pointBackgroundColor: "#00f2fe",
                    pointBorderColor: "#030712",
                    pointHoverBackgroundColor: "#ffffff",
                    pointHoverBorderColor: "#00f2fe",
                    pointRadius: 4,
                    pointHoverRadius: 6
                }, {
                    label: "Industry Standard Benchmark (%)",
                    data: [85, 80, 85, 80, 85], // Static industry benchmarks
                    backgroundColor: "rgba(185, 39, 252, 0.05)",
                    borderColor: "rgba(185, 39, 252, 0.45)",
                    borderWidth: 1.5,
                    borderDash: [4, 4],
                    pointBackgroundColor: "rgba(185, 39, 252, 0.5)",
                    pointBorderColor: "#030712",
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                        labels: {
                            font: { size: 10, weight: 500 },
                            boxWidth: 12
                        }
                    }
                },
                scales: {
                    r: {
                        grid: { color: "rgba(255, 255, 255, 0.05)" },
                        angleLines: { color: "rgba(255, 255, 255, 0.05)" },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            display: false, // Hide numeric values to maintain minimal premium vibe
                            stepSize: 20
                        },
                        pointLabels: {
                            font: { size: 10, weight: 600 },
                            color: "#8fa2c4"
                        }
                    }
                }
            }
        });
        
    }

    /* ==========================================================================
       6. INTERACTIVE TIMELINE DRAWER & DYNAMIC PROGRESS
       ========================================================================== */
    const milestones = document.querySelectorAll(".collapsible-milestone");
    const timelineIndicator = document.getElementById("timeline-indicator-bar");
    const timelineProgressText = document.getElementById("global-progress-value");
    const timelineConnectorFill = document.getElementById("timeline-scroll-fill");
    
    // Total milestones count
    const totalMilestones = milestones.length;
    
    // Track active nodes
    let activeNodesCount = totalMilestones; // Defaults to fully complete
    
    function updateTimelineIndicators() {
        // Calculate global completion rate based on active/expanded elements
        const percentage = Math.round((activeNodesCount / totalMilestones) * 100);
        timelineProgressText.textContent = `${percentage}%`;
        timelineIndicator.style.width = `${percentage}%`;
        
        // Fill connector connector line
        const scaleY = activeNodesCount / totalMilestones;
        timelineConnectorFill.style.transform = `scaleY(${scaleY})`;
    }
    
    // Expand first node by default on loading
    if (milestones.length > 0) {
        const firstNode = milestones[0];
        firstNode.classList.add("active-node");
        firstNode.querySelector(".timeline-item-details").classList.remove("hidden");
        firstNode.querySelector(".toggle-icon").textContent = "▲";
        activeNodesCount = 1; // Start progress tracking matching only first node expanded
        updateTimelineIndicators();
    }
    
    milestones.forEach(milestone => {
        milestone.addEventListener("click", () => {
            const details = milestone.querySelector(".timeline-item-details");
            const toggleIcon = milestone.querySelector(".toggle-icon");
            
            // Toggle active classes
            milestone.classList.toggle("active-node");
            
            if (milestone.classList.contains("active-node")) {
                details.classList.remove("hidden");
                toggleIcon.textContent = "▲";
            } else {
                details.classList.add("hidden");
                toggleIcon.textContent = "▼";
            }
            
            // Recalculate how many milestones are currently active/expanded
            const activeNodes = document.querySelectorAll(".collapsible-milestone.active-node");
            activeNodesCount = activeNodes.length;
            
            updateTimelineIndicators();
        });
    });

    // Custom smooth scroll navigation link triggers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset header height
                    behavior: 'smooth'
                });
            }
        });
    });

});
