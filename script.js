* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Poppins', sans-serif; height: 100vh; display: flex; justify-content: center; align-items: center; overflow: hidden; text-align: center; color: white; perspective: 1000px; background-color: #050505; }

/* Backgrounds */
.video-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -3; }
#bg-video { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
.video-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle, rgba(10,0,5,0.4) 0%, rgba(0,0,0,0.8) 100%); z-index: -2; }
#floating-petals-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; overflow: hidden; }

.petal { position: absolute; top: -10%; width: 15px; height: 25px; background: linear-gradient(135deg, #ff0055, #ff4757); border-radius: 15px 0 15px 0; box-shadow: 0 0 10px rgba(255,0,85,0.4); opacity: 0.8; animation: fall linear infinite; }
@keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { transform: translateY(110vh) rotate(360deg) translateX(50px); opacity: 0; } }

/* Standard Cards */
.glass-card { background: rgba(20, 15, 20, 0.5); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 30px; padding: 45px 30px; width: 90%; max-width: 450px; box-shadow: 0 25px 50px rgba(0,0,0,0.7), inset 0 0 20px rgba(255,107,129,0.1); position: absolute; z-index: 1; transform-style: preserve-3d; transition: transform 0.1s ease-out; }
.active { display: block; animation: zoomFadeIn 0.8s forwards; }
.hidden { display: none !important; }
@keyframes zoomFadeIn { 0% { opacity: 0; transform: translateY(50px) scale(0.9); } 100% { opacity: 1; transform: translateY(0) scale(1); } }

/* FINAL SLIDE OVERRIDES */
.final-card {
    max-width: 700px; 
    max-height: 90vh; 
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
}

h1 { font-family: 'Playfair Display', serif; font-style: italic; font-size: 28px; font-weight: 700; margin-bottom: 15px; text-shadow: 0 4px 15px rgba(0,0,0,0.8); }
p { font-weight: 300; font-size: 16px; margin-bottom: 30px; color: #e0e0e0; }
.game-text { font-size: 20px; font-weight: 600; color: #ff6b81; margin: 20px 0; }
.error-text { color: #ff4757 !important; font-weight: 600; margin-top: 15px; animation: shake 0.4s; }
.typing-cursor::after { content: '|'; animation: blink 0.8s infinite; color: #ff6b81; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* POLAROID STYLING */
.polaroid-frame { background: white; padding: 15px 15px 35px 15px; border-radius: 5px; box-shadow: 0 15px 30px rgba(0,0,0,0.6); transition: transform 0.3s ease, filter 2s ease; margin: 0 auto 20px auto; width: 100%; max-width: 250px; cursor: pointer; }
.polaroid-frame:active { transform: scale(0.95); }

/* The blurred/grayscale state */
.polaroid-img { width: 100%; height: 220px; object-fit: cover; background: #222; filter: grayscale(100%) brightness(40%) blur(12px); transition: filter 3s ease-in-out; }
.polaroid-caption { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #222; margin-top: 15px; font-size: 18px; }

/* The developing state */
.developing .polaroid-img { filter: grayscale(0%) brightness(100%) blur(0px); }

/* Fully developed (used for the gallery) */
.developed-img { filter: grayscale(0%) brightness(100%) blur(0px) !important; }

/* FINAL SLIDE: SCROLLABLE GALLERY */
.scrollable-gallery {
    width: 100%;
    max-height: 60vh; 
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr; 
    gap: 20px;
    opacity: 0; transform: translateY(20px); transition: all 1s ease 1s; 
}

@media(min-width: 600px) {
    .scrollable-gallery { grid-template-columns: 1fr 1fr; } 
}

.scrollable-gallery .polaroid-frame { margin-bottom: 0; cursor: default; }
.scrollable-gallery .polaroid-frame:nth-child(even) { transform: rotate(2deg); }
.scrollable-gallery .polaroid-frame:nth-child(odd) { transform: rotate(-2deg); }
.scrollable-gallery .polaroid-frame:hover { transform: scale(1.05) rotate(0deg); z-index: 10; position: relative; }

.revealed-gallery { opacity: 1; transform: translateY(0); }

/* Custom Sleek Scrollbar */
.scrollable-gallery::-webkit-scrollbar { width: 6px; }
.scrollable-gallery::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
.scrollable-gallery::-webkit-scrollbar-thumb { background: rgba(255,107,129,0.5); border-radius: 10px; }
.scrollable-gallery::-webkit-scrollbar-thumb:hover { background: rgba(255,107,129,1); }


/* Other Games */
.scratch-container { position: relative; width: 280px; height: 150px; margin: 0 auto; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.5); border: 2px solid rgba(255,107,129,0.5); }
.scratch-content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff; display: flex; justify-content: center; align-items: center; text-align: center; }
.scratch-content h2 { font-family: 'Playfair Display', serif; color: #ff4757; font-size: 24px; margin: 0; }
canvas#scratch-pad { position: absolute; top: 0; left: 0; z-index: 2; cursor: crosshair; }
.fingerprint-box { width: 120px; height: 150px; margin: 0 auto 20px auto; border: 2px dashed rgba(255, 107, 129, 0.5); border-radius: 20px; position: relative; display: flex; justify-content: center; align-items: center; cursor: pointer; overflow: hidden; user-select: none; }
.scan-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 0%; background: rgba(255, 107, 129, 0.4); border-top: 3px solid #ff6b81; box-shadow: 0 -5px 15px rgba(255, 107, 129, 0.8); transition: height 0.1s linear; }
.scanning { border-color: #ff6b81; box-shadow: 0 0 20px rgba(255,107,129,0.5); }

/* Standard Inputs & Buttons */
input[type="text"] { width: 100%; padding: 15px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.4); color: white; font-size: 18px; font-family: 'Poppins'; text-align: center; margin-bottom: 20px; outline: none; }
.btn { padding: 14px 38px; font-size: 18px; font-weight: 600; font-family: 'Poppins'; border-radius: 30px; border: none; cursor: pointer; transition: 0.3s; z-index: 10; margin: 0 10px; }
.yes { background: linear-gradient(135deg, #ff4757, #ff6b81); color: white; }
.no { background: rgba(255, 255, 255, 0.95); color: #ff4757; }
.glow-btn:hover { box-shadow: 0 0 25px #ff6b81, 0 0 50px #ff4757; transform: translateY(-3px) scale(1.05); }
.btn:active { transform: scale(0.95); }
.runaway-btn.moving { position: fixed; z-index: 9999; }

/* Utilities */
.floating { width: 220px; height: 220px; object-fit: cover; border-radius: 20px; margin-bottom: 25px; animation: float 4s infinite; border: 2px solid rgba(255,255,255,0.2); }
.emoji-hero { font-size: 110px; margin-bottom: 20px; animation: float 4s infinite; filter: drop-shadow(0 15px 20px rgba(0,0,0,0.6)); }
.lock-icon { font-size: 80px; margin-bottom: 15px; animation: pulseLock 2s infinite alternate; }
.balloons-container { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; }
.balloon { font-size: 55px; cursor: pointer; transition: 0.3s; animation: float 3s infinite alternate; }
.popped { transform: scale(0) !important; opacity: 0; pointer-events: none; }
.spinner-box { background: rgba(0,0,0,0.5); border: 2px solid #ff6b81; border-radius: 15px; padding: 20px; margin-bottom: 25px; }
.compat-box { width: 100%; height: 20px; background: rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); }
.compat-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #ff4757, #ff1493); transition: width 0.1s linear; }
input[type="range"] { width: 100%; height: 8px; background: rgba(255,255,255,0.2); border-radius: 10px; outline: none; -webkit-appearance: none; accent-color: #ff4757; }
.flip-cards-container { display: flex; justify-content: center; gap: 15px; margin-bottom: 20px; }
.flip-card { width: 80px; height: 110px; perspective: 1000px; cursor: pointer; }
.flip-card-inner { width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; position: relative; }
.flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back { width: 100%; height: 100%; position: absolute; backface-visibility: hidden; display: flex; justify-content: center; align-items: center; font-size: 35px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.3); }
.flip-card-back { background: rgba(255,107,129,0.2); transform: rotateY(180deg); }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
@keyframes pulseLock { 0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255,107,129,0.3)); } 100% { transform: scale(1.05); filter: drop-shadow(0 0 30px rgba(255,107,129,0.9)); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25%, 75% { transform: translateX(-10px); } 50% { transform: translateX(10px); } }
