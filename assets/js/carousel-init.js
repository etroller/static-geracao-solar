/**
 * Carousel Init - Geração Solar static site carousels
 * Targets widgets by exact Elementor data-id
 */
(function () {
  'use strict';

  /* ======= DATA ======= */
  var testimonials = [
    { name: 'João Henrique', img: '/assets/uploads/elementor/thumbs/Depoimento-branco-Joao-Henrique-qqbvw4fs2we0kb7t24eepm1g02bs5x4xgh62nqvooo.png' },
    { name: 'Gabriel Lazarini', img: '/assets/uploads/elementor/thumbs/Depoimento-branco-Gabriel-Lazarini-1-qqbvvra1f7w01rqx6ypmqpczoo4n65ooqo19xvf73s.png' },
    { name: 'Elio Rodrigues', img: '/assets/uploads/elementor/thumbs/Depoimento-branco-Elio-Rodrigues-1-qqbvyxycl08ze74clca46wf85off98bxufmihmp60o.png' },
    { name: 'João Lourenço', img: '/assets/uploads/elementor/thumbs/Depoimento-branco-Joao-Lourenco-1-qqbvu34d9tlneq6ay8pib4jho0d5hj1v6ea785we60.png' },
    { name: 'Deise Fenalte', img: '/assets/uploads/elementor/thumbs/Depoimento-branco-Deise-Fenalte-qqbw0z9re31cjs5up7z0ldx6hqe1xmf04iidx7ogjc.png' },
    { name: 'Tuia', img: '/assets/uploads/elementor/thumbs/Depoimento-branco-Tuia-1-qqbvqybqhpb8piq58vy9zx06drt3tum2qvzxmyjmwo.png' }
  ];

  var projects = [
    { img: '/assets/uploads/2021/12/sistema-residencial.jpg', title: 'Sistema Residencial', link: '/projetos/' },
    { img: '/assets/uploads/2021/12/sistema-industrial-1024x535.jpg', title: 'Sistema Industrial', link: '/projetos/' },
    { img: '/assets/uploads/2021/12/sistema-rural-1024x587.jpg', title: 'Sistema Rural', link: '/projetos/' },
    { img: '/assets/uploads/2020/06/detail_of_solar_power_station_on_the_roof_of_the_house-1.jpg', title: 'Energia Solar Residencial', link: '/projetos/' }
  ];

  /* ======= CSS ======= */
  var s = document.createElement('style');
  s.textContent = '\
.gc-crs{position:relative;overflow:hidden;width:100%;margin:10px 0}\
.gc-trk{display:flex!important;transition:transform .5s ease}\
.gc-sld{flex-shrink:0;box-sizing:border-box;padding:8px}\
.gc-1{flex:0 0 100%}\
.gc-3{flex:0 0 33.333%}\
@media(max-width:1023px){.gc-3{flex:0 0 50%}}\
@media(max-width:767px){.gc-3,.gc-1{flex:0 0 100%}}\
.gc-nav{display:flex;justify-content:center;align-items:center;gap:8px;padding:16px 0}\
.gc-d{width:10px;height:10px;border-radius:50%;background:#ccc;border:none;cursor:pointer;padding:0;transition:background .3s}\
.gc-d.on{background:#f26522}\
.gc-a{width:36px;height:36px;border-radius:50%;background:#f26522;color:#fff;border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0}\
.gc-a:hover{opacity:.8}\
.gc-ti{width:100%;max-width:480px;height:auto;border-radius:10px;display:block;margin:0 auto;box-shadow:0 2px 15px rgba(0,0,0,0.08)}\
.gc-pj{position:relative;overflow:hidden;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.12)}\
.gc-pj img{width:100%;height:240px;object-fit:cover;display:block}\
.gc-pj .gc-ol{position:absolute;bottom:0;left:0;right:0;padding:14px;background:linear-gradient(transparent,rgba(0,0,0,.65));color:#fff;font-weight:600;font-size:14px}\
.jet-listing-grid-loading{display:none!important}\
';
  document.head.appendChild(s);

  /* ======= CAROUSEL ======= */
  function C(el) {
    this.e = el; this.t = el.querySelector('.gc-trk');
    if (!this.t) return;
    this.s = [].slice.call(this.t.children);
    if (this.s.length < 2) return;
    this.c = 0; this.i = null;
    this.nav();
    this.go(0);
    this.play();
    var me = this;
    el.onmouseenter = function () { me.pause(); };
    el.onmouseleave = function () { me.play(); };
    window.addEventListener('resize', function () { me.go(me.c); });
  }
  C.prototype.v = function () { return this.s[0] ? Math.max(1, Math.round(this.t.offsetWidth / this.s[0].offsetWidth)) : 1; };
  C.prototype.p = function () { return Math.max(1, this.s.length - this.v() + 1); };
  C.prototype.go = function (n) {
    var p = this.p();
    if (n < 0) n = p - 1; if (n >= p) n = 0;
    this.c = n;
    this.t.style.transform = 'translateX(' + (-(n * this.s[0].offsetWidth)) + 'px)';
    if (this.dots) for (var i = 0; i < this.dots.length; i++) this.dots[i].classList.toggle('on', i === n);
  };
  C.prototype.nav = function () {
    var p = this.p(); if (p <= 1) return;
    var d = document.createElement('div'); d.className = 'gc-nav'; var me = this;
    var pv = document.createElement('button'); pv.className = 'gc-a'; pv.innerHTML = '&#8249;';
    pv.onclick = function () { me.pause(); me.go(me.c - 1); me.play(); }; d.appendChild(pv);
    this.dots = [];
    for (var i = 0; i < Math.min(p, 8); i++) {
      var dot = document.createElement('button'); dot.className = 'gc-d' + (i === 0 ? ' on' : '');
      dot.dataset.i = i; dot.onclick = function () { me.pause(); me.go(+this.dataset.i); me.play(); };
      d.appendChild(dot); this.dots.push(dot);
    }
    var nx = document.createElement('button'); nx.className = 'gc-a'; nx.innerHTML = '&#8250;';
    nx.onclick = function () { me.pause(); me.go(me.c + 1); me.play(); }; d.appendChild(nx);
    this.e.appendChild(d);
  };
  C.prototype.play = function () { this.pause(); var me = this; this.i = setInterval(function () { me.go(me.c + 1); }, 5000); };
  C.prototype.pause = function () { if (this.i) clearInterval(this.i); this.i = null; };

  /* ======= INIT ======= */
  function init() {
    // Target PROJETOS widget by Elementor data-id
    var projWidget = document.querySelector('[data-id="f569150"] .jet-listing-grid');
    if (!projWidget) {
      // Fallback: first .jet-listing-grid
      var grids = document.querySelectorAll('.jet-listing-grid');
      if (grids.length > 0) projWidget = grids[0];
    }

    if (projWidget) {
      projWidget.innerHTML = '';
      projWidget.style.cssText = 'min-height:auto!important';
      var html = '<div class="gc-crs"><div class="gc-trk">';
      projects.forEach(function (p) {
        html += '<div class="gc-sld gc-3"><a href="' + p.link + '"><div class="gc-pj"><img src="' + p.img + '" alt="' + p.title + '" loading="lazy"><div class="gc-ol">' + p.title + '</div></div></a></div>';
      });
      html += '</div></div>';
      projWidget.innerHTML = html;
      new C(projWidget.querySelector('.gc-crs'));
    }

    // Target DEPOIMENTOS widget by Elementor data-id
    var depWidget = document.querySelector('[data-id="039ec3c"] .jet-listing-grid');
    if (!depWidget) {
      var grids = document.querySelectorAll('.jet-listing-grid');
      if (grids.length > 1) depWidget = grids[1];
    }

    if (depWidget) {
      depWidget.innerHTML = '';
      depWidget.style.cssText = 'min-height:auto!important';
      var html = '<div class="gc-crs"><div class="gc-trk">';
      testimonials.forEach(function (t) {
        html += '<div class="gc-sld gc-1"><img class="gc-ti" src="' + t.img + '" alt="Depoimento de ' + t.name + '" loading="lazy"></div>';
      });
      html += '</div></div>';
      depWidget.innerHTML = html;
      new C(depWidget.querySelector('.gc-crs'));
    }

    // Hide any remaining spinners
    var spinners = document.querySelectorAll('.jet-listing-grid-loading');
    for (var i = 0; i < spinners.length; i++) spinners[i].style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
