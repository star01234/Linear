const stackContainer = document.getElementById('stack-container');
const block = document.querySelector('.block');
const block2 = document.querySelector('.block2');
const isEmptyElement = document.getElementById('is-empty');
const isFullElement = document.getElementById('is-full');
const countElement = document.getElementById('count');
const peekElement = document.getElementById('peek');
const changeElement = document.getElementById('change');
let stack = [];

function isEmpty() {
    return stack.length === 0;
}

function isFull() {
    const stackCapacity = 3;    
    return stack.length === stackCapacity;
}

function count() {
    return stack.length;
}

function peek() {
    if (!isEmpty()) {
        const positions = stack.map((block, index) => {
            const blockType = block.classList.contains('block') ? 'Block' : 'Block2';
            return `Position ${index + 1}: ${blockType}`;
        });

        const message = positions.join('\n');
        alert(`Peek:\n${message}`);
    } else {
        alert('Stack is empty. Cannot peek.');
    }
}
peekElement.addEventListener('click', peek);

function change() {0
    if (!isEmpty()) {
        stack = stack.sort(() => Math.random() - 0.5);
        stackContainer.innerHTML = '';
        stack.forEach((block) => {
            stackContainer.appendChild(block);
        });

        updateStatus();
    } else {
        alert('Stack is empty. Cannot change.');
    }
}

changeElement.addEventListener('click', change);


// ... (existing code)

block.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'block');
});

block2.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'block2');
});

stackContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

stackContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const newBlock = (data === 'block') ? block.cloneNode(true) : block2.cloneNode(true);

    if ((data === 'block' || data === 'block2') && !isFull()) {
        stackContainer.appendChild(newBlock);
        stack.push(newBlock);
        updateStatus();
        
        newBlock.addEventListener('dblclick', () => {
            stackContainer.removeChild(newBlock);
            stack = stack.filter(item => item !== newBlock);
            updateStatus();
        });
    }
});

stackContainer.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('block') || e.target.classList.contains('block2')) {
        stackContainer.removeChild(e.target);
        stack = stack.filter(item => item !== e.target);
        updateStatus();
    }
});

function updateStatus() {
    isEmptyElement.textContent = isEmpty() ? '0' : 'Not Empty';
    isFullElement.textContent = isFull() ? 'Full' : 'Not Full';
    countElement.textContent = count();
    peekElement.addEventListener('click', peek);


}