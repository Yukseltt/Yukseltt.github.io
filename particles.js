// ============================================
// PLEXUS / NETWORK ARKAPLANİ ANİMASYONU
// Mouse hareketini takip eden parçacıklar
// ============================================

const canvas = document.getElementById('plexus-canvas');
const ctx = canvas.getContext('2d');

// Canvas boyutlarını ayarla
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Tema renklerini CSS'den al
const rootStyles = getComputedStyle(document.documentElement);
const neonMavi = rootStyles.getPropertyValue('--neon-mavi').trim() || '#00ffff';
const neonMor = rootStyles.getPropertyValue('--neon-mor').trim() || '#bc13fe';

// Parçacık ayarları
const config = {
    particleCount: 100,          // Parçacık sayısı
    particleColor: neonMavi,     // Parçacık rengi (tema rengi)
    lineColor: neonMavi,         // Çizgi rengi
    mouseLineColor: neonMor,     // Mouse bağlantı rengi
    particleRadius: 3,           // Parçacık boyutu
    lineWidth: 1.5,              // Çizgi kalınlığı
    connectionDistance: 150,     // Bağlantı mesafesi
    mouseRadius: 200,            // Mouse etki alanı
    speed: 0.3                   // Hareket hızı
};

// Mouse pozisyonu
let mouse = {
    x: null,
    y: null,
    radius: config.mouseRadius
};

// Mouse hareket eventi
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Mouse sayfadan çıkınca
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Parçacık sınıfı
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.radius = config.particleRadius;
    }

    // Parçacığı çiz
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
    }

    // Parçacığı güncelle
    update() {
        // Mouse ile etkileşim
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                // Mouse'a doğru hafif çekim
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                this.vx += forceDirectionX * force * 0.02;
                this.vy += forceDirectionY * force * 0.02;
            }
        }

        // Hız sınırlaması
        const maxSpeed = 2;
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > maxSpeed) {
            this.vx = (this.vx / currentSpeed) * maxSpeed;
            this.vy = (this.vy / currentSpeed) * maxSpeed;
        }

        // Pozisyonu güncelle
        this.x += this.vx;
        this.y += this.vy;

        // Kenarlardan sekme
        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        // Sürtünme (yavaşlama)
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Minimum hız
        if (Math.abs(this.vx) < 0.1) this.vx = (Math.random() - 0.5) * config.speed;
        if (Math.abs(this.vy) < 0.1) this.vy = (Math.random() - 0.5) * config.speed;

        this.draw();
    }
}

// Parçacıkları oluştur
let particles = [];
function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Ekran boyutu değiştiğinde parçacıkları yeniden oluştur
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Parçacıklar arasında çizgi çiz
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.connectionDistance) {
                // Mesafeye göre opaklık
                const opacity = 1 - (distance / config.connectionDistance);
                ctx.beginPath();
                ctx.strokeStyle = hexToRgba(config.lineColor, opacity * 0.3);
                ctx.lineWidth = config.lineWidth;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        // Mouse ile bağlantı çiz
        if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const opacity = 1 - (distance / mouse.radius);
                ctx.beginPath();
                ctx.strokeStyle = hexToRgba(config.mouseLineColor, opacity * 0.6);
                ctx.lineWidth = config.lineWidth * 1.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

// Hex rengi RGBA'ya çevir
function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Üçgen oluşturma (yakın 3 parçacık arasında)
function drawTriangles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            for (let k = j + 1; k < particles.length; k++) {
                const d1 = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                const d2 = Math.hypot(particles[j].x - particles[k].x, particles[j].y - particles[k].y);
                const d3 = Math.hypot(particles[k].x - particles[i].x, particles[k].y - particles[i].y);

                const maxDist = 100; // Üçgen oluşturma mesafesi

                if (d1 < maxDist && d2 < maxDist && d3 < maxDist) {
                    const avgDist = (d1 + d2 + d3) / 3;
                    const opacity = (1 - avgDist / maxDist) * 0.05;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.lineTo(particles[k].x, particles[k].y);
                    ctx.closePath();
                    ctx.fillStyle = hexToRgba(config.lineColor, opacity);
                    ctx.fill();
                }
            }
        }
    }
}

// Ana animasyon döngüsü
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Üçgenleri çiz (en arkada)
    drawTriangles();

    // Bağlantıları çiz
    connectParticles();

    // Parçacıkları güncelle ve çiz
    particles.forEach(particle => particle.update());

    requestAnimationFrame(animate);
}

// Animasyonu başlat
animate();
