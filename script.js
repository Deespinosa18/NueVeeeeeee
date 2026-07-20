const screens = Array.from(
    document.querySelectorAll(".screen")
);

const nextButtons = document.querySelectorAll(
    "[data-next]"
);

const progressBar = document.getElementById(
    "progressBar"
);

const starsContainer = document.getElementById(
    "stars"
);

const heartsContainer = document.getElementById(
    "floatingHearts"
);

const letterStage = document.getElementById(
    "letterStage"
);

const openLetterButton = document.getElementById(
    "openLetter"
);

const continueLetterButton = document.getElementById(
    "continueLetter"
);

const flipCards = document.querySelectorAll(
    ".flip-card"
);

const photoButtons = document.querySelectorAll(
    ".memory-photo"
);

const photoDialog = document.getElementById(
    "photoDialog"
);

const dialogImage = document.getElementById(
    "dialogImage"
);

const dialogCaption = document.getElementById(
    "dialogCaption"
);

const closeDialogButton = document.getElementById(
    "closeDialog"
);

const acceptDateButton = document.getElementById(
    "acceptDate"
);

const acceptedMessage = document.getElementById(
    "acceptedMessage"
);

const daysTogetherElement = document.getElementById(
    "daysTogether"
);


/* CAMBIAR ENTRE PANTALLAS */

nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const nextScreenId = button.dataset.next;

        changeScreen(nextScreenId);
    });
});


function changeScreen(nextScreenId) {
    const currentScreen = document.querySelector(
        ".screen.active"
    );

    const nextScreen = document.getElementById(
        nextScreenId
    );

    if (!currentScreen || !nextScreen) {
        return;
    }

    currentScreen.classList.add("leaving");

    setTimeout(() => {
        currentScreen.classList.remove(
            "active",
            "leaving"
        );

        nextScreen.classList.add("active");

        updateProgress(nextScreen);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 450);
}


function updateProgress(screen) {
    const screenIndex = Number(
        screen.dataset.screen
    );

    const percentage =
        ((screenIndex + 1) / screens.length) * 100;

    progressBar.style.width =
        `${percentage}%`;
}


/* CONTADOR DE DÍAS */

function updateDaysTogether() {
    const relationshipStart =
        new Date("2025-10-20T00:00:00");

    const today = new Date();

    const difference =
        today.getTime() -
        relationshipStart.getTime();

    const days =
        Math.max(
            0,
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            )
        );

    daysTogetherElement.textContent = days;
}

updateDaysTogether();


/* ABRIR CARTA */

openLetterButton.addEventListener(
    "click",
    () => {
        letterStage.classList.add("open");

        continueLetterButton.classList.remove(
            "hidden"
        );

        setTimeout(() => {
            document
                .getElementById("letterPaper")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 850);
    }
);


/* TARJETAS DE AMOR */

flipCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});


/* VISOR DE FOTOGRAFÍAS */

photoButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const image = button.dataset.image;
        const caption = button.dataset.caption;

        dialogImage.src = image;
        dialogImage.alt = caption;
        dialogCaption.textContent = caption;

        photoDialog.showModal();
    });
});


closeDialogButton.addEventListener(
    "click",
    () => {
        photoDialog.close();
    }
);


photoDialog.addEventListener(
    "click",
    (event) => {
        const dialogDimensions =
            photoDialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX <
                dialogDimensions.left ||
            event.clientX >
                dialogDimensions.right ||
            event.clientY <
                dialogDimensions.top ||
            event.clientY >
                dialogDimensions.bottom;

        if (clickedOutside) {
            photoDialog.close();
        }
    }
);


/* ESTRELLAS DEL FONDO */

function createStars() {
    const totalStars = 100;

    for (
        let index = 0;
        index < totalStars;
        index++
    ) {
        const star =
            document.createElement("span");

        star.classList.add("star");

        const size =
            Math.random() * 3 + 1;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 4}s`;

        star.style.animationDuration =
            `${Math.random() * 3 + 2}s`;

        starsContainer.appendChild(star);
    }
}

createStars();


/* CORAZONES FLOTANTES */

function createFloatingHeart() {
    const heart =
        document.createElement("span");

    const availableHearts = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "💘"
    ];

    heart.classList.add(
        "floating-heart"
    );

    heart.textContent =
        availableHearts[
            Math.floor(
                Math.random() *
                availableHearts.length
            )
        ];

    heart.style.left =
        `${Math.random() * 100}%`;

    heart.style.fontSize =
        `${Math.random() * 15 + 13}px`;

    heart.style.animationDuration =
        `${Math.random() * 5 + 7}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12500);
}

setInterval(
    createFloatingHeart,
    1200
);


/* RESPUESTA A LA INVITACIÓN */

acceptDateButton.addEventListener(
    "click",
    () => {
        acceptDateButton.classList.add(
            "hidden"
        );

        acceptedMessage.classList.remove(
            "hidden"
        );

        createConfetti();

        acceptedMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
);


/* CONFETI FINAL */

function createConfetti() {
    const colors = [
        "#ff5c9a",
        "#ffc2d9",
        "#f5d184",
        "#ffffff",
        "#b7c5ff",
        "#d88cff"
    ];

    const totalPieces = 180;

    for (
        let index = 0;
        index < totalPieces;
        index++
    ) {
        const piece =
            document.createElement("span");

        piece.classList.add("confetti");

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.animationDuration =
            `${Math.random() * 3 + 3}s`;

        piece.style.animationDelay =
            `${Math.random() * 1.2}s`;

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 7500);
    }
}