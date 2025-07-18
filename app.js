
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let settings = {
    redBrightness: 1,
    blueBrightness: 1,
    horizontalDistance: 100,
    verticalDistance: 0,
    scale: 1,
    mode: 'static',
    frequency: 1,
    isRedVisible: true,
    isBlueVisible: true
};

// Загрузка изображений 
const redImage = new Image();
const blueImage = new Image();
let imagesLoaded = 0;

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        draw(); 
    }
}

redImage.onload = checkImagesLoaded;
blueImage.onload = checkImagesLoaded;

redImage.src = 'assets/red_snow.png'; 
blueImage.src = 'assets/blue_snow.png'; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.save();
    
    if (settings.isRedVisible) {
        ctx.globalAlpha = settings.redBrightness;
        ctx.translate(
            centerX - settings.horizontalDistance / 2,
            centerY - settings.verticalDistance / 2
        );
        ctx.scale(settings.scale, settings.scale);
        ctx.drawImage(redImage, -redImage.width/2, -redImage.height/2);
        ctx.restore();
        ctx.save();
    }
    
    if (settings.isBlueVisible) {
        ctx.globalAlpha = settings.blueBrightness;
        ctx.translate(
            centerX + settings.horizontalDistance / 2,
            centerY + settings.verticalDistance / 2
        );
        ctx.scale(settings.scale, settings.scale);
        ctx.drawImage(blueImage, -blueImage.width/2, -blueImage.height/2);
        ctx.restore();
    }
}

let blinkInterval;
function updateBlinkMode() {
    clearInterval(blinkInterval);
    
    if (settings.mode === 'static') {
        settings.isRedVisible = true;
        settings.isBlueVisible = true;
        draw();
    } else if (settings.mode === 'alternate') {
        settings.isRedVisible = true;
        settings.isBlueVisible = false;
        draw();
        
        blinkInterval = setInterval(() => {
            settings.isRedVisible = !settings.isRedVisible;
            settings.isBlueVisible = !settings.isBlueVisible;
            draw();
        }, 1000 / settings.frequency);
    } else if (settings.mode === 'sync') {
        blinkInterval = setInterval(() => {
            settings.isRedVisible = !settings.isRedVisible;
            settings.isBlueVisible = settings.isRedVisible;
            draw();
        }, 1000 / settings.frequency);
    }
}

document.getElementById('redBrightness').addEventListener('input', (e) => {
    settings.redBrightness = parseFloat(e.target.value);
    draw();
});

document.getElementById('blueBrightness').addEventListener('input', (e) => {
    settings.blueBrightness = parseFloat(e.target.value);
    draw();
});

document.getElementById('horizontalDistance').addEventListener('input', (e) => {
    settings.horizontalDistance = parseInt(e.target.value);
    draw();
});

document.getElementById('verticalDistance').addEventListener('input', (e) => {
    settings.verticalDistance = parseInt(e.target.value);
    draw();
});

document.getElementById('mode').addEventListener('change', (e) => {
    settings.mode = e.target.value;
    updateBlinkMode();
});

document.getElementById('frequency').addEventListener('input', (e) => {
    settings.frequency = parseFloat(e.target.value);
    updateBlinkMode();
});

document.getElementById('scale').addEventListener('input', (e) => {
    settings.scale = parseFloat(e.target.value);
    document.getElementById('scaleValue').textContent = settings.scale.toFixed(1) + 'x';
    draw();
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
updateBlinkMode();

const toggleControlsBtn = document.getElementById('toggleControlsBtn');
const controls = document.getElementById('controls');

let controlsVisible = true;

toggleControlsBtn.addEventListener('click', () => {
    controlsVisible = !controlsVisible;
    
    if (controlsVisible) {
        controls.classList.remove('hidden');
        toggleControlsBtn.classList.remove('hidden');
        toggleControlsBtn.textContent = 'Скрыть настройки';
    } else {
        controls.classList.add('hidden');
        toggleControlsBtn.classList.add('hidden');
        toggleControlsBtn.textContent = 'Показать настройки';
    }
});
