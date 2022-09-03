const cards = document.querySelectorAll('.projects__card');
const card = document.querySelector('.all-projects');


let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

cards.forEach((card, index) => {
    card.addEventListener('dragstart', (e) => e.preventDefault())

    // Touch events
    card.addEventListener('touchstart', touchStart(index))
    card.addEventListener('touchend', touchEnd)
    card.addEventListener('touchmove', touchMove)


})

window.oncontextmenu = function(event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

function touchStart(index) {
    return function(event) {
        currentIndex = index
        startPosition = getPosition(event)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        card.classList.add('grabbing')
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)

    const moveBy = currentTranslate - prevTranslate

    if(moveBy < -100 && currentIndex < cards.length - 1) {
        currentIndex += 1
    }

    if(moveBy > 100 && currentIndex > 0) {
        currentIndex += 1
    }

    setPositionByIndex()
    card.classList.remove('grabbing')
}

function touchMove(event) {
    if(isDragging) {
        const currentPosition = getPosition(event)
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPosition(event) {
    return event.touches[0].clientX
}
 
function animation() {
    card.style.transform = `translateX(${currentTranslate}px)`
    if(isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setCardPosition()
  }

function setCardPosition() {
    card.style.transform = `translateX(${currentTranslate}px)`
  }