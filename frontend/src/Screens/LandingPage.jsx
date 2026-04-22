import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LANDING_HTML = `
<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    <div class="nav-logo-icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </div>
    <span class="nav-brand">Campus<span>Sync</span></span>
  </a>

  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#roles">For Roles</a></li>
    <li><a href="#howitworks">How It Works</a></li>
    <li><a href="#testimonials">Testimonials</a></li>
  </ul>

  <div class="nav-cta">
    <a href="/login" class="btn-ghost">Sign In</a>
    <a href="/login" class="btn-primary">Get Started →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-content">
    <div class="hero-badge">🎓 Trusted by 200+ Institutions Across India</div>

    <h1 class="hero-title">
      The Smart Platform for <span>Modern Campuses</span>
    </h1>

    <p class="hero-desc">
      CampusSync unifies administration, faculty, and student workflows into one seamless system — from enrollment to exams, timetables to study materials.
    </p>

    <div class="hero-actions">
      <a href="/login" class="btn-hero">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
        Start Free Trial
      </a>
      <a href="#" class="btn-hero-outline">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>
        Watch Demo
      </a>
    </div>

    <div class="hero-stats">
      <div class="stat-item">
        <div class="stat-num">200<span>+</span></div>
        <div class="stat-label">Colleges</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">50<span>K+</span></div>
        <div class="stat-label">Students</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">99<span>%</span></div>
        <div class="stat-label">Uptime</div>
      </div>
    </div>
  </div>

  <div class="hero-visual">
    <div style="position:relative;">
      <div class="dashboard-mockup">
        <div class="mockup-bar">
          <div class="mockup-dot" style="background:#ff5f57;"></div>
          <div class="mockup-dot" style="background:#ffbd2e;"></div>
          <div class="mockup-dot" style="background:#28c940;"></div>
          <span class="mockup-bar-title">CampusSync Admin Dashboard</span>
        </div>
        <div class="mockup-body">
          <div class="mockup-sidebar">
            <div class="sidebar-profile">
              <div class="sidebar-avatar">AD</div>
              <div class="sidebar-name">Dr. Admin</div>
              <div class="sidebar-role">Administrator</div>
            </div>
            <div class="sidebar-nav">
              <div class="sidebar-item active">
                <svg class="si-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span class="si-text">Dashboard</span>
              </div>
              <div class="sidebar-item">
                <svg class="si-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span class="si-text">Students</span>
              </div>
              <div class="sidebar-item">
                <svg class="si-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span class="si-text">Faculty</span>
              </div>
              <div class="sidebar-item">
                <svg class="si-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                <span class="si-text">Subjects</span>
              </div>
              <div class="sidebar-item">
                <svg class="si-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span class="si-text">Timetable</span>
              </div>
              <div class="sidebar-item">
                <svg class="si-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                <span class="si-text">Notices</span>
              </div>
            </div>
          </div>

          <div class="mockup-main">
            <div class="mockup-header">
              <div>
                <div class="mockup-greeting">Good Morning, Admin 👋</div>
              </div>
              <div class="mockup-date">April 22, 2026</div>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="sc-label">Total Students</div>
                <div class="sc-value">1,284</div>
                <div class="sc-change">↑ 12% this sem</div>
              </div>
              <div class="stat-card accent">
                <div class="sc-label light">Faculty Active</div>
                <div class="sc-value light">48</div>
                <div class="sc-change light">✓ All assigned</div>
              </div>
              <div class="stat-card">
                <div class="sc-label">Subjects</div>
                <div class="sc-value">96</div>
                <div class="sc-change">↑ 4 new added</div>
              </div>
              <div class="stat-card">
                <div class="sc-label">Notices Sent</div>
                <div class="sc-value">32</div>
                <div class="sc-change">↑ 8 this week</div>
              </div>
            </div>

            <div class="activity-header">Recent Activity</div>
            <div class="activity-item">
              <div class="activity-dot" style="background:#3b82f6;"></div>
              <span class="activity-text">New student enrolled — Priya Sharma, CSE Sem 3</span>
              <span class="activity-time">2m ago</span>
            </div>
            <div class="activity-item">
              <div class="activity-dot" style="background:#10b981;"></div>
              <span class="activity-text">Timetable uploaded for IT Branch, Sem 5</span>
              <span class="activity-time">1h ago</span>
            </div>
            <div class="activity-item">
              <div class="activity-dot" style="background:#f59e0b;"></div>
              <span class="activity-text">Notice: Mid-sem exam schedule published</span>
              <span class="activity-time">3h ago</span>
            </div>
          </div>
        </div>
      </div>

      <div class="floating-notif">
        <div class="floating-notif-icon">📋</div>
        <div>
          <div class="fn-title">New Notice Published</div>
          <div class="fn-sub">Mid-sem schedule for all branches</div>
        </div>
      </div>

      <div class="floating-badge">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
        100% Secure & Reliable
      </div>
    </div>
  </div>
</section>

<!-- TRUSTED BY -->
<div class="trusted">
  <div class="trusted-inner">
    <span class="trusted-label">Trusted by</span>
    <div class="trusted-logos">
      <div class="college-logo-pill">
        <div class="clp-icon" style="background:#1a56db;">VIT</div>
        <span class="clp-name">VIT University</span>
      </div>
      <div class="college-logo-pill">
        <div class="clp-icon" style="background:#0891b2;">SRM</div>
        <span class="clp-name">SRM Institute</span>
      </div>
      <div class="college-logo-pill">
        <div class="clp-icon" style="background:#7c3aed;">MIT</div>
        <span class="clp-name">MIT Manipal</span>
      </div>
      <div class="college-logo-pill">
        <div class="clp-icon" style="background:#059669;">BIT</div>
        <span class="clp-name">BIT Mesra</span>
      </div>
      <div class="college-logo-pill">
        <div class="clp-icon" style="background:#dc2626;">NIT</div>
        <span class="clp-name">NIT Trichy</span>
      </div>
    </div>
  </div>
</div>

<!-- ROLES -->
<div id="roles">
  <div class="section">
    <div class="section-tag">👥 Built For Everyone</div>
    <h2 class="section-title">One Platform, Three Powerful Roles</h2>
    <p class="section-desc">CampusSync provides tailored dashboards and tools for every stakeholder — admins, faculty, and students — all from one integrated platform.</p>

    <div class="roles-grid">
      <div class="role-card admin">
        <div class="role-icon">🛡️</div>
        <div class="role-title">Administrator</div>
        <p class="role-desc">Full institutional control — manage every aspect of your college from one powerful, intuitive dashboard.</p>
        <ul class="role-features">
          <li>Manage faculty & student accounts</li>
          <li>Configure branches & semesters</li>
          <li>Handle subject & course management</li>
          <li>Publish notices & announcements</li>
          <li>Upload & manage timetables</li>
        </ul>
        <a href="#" class="role-cta">Explore Admin Panel →</a>
      </div>

      <div class="role-card faculty">
        <div class="role-icon">📚</div>
        <div class="role-title">Faculty</div>
        <p class="role-desc">Empower your teaching with tools to share materials, track students, and manage your schedule effortlessly.</p>
        <ul class="role-features">
          <li>Upload notes, assignments & syllabi</li>
          <li>Filter materials by subject & type</li>
          <li>Search & view student information</li>
          <li>Manage personal timetable</li>
          <li>View and respond to notices</li>
        </ul>
        <a href="#" class="role-cta">Explore Faculty Portal →</a>
      </div>

      <div class="role-card student">
        <div class="role-icon">🎓</div>
        <div class="role-title">Student</div>
        <p class="role-desc">Access everything you need for academic success — materials, schedules, and notices, all in one place.</p>
        <ul class="role-features">
          <li>View personal academic profile</li>
          <li>Access study materials by subject</li>
          <li>Download class timetables</li>
          <li>View notices & announcements</li>
          <li>Manage profile & credentials</li>
        </ul>
        <a href="#" class="role-cta">Explore Student Portal →</a>
      </div>
    </div>
  </div>
</div>

<!-- FEATURES -->
<div class="features-full" id="features">
  <div class="features-inner">
    <div style="text-align:center; margin-bottom:56px;">
      <div class="section-tag" style="display:inline-flex;">⚡ Core Features</div>
      <h2 class="section-title" style="margin: 16px auto 0; text-align:center;">Everything Your Campus Needs</h2>
    </div>
    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-icon-wrap">📂</div>
        <div class="feat-title">Study Material Management</div>
        <p class="feat-desc">Faculty can upload notes, assignments, and syllabi organized by subject, semester, and type. Students access filtered content instantly.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon-wrap">🗓️</div>
        <div class="feat-title">Timetable System</div>
        <p class="feat-desc">Admins and faculty can upload branch-wise timetables. Students get downloadable schedules with a single click, always up to date.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon-wrap">📢</div>
        <div class="feat-title">Smart Notices</div>
        <p class="feat-desc">Broadcast important announcements to students and faculty with targeted notice management. Role-based visibility ensures the right people see the right messages.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon-wrap">👤</div>
        <div class="feat-title">Profile & Account Management</div>
        <p class="feat-desc">Detailed profiles for students and faculty including emergency contacts, enrollment numbers, and academic details with secure password management.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon-wrap">🏫</div>
        <div class="feat-title">Branch & Subject Control</div>
        <p class="feat-desc">Manage academic branches, configure semester-wise subjects, and maintain course structures with flexible admin controls.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon-wrap">🔍</div>
        <div class="feat-title">Student Search & Analytics</div>
        <p class="feat-desc">Faculty can search students by enrollment number, name, or semester. Admins get a full bird's-eye view of institutional data at a glance.</p>
      </div>
    </div>
  </div>
</div>

<!-- HOW IT WORKS -->
<div id="howitworks">
  <div class="how-section">
    <div style="text-align:center;">
      <div class="section-tag" style="display:inline-flex;">🚀 Process</div>
      <h2 class="section-title" style="margin: 16px auto; text-align:center; max-width: 480px;">Up and Running in Four Simple Steps</h2>
    </div>

    <div class="steps-grid">
      <div class="step-item">
        <div class="step-num">1</div>
        <div class="step-title">Set Up Institution</div>
        <p class="step-desc">Admin registers the college, configures branches, and adds semester and subject structures.</p>
      </div>
      <div class="step-item">
        <div class="step-num">2</div>
        <div class="step-title">Onboard Faculty & Students</div>
        <p class="step-desc">Create faculty and student accounts with complete profiles, enrollment numbers, and role assignments.</p>
      </div>
      <div class="step-item">
        <div class="step-num">3</div>
        <div class="step-title">Upload Content</div>
        <p class="step-desc">Faculty upload materials, timetables, and assignments. Admins publish notices and manage courses.</p>
      </div>
      <div class="step-item">
        <div class="step-num">4</div>
        <div class="step-title">Students Access & Learn</div>
        <p class="step-desc">Students log in to view their personalized portal with schedules, materials, and notices instantly accessible.</p>
      </div>
    </div>
  </div>
</div>

<!-- TESTIMONIALS -->
<div class="testimonials" id="testimonials">
  <div class="testimonials-inner">
    <div class="t-tag">💬 Testimonials</div>
    <h2 class="t-title">Loved by Campus Communities</h2>

    <div class="testimonials-grid">
      <div class="t-card">
        <div class="t-stars">★★★★★</div>
        <p class="t-quote">"CampusSync transformed our administrative workflow. What used to take days now happens in minutes. Our faculty adoption rate was nearly 100% within the first week."</p>
        <div class="t-author">
          <div class="t-avatar" style="background:linear-gradient(135deg,#1a56db,#3b82f6);">RK</div>
          <div>
            <div class="t-name">Dr. Rajesh Kumar</div>
            <div class="t-role">Dean of Academics, VIT Bhopal</div>
          </div>
        </div>
      </div>

      <div class="t-card">
        <div class="t-stars">★★★★★</div>
        <p class="t-quote">"Finally, a system designed with the student in mind. I can find my timetable, download notes, and check exam notices all in one place. It's just clean and simple."</p>
        <div class="t-author">
          <div class="t-avatar" style="background:linear-gradient(135deg,#0891b2,#22d3ee);">PS</div>
          <div>
            <div class="t-name">Priya Sharma</div>
            <div class="t-role">CSE Student, Semester 5</div>
          </div>
        </div>
      </div>

      <div class="t-card">
        <div class="t-stars">★★★★★</div>
        <p class="t-quote">"Uploading study materials used to be scattered across WhatsApp and emails. CampusSync gave us a proper, organized system. My students are more engaged than ever."</p>
        <div class="t-author">
          <div class="t-avatar" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);">AP</div>
          <div>
            <div class="t-name">Prof. Ananya Patel</div>
            <div class="t-role">Associate Professor, IT Dept.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CTA -->
<div class="cta-section">
  <div class="cta-inner">
    <div class="section-tag" style="display:inline-flex; margin-bottom:20px;">🎯 Get Started</div>
    <h2 class="cta-title">Ready to Modernize Your Campus?</h2>
    <p class="cta-desc">Join over 200 institutions already using CampusSync. Set up your institution in minutes, onboard your team, and transform how your campus operates.</p>
    <div class="cta-actions">
      <a href="/login" class="btn-hero">Request a Free Demo</a>
      <a href="#" class="btn-hero-outline">View Pricing →</a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="footer-logo">
          <div class="nav-logo-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <span class="footer-brand-name">CampusSync</span>
        </a>
        <p class="footer-tagline">A comprehensive MERN stack platform streamlining college management for admins, faculty, and students.</p>
        <div class="footer-socials">
          <div class="social-btn">𝕏</div>
          <div class="social-btn">in</div>
          <div class="social-btn">gh</div>
          <div class="social-btn">yt</div>
        </div>
      </div>

      <div>
        <div class="footer-col-title">Platform</div>
        <ul class="footer-links">
          <li><a href="#">Admin Dashboard</a></li>
          <li><a href="#">Faculty Portal</a></li>
          <li><a href="#">Student Portal</a></li>
          <li><a href="#">Mobile App</a></li>
          <li><a href="#">API Access</a></li>
        </ul>
      </div>

      <div>
        <div class="footer-col-title">Resources</div>
        <ul class="footer-links">
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Setup Guide</a></li>
          <li><a href="#">Video Tutorials</a></li>
          <li><a href="#">Changelog</a></li>
          <li><a href="#">Status Page</a></li>
        </ul>
      </div>

      <div>
        <div class="footer-col-title">Company</div>
        <ul class="footer-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Sales</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-copy">© 2026 <span>CampusSync</span>. All rights reserved. Built with ❤️ for Indian academia.</div>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
`;

const LandingPage = () => {
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CampusSync — College Management System";

    const onScroll = () => {
      const nav = rootRef.current?.querySelector("nav");
      if (!nav) {
        return;
      }
      nav.style.boxShadow =
        window.scrollY > 20
          ? "0 2px 30px rgba(26,86,219,0.12)"
          : "0 1px 20px rgba(26,86,219,0.07)";
    };

    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    const setAnimatedGroup = (selector, delayStep) => {
      const nodes = rootRef.current?.querySelectorAll(selector) || [];
      nodes.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        el.style.transitionDelay = `${i * delayStep}s`;
        observer.observe(el);
      });
    };

    setAnimatedGroup(".role-card", 0.12);
    setAnimatedGroup(".feat-card", 0.08);
    setAnimatedGroup(".step-item", 0.1);
    setAnimatedGroup(".t-card", 0.12);

    const onClick = (event) => {
      const link = event.target.closest('a[href="/login"]');
      if (link) {
        event.preventDefault();
        navigate("/login");
      }
    };

    const rootNode = rootRef.current;
    rootNode?.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      rootNode?.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, [navigate]);

  return (
    <div
      ref={rootRef}
      className="landing-root"
      dangerouslySetInnerHTML={{ __html: LANDING_HTML }}
    />
  );
};

export default LandingPage;
