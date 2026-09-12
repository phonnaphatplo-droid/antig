/**
 * Main JavaScript for Digital Business Student Portfolio
 * Features: Dark/Light Mode, Typing Effect, Dynamic Modals, Filter Tabs, Form Validation, Smooth Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light Mode)
  initThemeToggle();

  // 2. Typing Effect in Hero Section
  initTypingEffect();

  // 3. Navbar Scrolled State & Scrollspy
  initNavbarScroll();

  // 4. Portfolio Filter Tabs
  initPortfolioFilter();

  // 5. Project Modal Population
  initProjectModals();

  // 6. Animated Stat Counters
  initStatCounters();

  // 7. Contact Form Submission & Toast
  initContactForm();

  // 8. Back to Top Button
  initBackToTop();
});

/* ==========================================================================
   1. Theme Toggle System
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeToggleBtn || !themeIcon) return;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'bi bi-sun-fill text-warning';
      themeToggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)');
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill text-primary';
      themeToggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดมืด (Dark Mode)');
    }
  }
}

/* ==========================================================================
   2. Dynamic Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingTarget = document.getElementById('typingText');
  if (!typingTarget) return;

  const roles = [
    'Digital Marketing Strategist 🚀',
    'E-Commerce & TikTok Specialist 🛍️',
    'Data Analytics & Power BI 📊',
    'UX/UI & Digital Product Innovator 💡'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, pauseEnd);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 350);
    } else {
      setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll Effect & Scrollspy
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll with offset for mobile collapse menu
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.external)');
  const navbarCollapse = document.getElementById('navbarNav');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ==========================================================================
   4. Portfolio Filtering System
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-col');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(col => {
        const category = col.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          col.style.display = 'block';
          col.style.opacity = '0';
          col.style.transform = 'scale(0.95)';
          setTimeout(() => {
            col.style.transition = 'all 0.35s ease';
            col.style.opacity = '1';
            col.style.transform = 'scale(1)';
          }, 30);
        } else {
          col.style.transition = 'all 0.25s ease';
          col.style.opacity = '0';
          col.style.transform = 'scale(0.95)';
          setTimeout(() => {
            col.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Project Modals with Dynamic Data
   ========================================================================== */
const projectData = {
  1: {
    title: 'EcoLiving — E-Commerce Growth Strategy & Live Stream',
    category: 'E-Commerce & Digital Marketing',
    badge: '+210% ยอดขาย',
    bannerBg: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    icon: 'bi-shop',
    overview: 'วางแผนกลยุทธ์การขายบน Shopee & TikTok Shop สำหรับแบรนด์สินค้าไลฟ์สไตล์รักษ์โลก พร้อมบริหารจัดการแคมเปญ 9.9 และ 11.11 อย่างครบวงจร',
    challenge: 'แบรนด์เปิดร้านใหม่ ขาดการมองเห็น (Visibility) ค่าโฆษณาสูงแต่อัตรา Conversion Rate ต่ำกว่า 1.2% และยังไม่มีการทำ Affiliate Marketing',
    solution: 'ปรับปรุง SEO หน้าร้าน (Keyword Optimization), ออกแบบ Creative Video สั้นสำหรับ TikTok Affiliate, และจัดตาราง Live Commerce สัปดาห์ละ 3 ครั้ง ร่วมกับโปรโมชัน Flash Sale',
    metrics: [
      { label: 'ยอดขายเติบโต (Growth)', val: '+210%' },
      { label: 'ROAS เฉลี่ย (Meta & TikTok)', val: '4.8x' },
      { label: 'ยอดวิว TikTok สะสม', val: '450K+' },
      { label: 'Conversion Rate', val: '3.4%' }
    ],
    tools: ['Shopee Seller Centre', 'TikTok Shop Affiliate', 'CapCut Pro', 'Canva Pro', 'Google Sheets'],
    keyTakeaway: 'เข้าใจพฤติกรรมลูกค้า Gen Z ในการซื้อสินค้าผ่าน Short-form Video Content และการใช้ Live commerce ปิดการขายแบบทันที'
  },
  2: {
    title: 'SnackSmart — Omnichannel Performance Marketing',
    category: 'Performance Marketing & SEO',
    badge: 'ROAS 4.6x',
    bannerBg: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
    icon: 'bi-megaphone-fill',
    overview: 'แคมเปญการตลาดดิจิทัลแบบครบวงจรสำหรับขนมเพื่อสุขภาพ โดยผสาน Meta Ads, TikTok Ads, และ Google Search Ads เข้าด้วยกัน',
    challenge: 'กลุ่มเป้าหมายกระจัดกระจายและมีคู่แข่งรายใหญ่ในตลาดขนมเพื่อสุขภาพจำนวนมาก ต้องเพิ่ม Brand Awareness ควบคู่กับ Drive Direct Purchase',
    solution: 'ทำ A/B Testing คอนเทนต์กว่า 20 ชุด แบ่ง Audience Segment ตามความสนใจด้านฟิตเนสและอาหารคลีน พร้อมสร้าง Custom Landing Page ที่โหลดเร็วและรองรับมือถือ',
    metrics: [
      { label: 'ROAS รวมทุกช่องทาง', val: '4.6x' },
      { label: 'Impression ทั้งแคมเปญ', val: '620,000' },
      { label: 'ต้นทุนต่อการซื้อ (CPA)', val: '-32%' },
      { label: 'ยอดคลิกเข้าชมเว็บ (CTR)', val: '2.85%' }
    ],
    tools: ['Meta Business Suite', 'Google Ads', 'Google Analytics 4', 'Looker Studio', 'Figma'],
    keyTakeaway: 'การวิเคราะห์ Data แบบ Real-time ช่วยลดการสูญเสียงบโฆษณาไปยังกลุ่มเป้าหมายที่ไม่ตอบสนองได้อย่างรวดเร็ว'
  },
  3: {
    title: 'Retail Sales & RFM Customer Segmentation Dashboard',
    category: 'Data Analytics & Business Intelligence',
    badge: 'RFM Analytics',
    bannerBg: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    icon: 'bi-bar-chart-line-fill',
    overview: 'พัฒนาแดชบอร์ดวิเคราะห์ยอดขายและพฤติกรรมลูกค้าเชิงลึก (RFM Model) โดยใช้ Power BI ช่วยให้ผู้บริหารตัดสินใจเลือกโปรโมชันที่ตรงกลุ่มลูกค้า',
    challenge: 'ข้อมูลยอดขายของร้านค้าปลีกกระจัดกระจายหลายไฟล์ Excel ทำให้ไม่เห็น Customer Lifetime Value (CLV) และลูกค้ากลุ่มเสี่ยง Churn',
    solution: 'ทำ Data Cleaning & Transformation ด้วย Power Query, ออกแบบ Data Model แบบ Star Schema และเขียนสูตร DAX คำนวณ RFM Score เพื่อจัดกลุ่มลูกค้าเป็น 5 กลุ่มหลัก',
    metrics: [
      { label: 'ลดเวลาสรุปยอดขาย', val: '85%' },
      { label: 'ลูกค้าที่เสี่ยง Churn', val: 'ระบุได้ 100%' },
      { label: 'จำนวนชุดข้อมูลวิเคราะห์', val: '50,000+ รายการ' },
      { label: 'ความพึงพอใจทีมขาย', val: '9.5/10' }
    ],
    tools: ['Microsoft Power BI', 'Power Query (M)', 'DAX', 'Advanced Excel', 'Kaggle Dataset'],
    keyTakeaway: 'การทำ Data Storytelling ผ่าน Visualization ช่วยให้ทีมที่ไม่มีความรู้ด้านเทคนิคสามารถเข้าใจและนำข้อมูลไปใช้ได้จริง'
  },
  4: {
    title: 'FinStart Mobile Banking — UX/UI Case Study',
    category: 'UX/UI & Digital Product',
    badge: 'Drop-off -35%',
    bannerBg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    icon: 'bi-phone-fill',
    overview: 'ออกแบบประสบการณ์ผู้ใช้งาน (UX) และส่วนติดต่อผู้ใช้งาน (UI) สำหรับแอปพลิเคชันบริหารการเงินและลงทุนสำหรับวัยเริ่มทำงาน (First Jobber)',
    challenge: 'แอปการเงินทั่วไปมีความซับซ้อน ศัพท์การเงินเข้าใจยาก ส่งผลให้ผู้ใช้วัยรุ่นยกเลิกการใช้งานระหว่างขั้นตอนการสมัครบัญชี (Drop-off สูง)',
    solution: 'ทำ User Research สัมภาษณ์ First Jobbers 12 คน, สร้าง Empathy Map & User Persona, ออกแบบ Wireframe และ Interactive High-Fidelity Prototype บน Figma เน้นความมินิมอลและ Micro-interaction',
    metrics: [
      { label: 'ลดอัตรา Drop-off สมัคร', val: '-35%' },
      { label: 'เวลาที่ใช้ทำธุรกรรม (Task Time)', val: '-40%' },
      { label: 'คะแนน System Usability (SUS)', val: '86/100' },
      { label: 'จำนวน Screen ที่ออกแบบ', val: '38 หน้า' }
    ],
    tools: ['Figma', 'FigJam', 'Miro', 'Maze (User Testing)', 'Zeplin'],
    keyTakeaway: 'การทำ Usability Testing ช่วยเปิดเผยจุดติดขัด (Pain points) ที่ทีมพัฒนาไม่เคยสังเกตมาก่อน'
  },
  5: {
    title: 'LINE OA Chatbot & Automation CRM Workflow',
    category: 'Automation & E-Commerce',
    badge: 'ปิดการขาย 24/7',
    bannerBg: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    icon: 'bi-robot',
    overview: 'สร้างระบบแชทบอทอัจฉริยะบน LINE Official Account ผสาน Make (Integromat) และ Google Sheets เพื่อตอบคำถามอัตโนมัติ ส่งใบเสนอราคา และบันทึก Lead',
    challenge: 'เจ้าหน้าที่แอดมินตอบแชทช้าในช่วงนอกเวลาทำการ ทำให้สูญเสียลูกค้าที่มีความต้องการซื้อทันทีไปมากกว่า 40%',
    solution: 'ออกแบบ Rich Menu, ข้อความตอบกลับอัตโนมัติ (Auto-response), และ Webhook เชื่อมต่อกับระบบตัดสต็อกจำลองใน Google Sheets พร้อมแจ้งเตือนผ่าน Telegram Bot',
    metrics: [
      { label: 'เวลาตอบกลับเฉลี่ย', val: '< 3 วินาที' },
      { label: 'ตอบคำถามนอกเวลาทำการ', val: '24 ชั่วโมง' },
      { label: 'อัตราการปิดการขายสำเร็จ', val: '+28%' },
      { label: 'ลดภาระงานแอดมิน', val: '60%' }
    ],
    tools: ['LINE Official Account Manager', 'Make.com', 'Google Sheets API', 'Dialogflow', 'Canva'],
    keyTakeaway: 'Business Process Automation ช่วยให้ธุรกิจขนาดเล็กสามารถให้บริการลูกค้าได้เทียบเท่าบริษัทขนาดใหญ่ด้วยต้นทุนต่ำ'
  },
  6: {
    title: 'GreenCycle — Digital Waste Solution (Hackathon Winner)',
    category: 'Digital Innovation & Business Plan',
    badge: 'รางวัลชนะเลิศ 🏆',
    bannerBg: 'linear-gradient(135deg, #10b981 0%, #6366f1 100%)',
    icon: 'bi-trophy-fill',
    overview: 'แผนธุรกิจและแพลตฟอร์มดิจิทัลรับซื้อและจัดการขยะรีไซเคิลด้วยระบบสะสมแต้มแลกส่วนลดสินค้าพาร์ทเนอร์ ได้รับรางวัลชนะเลิศในงาน University Startup Hackathon',
    challenge: 'ครัวเรือนแยกขยะน้อยเนื่องจากขาดแรงจูงใจ และรถเก็บขยะรีไซเคิลไม่มีระบบ Route Optimization ทำให้ต้นทุนโลจิสติกส์สูง',
    solution: 'เสนอ Business Model Canvas (BMC), โมเดลรายได้แบบ B2B2C, แอปรองรับระบบ AI Image Recognition คัดแยกประเภทขยะ และระบบ Dynamic Pricing',
    metrics: [
      { label: 'รางวัลการแข่งขัน', val: 'ชนะเลิศอันดับ 1' },
      { label: 'ผู้เข้าร่วมแข่งขัน', val: '32 ทีม' },
      { label: 'เงินรางวัลและทุนสนับสนุน', val: '50,000 บาท' },
      { label: 'ผู้ใช้ทดสอบ Pilot Test', val: '150 ครัวเรือน' }
    ],
    tools: ['Business Model Canvas', 'Figma Pitch Deck', 'Financial Projection Modeling', 'Agile Scrum'],
    keyTakeaway: 'การผสานความยั่งยืน (ESG) เข้ากับเทคโนโลยีดิจิทัลคือโอกาสทางธุรกิจที่สำคัญแห่งอนาคต'
  }
};

function initProjectModals() {
  const modalEl = document.getElementById('projectDetailModal');
  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  const triggerBtns = document.querySelectorAll('.open-project-modal');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      const data = projectData[id];
      if (!data) return;

      // Populate Modal Content
      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectCategory').textContent = data.category;
      document.getElementById('modalProjectBadge').textContent = data.badge;
      
      const banner = document.getElementById('modalProjectBanner');
      banner.style.background = data.bannerBg;
      document.getElementById('modalProjectIcon').className = `bi ${data.icon} fs-1 text-white`;

      document.getElementById('modalProjectOverview').textContent = data.overview;
      document.getElementById('modalProjectChallenge').textContent = data.challenge;
      document.getElementById('modalProjectSolution').textContent = data.solution;
      document.getElementById('modalProjectTakeaway').textContent = data.keyTakeaway;

      // Metrics
      const metricsContainer = document.getElementById('modalProjectMetrics');
      metricsContainer.innerHTML = '';
      data.metrics.forEach(m => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        col.innerHTML = `
          <div class="case-study-metric">
            <h4>${m.val}</h4>
            <p>${m.label}</p>
          </div>
        `;
        metricsContainer.appendChild(col);
      });

      // Tools
      const toolsContainer = document.getElementById('modalProjectTools');
      toolsContainer.innerHTML = '';
      data.tools.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-chip me-1 mb-1';
        span.innerHTML = `<i class="bi bi-check-circle-fill text-primary me-1"></i>${t}`;
        toolsContainer.appendChild(span);
      });

      modal.show();
    });
  });
}

/* ==========================================================================
   6. Stat Counters with Intersection Observer
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const steps = 50;
          const stepValue = target / steps;
          let current = 0;
          let stepCount = 0;

          const timer = setInterval(() => {
            stepCount++;
            current += stepValue;
            if (stepCount >= steps) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = prefix + (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
          }, duration / steps);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statsSection') || document.getElementById('about');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   7. Contact Form Handling & Bootstrap Toast
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toastEl = document.getElementById('contactToast');
  if (!contactForm || !toastEl) return;

  const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      e.stopPropagation();
      contactForm.classList.add('was-validated');
      return;
    }

    // Visual feedback on button
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      กำลังส่งข้อความ...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      toast.show();
    }, 1000);
  });
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
