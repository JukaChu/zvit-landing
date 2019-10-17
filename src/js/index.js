let navPoints = [...document.querySelectorAll(".navigation-point")];
let navDots = [...document.querySelectorAll(".navigation-point__dot")];
let trianglesMenu = [...document.querySelectorAll(".useful-parts__simple-part")];

function headerAnimation() {
    navPoints.map((point, i) => {
        if (i !== 2) {
            return (point.style.visibility = "hidden");
        } else {
            point.classList.add("navigation-point--checked");
            let elementBefore = [...document.querySelectorAll(".navigation-point--checked")][0];
            setTimeout(() => {
                point.classList.add("navigation-point--before");
                return (point.firstElementChild.style.animation = "1s ease-in-out 1 forwards textMoves");
            }, 1000);
            return elementBefore.addEventListener("click", headerAnimationReverse);
        }
    });

    navDots.map(dot => (dot.style.display = "none"));
    // declarationDiv();
    navPoints.map(point => point.removeEventListener("click", headerAnimation));
    setTimeout(declarationDiv, 1000);
}

function headerAnimationReverse() {
    navPoints[2].firstElementChild.style.animation = "none";
    navPoints[2].firstElementChild.style.animation = "1s ease-in-out 1 forwards textMovesReverse";
    const classBefore = "navigation-point--before";
    let elementBefore = [...document.querySelectorAll(".navigation-point--checked")][0];

    setTimeout(() => {
        elementBefore.classList.add("navigation-point--reverse-animation");
        elementBefore.classList.remove(classBefore);
        document
            .getElementsByClassName("header__bottom-side")[0]
            .removeChild([...document.querySelectorAll(".declaration")][0]);
    }, 1000);

    setTimeout(() => {
        const classChecked = "navigation-point--checked";
        const classReverse = "navigation-point--reverse-animation";

        navPoints.map(point => {
            if (point.classList.contains(classReverse)) {
                point.classList.remove(classReverse);
                point.classList.remove(classChecked);
            }
            point.style.visibility = "visible";
            navDots.map(dot => (dot.style.display = "block"));
        });
    }, 2000);

    elementBefore.removeEventListener("click", headerAnimationReverse);
    navPoints.map(point => point.addEventListener("click", headerAnimation));
}

trianglesMenu.map(point => {
    function toggleClass() {
        if (point.classList.contains("useful-parts__simple-part--active")) {
            point.classList.remove("useful-parts__simple-part--active");
        } else {
            trianglesMenu.map(item => {
                item.classList.remove("useful-parts__simple-part--active");
            });
            point.classList.toggle("useful-parts__simple-part--active");
        }
        centerCircleText();
    }

    return point.addEventListener("click", toggleClass);
});

navPoints.map(point => {
    return point.addEventListener("click", headerAnimation);
});

function declarationDiv() {
    const paragraphName = [
        "Виплати, пов'язані з трудовими відносинами",
        "Стипендії",
        "Доходи від продажу/обміну майна",
        "Підприємницькі доходи(припинення діяльності)",
        "Дохід від незалежної професійної діяльності"
    ];
    let elemDeclaration = "";
    let newButtonDeclaration =
        '<button class="declaration__create-declaration" title="Creating declaration">' +
        "сформувати декларацію</button>";

    let newDiv = document.createElement("section");
    newDiv.classList.add("declaration");
    paragraphName.map((name, index) => {
        let paragraphText = `<div class='declaration__article'>
            <p class="declaration__paragraph  declaration__paragraph--${index}">${name}</p></div>`;
        return (elemDeclaration += paragraphText);
    });
    elemDeclaration += newButtonDeclaration;
    newDiv.innerHTML = elemDeclaration;
    document.getElementsByClassName("header__bottom-side")[0].appendChild(newDiv);
}

function centerCircleText() {
    function appendToInfoBlock(arrayTitle) {
        document.getElementsByClassName("useful-parts__info-block")[0].innerHTML = "";
        let newTitle = arrayTitle[0];
        let subtitle = arrayTitle[1];
        const newHTitle = document.createElement("h1");
        newHTitle.classList.add("info-block__title");
        const newSubtitle = document.createElement("p");
        newSubtitle.innerHTML = subtitle;
        newSubtitle.classList.add("info-block__subtitle");
        newHTitle.innerHTML = newTitle;
        document.getElementsByClassName("useful-parts__info-block")[0].appendChild(newHTitle);
        document.getElementsByClassName("useful-parts__info-block")[0].appendChild(newSubtitle);
    }

    if (trianglesMenu.some(elem => elem.classList.contains("useful-parts__simple-part--active")) === true) {
        let newTitle = "Освіта";
        let subtitle =
            "витрати понесені за власне навчання та/або навчання члена сім'ї першого ступеня споріднення (в тому числі працездатних дітей віком до 23 років та/або непрацездатних дітей незалежно від віку), які не отримують заробітну плату, окрім коштів за навчання на військовії кафедрі";
        let arrayTitle = [newTitle, subtitle];
        return appendToInfoBlock(arrayTitle);
    } else {
        let newTitle = "Є речі про які варто знати";
        let subtitle = `<p class="info-block__subtitle--green">Знижка на сплату податків</p> - це реально. Лише оберіть види витрат що ви понесли.`;
        let arrayTitle = [newTitle, subtitle];
        return appendToInfoBlock(arrayTitle);
    }
}
centerCircleText();
