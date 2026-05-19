/* =============================================================================
   Ecofriends Trading OÜ — main.js
   Lightweight, dependency-free interactivity.
   ============================================================================= */

(function () {
    "use strict";

    /* ------------------------------------------------------------------ *
     *  Current year in footer
     * ------------------------------------------------------------------ */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ------------------------------------------------------------------ *
     *  Sticky-header style toggle + scroll progress bar
     * ------------------------------------------------------------------ */
    const header = document.getElementById("siteHeader");
    const progress = document.getElementById("scrollProgress");

    function onScroll() {
        const y = window.scrollY || window.pageYOffset;
        if (header) header.classList.toggle("scrolled", y > 24);

        if (progress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
            progress.style.width = pct + "%";
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ------------------------------------------------------------------ *
     *  Mobile menu
     * ------------------------------------------------------------------ */
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            const open = menu.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            menu.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.style.overflow = open ? "hidden" : "";
        });
        menu.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () {
                menu.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                menu.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "";
            });
        });
    }

    /* ------------------------------------------------------------------ *
     *  Reveal-on-scroll animation
     * ------------------------------------------------------------------ */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay || "0", 10);
                    setTimeout(function () { el.classList.add("in"); }, delay);
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    /* ------------------------------------------------------------------ *
     *  FAQ — one-open-at-a-time accordion (native <details>)
     * ------------------------------------------------------------------ */
    const faqItems = document.querySelectorAll("#faqList .faq-item");
    faqItems.forEach(function (item) {
        item.addEventListener("toggle", function () {
            if (item.open) {
                faqItems.forEach(function (other) {
                    if (other !== item) other.open = false;
                });
            }
        });
    });

    /* ------------------------------------------------------------------ *
     *  Smooth anchor scroll w/ sticky-header offset
     * ------------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const headerH = header ? header.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
            window.scrollTo({ top: y, behavior: "smooth" });
        });
    });

    /* ------------------------------------------------------------------ *
     *  Contact form — graceful mailto fallback
     * ------------------------------------------------------------------ */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const data = {
                name:    (form.elements["name"].value    || "").trim(),
                email:   (form.elements["email"].value   || "").trim(),
                company: (form.elements["company"].value || "").trim(),
                service: (form.elements["service"].value || "").trim(),
                message: (form.elements["message"].value || "").trim()
            };

            if (!data.name || !data.email || !data.message) {
                if (status) {
                    status.style.color = "#f3b6b6";
                    status.textContent = "Please fill in your name, email and a short message.";
                }
                return;
            }

            const subject = "New project enquiry — " + (data.company || data.name);
            const body =
                "Name: " + data.name + "\n" +
                "Email: " + data.email + "\n" +
                "Company: " + (data.company || "—") + "\n" +
                "Service: " + (data.service || "—") + "\n\n" +
                "Message:\n" + data.message + "\n";

            const href =
                "mailto:ecofriendstrading@mail.ee" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            if (status) {
                status.style.color = "";
                status.textContent = "Opening your email client… If nothing happens, write to ecofriendstrading@mail.ee directly.";
            }
            window.location.href = href;
        });
    }
})();
