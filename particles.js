// ============================================
// AKIŞKAN AURORA ARKAPLAN ANİMASYONU
// Siyah zemin üzerinde yavaşça akan neon ışık dalgaları.
// Noise tabanlı, organik hareket — klasik "nokta-çizgi" değil.
// Saf vanilla JS + Canvas, harici kütüphane yok.
// ============================================

const canvas = document.getElementById('plexus-canvas');
const ctx = canvas.getContext('2d');

// Düşük çözünürlüklü "offscreen" tampon: aurora burada çizilir,
// sonra ana canvas'a büyütülerek yumuşatılır (ucuz blur + yüksek performans).
const buffer = document.createElement('canvas');
const bctx = buffer.getContext('2d');

// --- AYARLAR (her şeyi buradan kolayca değiştirebilirsin) ---
const config = {
    blobCount: 10,        // Aurora ışık kümesi sayısı
    speed: 0.045,        // Akış hızı (düşük = sakin)
    drift: 0.24,         // Işıkların gezinme genişliği (ekran oranı)
    radius: 0.35,         // Işık yarıçapı (kısa kenar oranı)
    brightness: 0.45,    // Genel parlaklık (0-1) — yazı okunabilirliği için kısık
    bufferScale: 0.28,   // Offscreen çözünürlük oranı (düşük = yumuşak & hızlı)
    vignette: 0.65,      // Kenar koyulaştırma (yazıları öne çıkarır)
    mouseGlow: true,     // İmleç yakınında hafif parıltı
    mouseStrength: 0.35  // İmleç parıltısının gücü
};

// Tema renklerini CSS değişkenlerinden al (style.css :root)
const rootStyles = getComputedStyle(document.documentElement);
const neonMavi = rootStyles.getPropertyValue('--neon-mavi').trim() || '#00ffff';
const neonMor = rootStyles.getPropertyValue('--neon-mor').trim() || '#bc13fe';
const zeminAna = rootStyles.getPropertyValue('--zemin-ana').trim() || '#000000';

// Hex rengi [r,g,b] dizisine çevir
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16)
    ];
}

// İki rengi karıştır
function mixRgb(a, b, t) {
    return [
        Math.round(a[0] + (b[0] - a[0]) * t),
        Math.round(a[1] + (b[1] - a[1]) * t),
        Math.round(a[2] + (b[2] - a[2]) * t)
    ];
}

const cyan = hexToRgb(neonMavi);
const purple = hexToRgb(neonMor);
const indigo = mixRgb(cyan, purple, 0.5);
// Cyan ve mor ağırlıklı, aralarda doğal geçiş tonları
const palette = [cyan, purple, indigo, cyan, purple, mixRgb(cyan, purple, 0.25)];

// ============================================
// 2D SIMPLEX NOISE (Stefan Gustavson tabanlı, kompakt, public domain)
// Organik/akışkan hareket için tekrarsız gürültü üretir.
// ============================================
function makeNoise2D(seed) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let n = (seed * 2654435761) >>> 0;
    const rand = () => {
        n ^= n << 13; n ^= n >>> 17; n ^= n << 5; n >>>= 0;
        return n / 4294967296;
    };
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        const tmp = p[i]; p[i] = p[j]; p[j] = tmp;
    }
    const perm = new Uint8Array(512);
    const permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
        perm[i] = p[i & 255];
        permMod12[i] = perm[i] % 12;
    }
    const grad = [
        [1, 1], [-1, 1], [1, -1], [-1, -1],
        [1, 0], [-1, 0], [1, 0], [-1, 0],
        [0, 1], [0, -1], [0, 1], [0, -1]
    ];
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    return function (xin, yin) {
        let n0 = 0, n1 = 0, n2 = 0;
        const s = (xin + yin) * F2;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const t = (i + j) * G2;
        const x0 = xin - (i - t);
        const y0 = yin - (j - t);
        let i1, j1;
        if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2;
        const y2 = y0 - 1 + 2 * G2;
        const ii = i & 255;
        const jj = j & 255;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) { t0 *= t0; const g = grad[permMod12[ii + perm[jj]]]; n0 = t0 * t0 * (g[0] * x0 + g[1] * y0); }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) { t1 *= t1; const g = grad[permMod12[ii + i1 + perm[jj + j1]]]; n1 = t1 * t1 * (g[0] * x1 + g[1] * y1); }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) { t2 *= t2; const g = grad[permMod12[ii + 1 + perm[jj + 1]]]; n2 = t2 * t2 * (g[0] * x2 + g[1] * y2); }
        return 70 * (n0 + n1 + n2); // ~[-1, 1]
    };
}
const noise = makeNoise2D(1337);

// ============================================
// AURORA IŞIK KÜMELERİ
// ============================================
let blobs = [];
function initBlobs() {
    blobs = [];
    const count = isMobile() ? Math.max(4, config.blobCount - 2) : config.blobCount;
    for (let i = 0; i < count; i++) {
        blobs.push({
            homeX: 0.12 + Math.random() * 0.76,   // ekrandaki temel konum
            homeY: 0.12 + Math.random() * 0.76,
            seed: i * 137.5 + Math.random() * 50,  // her küme farklı noise yolu
            radius: config.radius * (0.7 + Math.random() * 0.5),
            rgb: palette[i % palette.length],
            alpha: 0.55 + Math.random() * 0.35,
            breathe: i * 90 + 13                   // nefes alma (boyut titreşimi) ofseti
        });
    }
}

// İmleç (yumuşak takip)
const mouse = { x: null, y: null, gx: 0.5, gy: 0.5, active: false };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
    mouse.active = true;
});
window.addEventListener('mouseout', () => { mouse.active = false; });

// ============================================
// BOYUTLANDIRMA
// ============================================
let W = 0, H = 0, ow = 0, oh = 0, minDim = 0;
function isMobile() { return window.innerWidth < 768; }

function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = Math.round(window.innerWidth * dpr);
    H = Math.round(window.innerHeight * dpr);
    canvas.width = W;
    canvas.height = H;

    const scale = isMobile() ? config.bufferScale * 0.8 : config.bufferScale;
    ow = Math.max(1, Math.round(window.innerWidth * scale));
    oh = Math.max(1, Math.round(window.innerHeight * scale));
    buffer.width = ow;
    buffer.height = oh;
    minDim = Math.min(ow, oh);
}

// Tek bir ışık kümesini radial gradyan olarak çiz
function drawBlob(x, y, r, rgb, alpha) {
    const g = bctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`);
    g.addColorStop(0.35, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha * 0.5})`);
    g.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
    bctx.fillStyle = g;
    bctx.beginPath();
    bctx.arc(x, y, r, 0, Math.PI * 2);
    bctx.fill();
}

// Aurora karesini offscreen tampona çiz
function drawAurora(t) {
    bctx.globalCompositeOperation = 'source-over';
    bctx.clearRect(0, 0, ow, oh);
    bctx.globalCompositeOperation = 'lighter'; // renkler üst üste binince parlasın

    for (const b of blobs) {
        const nx = noise(b.seed, t * config.speed);
        const ny = noise(b.seed + 50, t * config.speed);
        const breathe = 0.82 + 0.18 * noise(b.breathe, t * config.speed * 0.7);
        const x = (b.homeX + nx * config.drift) * ow;
        const y = (b.homeY + ny * config.drift) * oh;
        const r = b.radius * minDim * breathe;
        drawBlob(x, y, r, b.rgb, b.alpha * config.brightness);
    }

    // İmleç parıltısı (opsiyonel, çok hafif)
    if (config.mouseGlow && mouse.active && mouse.x !== null) {
        mouse.gx += (mouse.x - mouse.gx) * 0.06; // yumuşak takip
        mouse.gy += (mouse.y - mouse.gy) * 0.06;
        drawBlob(mouse.gx * ow, mouse.gy * oh, minDim * 0.35, cyan,
            config.brightness * config.mouseStrength);
    }
}

// Kenarları koyulaştıran vignette — ortadaki/üstteki yazıları öne çıkarır
function drawVignette() {
    const g = ctx.createRadialGradient(
        W / 2, H * 0.42, 0,
        W / 2, H * 0.42, Math.max(W, H) * 0.75
    );
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, `rgba(0,0,0,${config.vignette})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
}

// Aurora tamponunu ana canvas'a büyüterek bas (yumuşatma = ucuz blur)
function composite() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = zeminAna;
    ctx.fillRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(buffer, 0, 0, ow, oh, 0, 0, W, H);
    drawVignette();
}

// ============================================
// ANİMASYON DÖNGÜSÜ
// ============================================
let rafId = null;
let running = false;

function loop(now) {
    drawAurora(now * 0.001);
    composite();
    rafId = requestAnimationFrame(loop);
}

function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(loop);
}
function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
}

// Tek bir statik kare (reduced-motion / duraklatma için)
function drawStaticFrame() {
    drawAurora(12.3); // sabit, hoş bir an
    composite();
}

// ============================================
// BAŞLATMA + ERİŞİLEBİLİRLİK / PERFORMANS
// ============================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setup() {
    resize();
    initBlobs();
    if (reduceMotion.matches) {
        stop();
        drawStaticFrame(); // hareket istemeyen kullanıcıya statik gradyan
    } else {
        start();
    }
}

// Ekran boyutu değişince yeniden kur
let resizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        resize();
        initBlobs();
        if (reduceMotion.matches) drawStaticFrame();
    }, 150);
});

// Sekme arka plandayken animasyonu durdur (pil dostu)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stop();
    } else if (!reduceMotion.matches) {
        start();
    }
});

// Kullanıcı hareket tercihini değiştirirse anında uygula
reduceMotion.addEventListener('change', setup);

setup();
