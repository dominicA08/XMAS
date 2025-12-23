// Snow background
const snowContainer = document.querySelector('.snow');
if (snowContainer) {
    const snowflakeCount = 100;
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowContainer.appendChild(snowflake);
    }
}

// Flipbook logic (adapted from provided source)
class FlipBook {
    constructor(bookElem) {
        this.elems = {
            book: bookElem,
            leaves: bookElem.querySelectorAll(".leaf"),
            buttons: {
                next: document.getElementById("nextPage"),
                prev: document.getElementById("prevPage")
            }
        };
        this.currentPagePosition = 0;
        this.setupEvents();
        this.turnPage(0);
    }

    setPagePosition(page, position, index) {
        let transform = "";
        // Stack pages slightly in Z so they don't visually intersect
        transform = "translate3d(0,0," + ((position < 0 ? 1 : -1) * Math.abs(index)) + "px)";

        if (position < 0) {
            transform += " rotate3d(0,1,0,-180deg)";
            page.classList.add("turned");
        } else {
            page.classList.remove("turned");
        }

        if (page.style.transform !== transform) {
            page.style.transform = transform;
        }
    }

    turnPage(delta) {
        this.currentPagePosition += delta;

        if (this.currentPagePosition < 0) {
            this.currentPagePosition = 0;
            return;
        }

        if (this.currentPagePosition > this.elems.leaves.length) {
            this.currentPagePosition = this.elems.leaves.length;
            return;
        }

        this.elems.leaves.forEach((page, index) => {
            const pageNumber = index;
            this.setPagePosition(page, pageNumber - this.currentPagePosition, index);
        });

        if (this.currentPagePosition === 0) {
            this.elems.buttons.prev.setAttribute("disabled", "disabled");
        } else if (this.currentPagePosition === this.elems.leaves.length) {
            this.elems.buttons.next.setAttribute("disabled", "disabled");
        } else {
            this.elems.buttons.next.removeAttribute("disabled");
            this.elems.buttons.prev.removeAttribute("disabled");
        }
    }

    setupEvents() {
        this.elems.buttons.next.addEventListener("click", () => {
            this.turnPage(1);
        });
        this.elems.buttons.prev.addEventListener("click", () => {
            this.turnPage(-1);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const flipbookElem = document.getElementById("flipbook");
    if (flipbookElem) {
        new FlipBook(flipbookElem);
    }
});

