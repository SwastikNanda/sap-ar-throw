
const instructions = [
    "Swipe up to throw the ball.",
    "Point your camera at an empty space to place the buckets."
];

let instructionState = 0; // 0: initial, 1: showing swipe, 2: showing placement, 3: done

function showInstruction(index) {
    const overlay = document.getElementById('instruction-overlay');
    const text = document.getElementById('instruction-text');
    
    if (index < instructions.length) {
        text.innerText = instructions[index];
        overlay.style.display = 'flex';
        instructionState = index + 1;
    } else {
        overlay.style.display = 'none';
        instructionState = 3; // Done
        // All instructions are done, we can start the main game logic
        document.dispatchEvent(new Event('instructions-done'));
    }
}

function nextInstruction() {
    showInstruction(instructionState);
}

function initializeInstructions() {
    const scene = document.querySelector('a-scene');

    // Listen for the first swipe
    const handleFirstSwipe = () => {
        if (instructionState === 1) {
            window.removeEventListener('touchend', handleFirstSwipe);
            nextInstruction();
        }
    };
    window.addEventListener('touchend', handleFirstSwipe);

    // Listen for scene placement
    const handlePlacement = () => {
        if (instructionState === 2) {
            scene.removeEventListener('ar-hit-test-select', handlePlacement);
            nextInstruction();
        }
    };
    scene.addEventListener('ar-hit-test-select', handlePlacement);

    // Start with the first instruction
    showInstruction(0);
}
