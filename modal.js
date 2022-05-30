const restart = document.querySelector(".restart")
const modal = document.querySelector(".modalBackground")

export function restartGame() {
    restart.addEventListener('click', () => {
        return window.location.reload()
    })
}

export function modalActive() {
    return modal.classList.add("active")
}
